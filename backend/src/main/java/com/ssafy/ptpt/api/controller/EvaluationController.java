package com.ssafy.ptpt.api.controller;

import io.swagger.v3.oas.annotations.Operation;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/evaluation")
public class EvaluationController {

    @PostMapping()
    @Operation(summary = "평가 등록")
    public ResponseEntity<?> createEvaluation(){
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping()
    @Operation(summary = "평가 조회")
    public ResponseEntity<?> viewEvaluation(){
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping()
    @Operation(summary = "평가 삭제")
    public ResponseEntity<?> deleteEvaluation(){
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
