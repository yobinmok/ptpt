package com.ssafy.ptpt.api.voicemodel.controller;

//import io.swagger.annotations.ApiOperation;
import io.swagger.v3.oas.annotations.Operation;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException

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

//    @Value("${planThumbFile.path}")
    private String UPLOAD_PATH = "C:/Users/SSAFY/Desktop/src/ttsUpload";
    //    MultipartFile: multipart/form-data 파일을 처리할 수 있도록 설계된 클래스
    @PostMapping("/audio")
    public ResponseEntity<?> getTtsVoice(@RequestPart(name="audio") MultipartFile audio) throws IOException {
        if (audio.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("File is empty");
        }
        String today = new SimpleDateFormat("yyMMdd").format(new Date());
        String saveFolder = UPLOAD_PATH + File.separator + today;
        File folder = new File(saveFolder);
        if (!folder.exists()) {
            folder.mkdirs();
        }
        String originalFileName = audio.getOriginalFilename();
        String saveFileName = UUID.randomUUID() + originalFileName.substring(originalFileName.lastIndexOf('.'));
        audio.transferTo(new File(folder, saveFileName));
        System.out.println(saveFolder);
        return new ResponseEntity<>(HttpStatus.OK);
    }


//    @Value("${planThumbFile.preTrain}")
    private String PRETRAIN_UPLOAD_PATH = "C:/Users/SSAFY/Desktop/src/preTrain";
    private String POSTTRAIN_UPLOAD_PATH = "C:/Users/SSAFY/Desktop/src/postTrain";
    //    MultipartFile: multipart/form-data 파일을 처리할 수 있도록 설계된 클래스
    @PostMapping("/preTrainAudio")
    public ResponseEntity<?> getPreTrainVoice(@RequestPart(name="audio") MultipartFile audio) throws IOException {
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
                String jsonPayload = createJsonPayload(filePath);
                ResponseEntity<String> response = callExternalApi(jsonPayload);

                // 응답을 받지 못한 경우
                if (response == null || response.getStatusCode() != HttpStatus.OK) {
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to process the request at step " + (i + 1));
                }

                // API 호출 응답에 따라 다음 호출 준비 (필요시 대기)
                System.out.println("API call " + (i + 1) + " completed successfully.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Exception occurred: " + e.getMessage());
        }



        return new ResponseEntity<>(HttpStatus.OK);
    }



    private String createJsonPayload(String folderPath) throws ParseException {
        // JSON 으로 파싱할 문자열
        String str = "{\"name\" : \"apple\", \"id\" : 1, \"price\" : 1000}";

        // JSONParser로 JSONObject로 변환
        JSONObject jsonObject = (JSONObject) new JSONParser().parse(str);

        // 추가
        jsonObject.put("count", 5);

        // JSON 데이터 생성 예제
        return "{"
                + "\"data\":["
                + "\"memberVoiceModel\","
                + "\"40k\","
                + "\"true\","
                + "\"" + folderPath + "\","
                + "0,"
                + "14,"
                + "\"rmvpe_gpu\","
                + "20,"
                + "20,"
                + "3,"
                + "\"Yes\","
                + "\"assets/pretrained_v2/f0G40k.pth\","
                + "\"assets/pretrained_v2/f0D40k.pth\","
                + "\"0\","
                + "\"Yes\","
                + "\"Yes\","
                + "\"v2\","
                + "\"0-0\""
                + "]"
                + "}";
    }

    @Value("${external.api.url}")
    private String externalApiUrl;

    private ResponseEntity<String> callExternalApi(String jsonPayload) {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));

        HttpEntity<String> requestEntity = new HttpEntity<>(jsonPayload, headers);

        try {
            return restTemplate.exchange(externalApiUrl, HttpMethod.POST, requestEntity, String.class);
        } catch (Exception e) {
            // 예외 처리
            e.printStackTrace();
            return null;
        }
    }

}
