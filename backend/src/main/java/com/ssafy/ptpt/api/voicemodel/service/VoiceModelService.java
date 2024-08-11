package com.ssafy.ptpt.api.voicemodel.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.ssafy.ptpt.db.jpa.entity.Member;
import com.ssafy.ptpt.db.jpa.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;

@Service
@RequiredArgsConstructor
public class VoiceModelService {

    private final WebClient webClient;
    private final ObjectMapper objectMapper;
    private final MemberRepository memberRepository;
    @Value("${external.api.convert}")
    private String CONVERT; // 추후 application.yml 파일에 추가 예정
    @Value("${external.api.select}")
    private String SELECT;
    @Value("${external.api.upload}")
    private String UPLOAD;

    @Autowired
    public VoiceModelService(WebClient.Builder webClientBuilder, ObjectMapper objectMapper, MemberRepository memberRepository) {
        this.webClient = webClientBuilder.build();
        this.objectMapper = objectMapper;
        this.memberRepository = memberRepository;
    }

    public Mono<String> uploadAudioFile(String ttsPath) {
        System.out.println("in uploadAudioFile");
//        {
//            "data": [
//                "http://70.12.130.121:7897/file=/tmp/gradio/a8ef0ece1af5d8a3b50d911703d5a670d23d1834/audio.wav",
//                true
//            ]
//        }
        String resultPath = "https://i11b207.p.ssafy.io" + ttsPath.substring(ttsPath.indexOf("/uploads"));

        // JSON 객체 생성
        ObjectNode jsonObject = objectMapper.createObjectNode();
        ArrayNode jsonArray = objectMapper.createArrayNode();
        jsonArray.add(resultPath);
        jsonArray.add(false); // convert 시에는 false
        jsonObject.set("data", jsonArray);

        return webClient.post()
                .uri(UPLOAD)
                .bodyValue(jsonObject)
                .retrieve()
                .bodyToMono(String.class);
    }

    public Mono<String> inferChangeVoice(String vmName) {
        System.out.println("in inferChangeVoice");

        // JSON 객체 생성
        ObjectNode jsonObject = objectMapper.createObjectNode();
        ArrayNode jsonArray = objectMapper.createArrayNode();
        jsonArray.add(vmName);
        jsonArray.add(0.33);
        jsonArray.add(0.33);
        jsonObject.set("data", jsonArray);

        return webClient.post()
                .uri(SELECT)
                .bodyValue(jsonObject)
                .retrieve()
                .bodyToMono(String.class);
    }

    public Mono<String> inferConvert(String ttsPath) {
        System.out.println("in inferConvert");
        // JSON 객체 생성
        ObjectNode jsonObject = objectMapper.createObjectNode();
        ArrayNode jsonArray = objectMapper.createArrayNode();
        jsonArray.add(0);
        jsonArray.add(ttsPath); // "C:\\Users\\SSAFY\\Desktop\\src\\tts.wav"
        jsonArray.add(0);
        jsonArray.addNull();
        jsonArray.add("rmvpe");
        jsonArray.add("");
        jsonArray.add("logs\\been//added_IVF283_Flat_nprobe_1_been_v2.index");
        jsonArray.add(0.75);
        jsonArray.add(3);
        jsonArray.add(0);
        jsonArray.add(0.25);
        jsonArray.add(0.33);
        jsonObject.set("data", jsonArray);

        return webClient.post()
                .uri(CONVERT)
                .bodyValue(jsonObject)
                .retrieve()
                .bodyToMono(String.class);
    }

    // 음성 변환 프로세스를 체이닝하는 메서드
    public Mono<String> processVoiceConversion(String voiceModel, String ttsPath) {
        return uploadAudioFile(ttsPath)
                .flatMap(uploadResponse -> {
                    // 여기서 `uploadResponse`는 `uploadAudioFile`의 응답입니다.
                    // inferChangeVoice 호출 후, 이 응답을 inferConvert에 사용합니다.
                    String uploadPath;
                    try {
                        JsonNode rootNode = objectMapper.readTree(uploadResponse);
                        uploadPath = rootNode.path("data").get(0).asText();
                    } catch (JsonProcessingException e) {
                        return Mono.error(new RuntimeException(e));
                    }
                    System.out.println("upload 경로 확인: " + uploadPath);
                    return inferChangeVoice(voiceModel)
                            .flatMap(changeVoiceResponse -> inferConvert(uploadPath))
                            .flatMap(convertResponse -> {
                                ObjectMapper objectMapper = new ObjectMapper();
                                try {
                                    JsonNode rootNode = objectMapper.readTree(convertResponse); // JSON 문자열을 JsonNode로 변환
                                    JsonNode dataNode = rootNode.path("data").get(1); // data 배열의 두 번째 요소 가져오기
                                    String filePath = dataNode.path("name").asText(); // name 값 추출
                                    System.out.println("data[1].name: " + filePath);
                                    String httpPath  ="http://70.12.130.121/:7897/file=" + filePath;
                                    // 위 경로의 오디오 파일을 ttsPath에 저장 -> 덮어쓰기
                                    downloadAudioFile(httpPath, ttsPath);
                                    String resultPath = "https://i11b207.p.ssafy.io" + ttsPath.substring(ttsPath.indexOf("/uploads"));
                                    return Mono.just(resultPath);
                                } catch (Exception e) {
                                    return Mono.error(e);
                                }
                            });
                })
                .onErrorResume(error -> {
                    System.err.println("오류 발생: " + error.getMessage());
                    return Mono.just("처리 중 오류 발생");
                });

    }

    // 다운로드 및 저장하는 함수
    public static void downloadAudioFile(String fileUrl, String outputFilePath) {
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(fileUrl))
                .build();

        client.sendAsync(request, HttpResponse.BodyHandlers.ofInputStream())
                .thenApply(HttpResponse::body)
                .thenAccept(inputStream -> {
                    try (InputStream in = inputStream;
                         OutputStream out = Files.newOutputStream(Paths.get(outputFilePath))) {
                        byte[] buffer = new byte[1024];
                        int bytesRead;
                        while ((bytesRead = in.read(buffer)) != -1) {
                            out.write(buffer, 0, bytesRead);
                        }
                        System.out.println("File downloaded and saved to " + outputFilePath);
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                })
                .join();  // Blocking call to wait for completion
    }


    public void updateVoiceModelCreated(String oauthId) {
        Member member = memberRepository.findByOauthId(oauthId);

        member.setVoiceModelCreated(1);
        memberRepository.save(member);
    }
}
