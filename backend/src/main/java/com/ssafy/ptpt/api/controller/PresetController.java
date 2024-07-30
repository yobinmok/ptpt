package com.ssafy.ptpt.api.controller;

//import io.swagger.annotations.ApiOperation;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/preset")
public class PresetController {

    @PostMapping()
//    @ApiOperation(value = "프리셋 등록")
    public ResponseEntity<?> createPreset(){
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/{presetId}")
//    @ApiOperation(value = "프리셋 조회")
    public ResponseEntity<?> viewPreset(){
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{presetId}")
//    @ApiOperation(value = "프리셋 삭제")
    public ResponseEntity<?> deletePreset(){
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
