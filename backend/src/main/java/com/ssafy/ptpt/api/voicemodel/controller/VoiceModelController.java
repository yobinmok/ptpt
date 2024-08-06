package com.ssafy.ptpt.api.voicemodel.controller;

import com.ssafy.ptpt.api.voicemodel.service.VoiceModelService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import reactor.core.publisher.Mono;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

@RestController
@RequestMapping("/voiceModel")
@RequiredArgsConstructor
public class VoiceModelController {

    // 추후 설정파일로 이동 및 경로 변경 필!
    @Value("${audioFile.path}")
    private String UPLOAD_PATH;
    private final VoiceModelService voiceModelService;

    @PostMapping("/audio")
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
}
