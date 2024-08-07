package com.ssafy.ptpt.api.voicemodel.controller;

import com.ssafy.ptpt.api.voicemodel.service.VoiceModelService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import com.fasterxml.jackson.databind.node.ArrayNode;
import io.swagger.v3.oas.annotations.Operation;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import reactor.core.publisher.Mono;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;
import org.springframework.web.client.RestTemplate;
import java.util.Collections;

@RestController
@RequestMapping("/voiceModel")
@RequiredArgsConstructor
public class VoiceModelController {

    @Value("${external.api.train}")
    private String externalApiTrain;

    // 추후 설정파일로 이동 및 경로 변경 필!
    @Value("${audioFile.path}")
    private String UPLOAD_PATH;
    private final VoiceModelService voiceModelService;

    @PostMapping("/audio")
    @Operation(summary = "음성 변환")
    public Mono<ResponseEntity<String>> getTtsVoice(
            @RequestPart(name = "audio") MultipartFile audio,
            @RequestPart(name = "fileName") String fileName
    )throws IOException {
        if (audio.isEmpty()) {
            return Mono.just(ResponseEntity.badRequest().body("파일이 비어있습니다."));
        }

        // 업로드 폴더 설정
        String today = new SimpleDateFormat("yyMMdd").format(new Date());
        String saveFolder = UPLOAD_PATH + File.separator + today;
        File folder = new File(saveFolder);
        if (!folder.exists()) {
            folder.mkdirs();
        }

        // 파일 저장
        String originalFileName = audio.getOriginalFilename();
        String saveFileName = UUID.randomUUID() + originalFileName.substring(originalFileName.lastIndexOf('.'));
        String ttsPath = saveFolder + File.separator + saveFileName;
        audio.transferTo(new File(folder, saveFileName));

        // 비동기 처리 및 체이닝된 메서드 호출
        System.out.println(ttsPath);
        return voiceModelService.processVoiceConversion(fileName, ttsPath)
                .map(response -> {
                    System.out.println("base64 응답 성공!");
                    return ResponseEntity.ok(response); // response가 일케 옴
                })
                .onErrorResume(error -> {
                    System.err.println("오류: " + error.getMessage());
                    return Mono.just(ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("오류가 발생했습니다."));
                });
    }


    @Value("${audioFile.preTrain}")
    private String PRETRAIN_UPLOAD_PATH;
    @PostMapping("/train")
    @Operation(summary = "음성모델 생성", description = "음성모델을 학습하여 생성합니다. 학습 전 데이터 저장 경로: src\\preTrain\\ [OauthId], 생성된 음성모델 저장 경로: RVC1006Nvidia\\assets\\weights\\vm[OauthId].pth")
    public ResponseEntity<?> voiceModelTrain(@RequestPart(name="audio") MultipartFile audio, @RequestPart(name="oauthId") String oauthId) throws IOException {
        if (audio.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("File is empty");
        }

        // 1. 원본 파일 (PRETRAIN DATA) 저장
        String saveFolder = PRETRAIN_UPLOAD_PATH + File.separator + oauthId;
        File folder = new File(saveFolder);
        if (!folder.exists()) {
            folder.mkdirs();
        }
        String originalFileName = audio.getOriginalFilename();
        String saveFileName = "preTrainAudio.mp3";
        File originalFile = new File(folder, saveFileName);
        audio.transferTo(originalFile);
        System.out.println(saveFolder);

        // 폴더 경로와 파일 경로를 JSON 데이터에 포함시키는 로직
        String folderPath = folder.getAbsolutePath();

        // 2. JSON 데이터 생성 및 API 호출
        String filePath = originalFile.getAbsolutePath();
        try {
            for (int i = 0; i < 4; i++) {
                String jsonPayload = createJsonPayload(folderPath, oauthId);
                ResponseEntity<String> response = callExternalApi(jsonPayload, externalApiTrain);

                if (response == null || response.getStatusCode() != HttpStatus.OK) {
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to process the request at step " + (i + 1));
                }

                System.out.println("API call " + (i + 1) + " completed successfully.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Exception occurred: " + e.getMessage());
        }

        voiceModelService.updateVoiceModelCreated(oauthId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    public String createJsonPayload(String folderPath, String oauthId) {
        ObjectMapper mapper = new ObjectMapper();
        ObjectNode rootNode = mapper.createObjectNode();

        ArrayNode dataNode = mapper.createArrayNode();
        dataNode.add("vm"+oauthId); //저장할 VoiceModel 이름
        dataNode.add("40k");
        dataNode.add("true");
        dataNode.add(folderPath);
        dataNode.add(0);
        dataNode.add(14);
        dataNode.add("rmvpe_gpu");
        dataNode.add(30); //이 값 만큼의 epoch마다 저장됨 (학습 횟수보다 큰 값으로 설정).
        dataNode.add(20); //학습 횟수
        dataNode.add(3);
        dataNode.add("Yes");
        dataNode.add("assets/pretrained_v2/f0G40k.pth");
        dataNode.add("assets/pretrained_v2/f0D40k.pth");
        dataNode.add("0");
        dataNode.add("Yes");
        dataNode.add("Yes");
        dataNode.add("v2");
        dataNode.add("0-0");


        rootNode.set("data", dataNode);
        System.out.println(rootNode.toString());

        return rootNode.toString();
    }



    private ResponseEntity<String> callExternalApi(String jsonPayload, String api) {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));

        HttpEntity<String> requestEntity = new HttpEntity<>(jsonPayload, headers);

        try {
            return restTemplate.exchange(api, HttpMethod.POST, requestEntity, String.class);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

}
