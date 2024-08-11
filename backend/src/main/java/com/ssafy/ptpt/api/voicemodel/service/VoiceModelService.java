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
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.core.io.buffer.DataBufferUtils;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;

@Service
@RequiredArgsConstructor
public class VoiceModelService {

    private final WebClient webClient;
    private final ObjectMapper objectMapper;
    private final MemberRepository memberRepository;

    @Value("${external.api.convert}")
    private String CONVERT;

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
        String resultPath = "https://i11b207.p.ssafy.io" + ttsPath.substring(ttsPath.indexOf("/uploads"));
        System.out.println("uploadAudioFile: " + resultPath);
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
        jsonArray.add(ttsPath);
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

    public Mono<String> processVoiceConversion(String voiceModel, String ttsPath) {
        return uploadAudioFile(ttsPath)
                .flatMap(uploadResponse -> {
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
                                try {
                                    JsonNode rootNode = objectMapper.readTree(convertResponse);
                                    JsonNode dataNode = rootNode.path("data").get(1);
                                    String filePath = dataNode.path("name").asText();
                                    String httpPath = "http://175.209.203.185:7897/file=" + filePath;
                                    System.out.println("httpPath: " + httpPath);
                                    String resultPath = ttsPath + "result";
                                    return downloadFile(httpPath, resultPath)
                                            .then(Mono.just("https://i11b207.p.ssafy.io" + resultPath.substring(resultPath.indexOf("/uploads"))));
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

    // WebClient를 사용하여 파일을 다운로드하는 함수
    public Mono<Void> downloadFile(String fileUrl, String outputFilePath) {
        return webClient.get()
                .uri(fileUrl)
                .header(HttpHeaders.ACCEPT, MediaType.APPLICATION_OCTET_STREAM_VALUE)
                .retrieve()
                .bodyToFlux(DataBuffer.class)
                .flatMap(dataBuffer -> {
                    try {
                        Path path = Paths.get(outputFilePath);
                        if (Files.notExists(path)) {
                            Files.createFile(path);
                        }
                        try (OutputStream outputStream = Files.newOutputStream(path, StandardOpenOption.CREATE, StandardOpenOption.APPEND)) {
                            byte[] bytes = new byte[dataBuffer.readableByteCount()];
                            dataBuffer.read(bytes);
                            outputStream.write(bytes);
                            return Mono.empty();
                        }
                    } catch (IOException e) {
                        return Mono.error(e);
                    } finally {
                        // release the data buffer
                        DataBufferUtils.release(dataBuffer);
                    }
                }).then();
    }

    public void updateVoiceModelCreated(String oauthId) {
        Member member = memberRepository.findByOauthId(oauthId);
        member.setVoiceModelCreated(1);
        memberRepository.save(member);
    }
}
