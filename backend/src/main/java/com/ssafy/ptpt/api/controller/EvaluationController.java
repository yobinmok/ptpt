package com.ssafy.ptpt.api.controller;

import io.swagger.annotations.ApiOperation;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/evaluation")
public class EvaluationController {

    @PostMapping()
    @ApiOperation(value = "평가 등록")
    public ResponseEntity<?> createEvaluation(){
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping()
    @ApiOperation(value = "평가 조회")
    public ResponseEntity<?> viewEvaluation(){
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping()
    @ApiOperation(value = "평가 삭제")
    public ResponseEntity<?> deleteEvaluation(){
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
