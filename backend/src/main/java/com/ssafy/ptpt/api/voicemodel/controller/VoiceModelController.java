package com.ssafy.ptpt.api.voicemodel.controller;

//import io.swagger.annotations.ApiOperation;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
}
