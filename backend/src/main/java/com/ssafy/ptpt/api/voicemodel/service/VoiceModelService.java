package com.ssafy.ptpt.api.voicemodel.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;

@Service
@RequiredArgsConstructor
public class VoiceModelService {

    private final WebClient webClient;
    private final ObjectMapper objectMapper;
    @Value("${external.api.convert}")
    private String CONVERT; // 추후 application.yml 파일에 추가 예정
    @Value("${external.api.select}")
    private String SELECT;

    @Autowired
    public VoiceModelService(WebClient.Builder webClientBuilder, ObjectMapper objectMapper) {
        this.webClient = webClientBuilder.build();
        this.objectMapper = objectMapper;
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

    public Mono<String> inferChangeVoice(String fileName) {
        System.out.println("in inferChangeVoice");

        // JSON 객체 생성
        ObjectNode jsonObject = objectMapper.createObjectNode();
        ArrayNode jsonArray = objectMapper.createArrayNode();
        jsonArray.add(fileName);
        jsonArray.add(0.33);
        jsonArray.add(0.33);
        jsonObject.set("data", jsonArray);

        return webClient.post()
                .uri(SELECT)
                .bodyValue(jsonObject)
                .retrieve()
                .bodyToMono(String.class);
    }

    // 음성 변환 프로세스를 체이닝하는 메서드
    public Mono<String> processVoiceConversion(String fileName, String ttsPath) {
        return inferChangeVoice(fileName)
                .flatMap(response -> inferConvert(ttsPath))
                .flatMap(response -> {
                    ObjectMapper objectMapper = new ObjectMapper();
                    try {
                        JsonNode rootNode = objectMapper.readTree(response); // JSON 문자열을 JsonNode로 변환
                        JsonNode dataNode = rootNode.path("data").get(1); // data 배열의 두 번째 요소 가져오기
                        String filePath = dataNode.path("name").asText(); // name 값 추출
                        System.out.println("data[1].name: " + filePath);
                        return Mono.just(convertFileToBase64(filePath));
                    } catch (Exception e) {
                        return Mono.error(e);
                    }
                })
                .onErrorResume(error -> {
                    System.err.println("오류 발생: " + error.getMessage());
                    return Mono.just("처리 중 오류 발생");
                });
    }

    public String convertFileToBase64(String filePath) throws IOException {
        Path path = Paths.get(filePath); // 파일을 바이트 배열로 읽기
        byte[] fileBytes = Files.readAllBytes(path);

        // 바이트 배열을 Base64 형식으로 인코딩
        return Base64.getEncoder().encodeToString(fileBytes);
    }
}
