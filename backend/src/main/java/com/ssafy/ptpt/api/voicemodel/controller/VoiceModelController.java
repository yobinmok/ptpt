package com.ssafy.ptpt.api.voicemodel.controller;

//import io.swagger.annotations.ApiOperation;
import com.fasterxml.jackson.databind.node.ArrayNode;
import io.swagger.v3.oas.annotations.Operation;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Collections;
import java.util.Date;
import java.util.UUID;

@RestController
@RequestMapping("/voiceModel")
public class VoiceModelController {

    @Value("${external.api.train}")
    private String externalApiTrain;

    @Value("${external.api.select}")
    private String externalApiSelect;

    @Value("${external.api.train}")
    private String externalApiConvert;

    @PostMapping()
    @Operation(summary = "음성모델 등록")
    public ResponseEntity<?> createVoiceModel(){
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/{voiceModelId}")
    @Operation(summary = "음성모델 조회")
    public ResponseEntity<?> viewVoiceModel(@PathVariable String voiceModelId){
        return new ResponseEntity<>(HttpStatus.OK);
    }


    @Value("${audioFile.preTrain}")
    private String PRETRAIN_UPLOAD_PATH;
    @PostMapping("/train")
    @Operation(summary = "음성모델 생성")
    public ResponseEntity<?> voiceModelTrain(@RequestPart(name="audio") MultipartFile audio) throws IOException {
        if (audio.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("File is empty");
        }

        // 1. 원본 파일 (PRETRAIN DATA) 저장
        String today = new SimpleDateFormat("yyMMdd").format(new Date());
        String saveFolder = PRETRAIN_UPLOAD_PATH + File.separator + today;
        File folder = new File(saveFolder);
        if (!folder.exists()) {
            folder.mkdirs();
        }
        String originalFileName = audio.getOriginalFilename();
        String saveFileName = UUID.randomUUID() + originalFileName.substring(originalFileName.lastIndexOf('.'));
        File originalFile = new File(folder, saveFileName);
        audio.transferTo(originalFile);
        System.out.println(saveFolder);

        // 폴더 경로와 파일 경로를 JSON 데이터에 포함시키는 로직
        String folderPath = folder.getAbsolutePath();

        // 2. JSON 데이터 생성 및 API 호출
        String filePath = originalFile.getAbsolutePath();
        try {
            for (int i = 0; i < 4; i++) {
                String jsonPayload = createJsonPayload(folderPath);
                ResponseEntity<String> response = callExternalApi(jsonPayload, externalApiTrain);

                if (response == null || response.getStatusCode() != HttpStatus.OK) {
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to process the request at step " + (i + 1));
                }

                System.out.println("API call " + (i + 1) + " completed successfully.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Exception occurred: " + e.getMessage());
        }

        return new ResponseEntity<>(HttpStatus.OK);
    }

    public String createJsonPayload(String folderPath) {
        ObjectMapper mapper = new ObjectMapper();
        ObjectNode rootNode = mapper.createObjectNode();

        ArrayNode dataNode = mapper.createArrayNode();
        dataNode.add("memberVoiceModel");
        dataNode.add("40k");
        dataNode.add("true");
        dataNode.add(folderPath);
        dataNode.add(0);
        dataNode.add(14);
        dataNode.add("rmvpe_gpu");
        dataNode.add(20);
        dataNode.add(30);
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
