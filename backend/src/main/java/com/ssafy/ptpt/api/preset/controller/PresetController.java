package com.ssafy.ptpt.api.preset.controller;

//import io.swagger.annotations.ApiOperation;
import com.ssafy.ptpt.api.preset.service.PresetService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/preset")
@RequiredArgsConstructor
public class PresetController {

    private final PresetService presetService;

    @PostMapping()
    @Operation(summary = "프리셋 등록")
    public ResponseEntity<?> createPreset(){
        System.out.println("몽고디비 테스트 전");
        presetService.saveUser();

        presetService.getUser();
        System.out.println("몽고디비 테스트 완");
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
