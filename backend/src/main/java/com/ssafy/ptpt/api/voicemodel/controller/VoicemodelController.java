package com.ssafy.ptpt.api.voicemodel.controller;

//import io.swagger.annotations.ApiOperation;
import io.swagger.v3.oas.annotations.Operation;
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
    @Operation(summary = "음성모델 등록")
    public ResponseEntity<?> createVoicemodel(){
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/{voicemodelId}")
    @Operation(summary = "음성모델 조회")
    public ResponseEntity<?> viewVoicemodel(){
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
