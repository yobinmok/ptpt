package com.ssafy.api.controller;

import io.swagger.annotations.ApiOperation;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/voicemodel")
public class VoicemodelController {

    @PostMapping()
    @ApiOperation(value = "음성모델 등록")
    public ResponseEntity<?> createVoicemodel(){
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/{voicemodelNo}")
    @ApiOperation(value = "음성모델 조회")
    public ResponseEntity<?> viewVoicemodel(){
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
