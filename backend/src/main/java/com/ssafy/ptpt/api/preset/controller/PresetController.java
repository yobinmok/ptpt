package com.ssafy.ptpt.api.preset.controller;

//import io.swagger.annotations.ApiOperation;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/preset")
public class PresetController {

    @PostMapping()
    @Operation(summary = "프리셋 등록")
    public ResponseEntity<?> createPreset(){
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/{presetId}")
    @Operation(summary = "프리셋 조회")
    public ResponseEntity<?> viewPreset(){
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{presetId}")
    @Operation(summary = "프리셋 삭제")
    public ResponseEntity<?> deletePreset(){
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
