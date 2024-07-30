package com.ssafy.ptpt.api.controller;

//import io.swagger.annotations.ApiOperation;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/studyroom")
public class StudyroomController {

    @PostMapping()
//    @ApiOperation(value = "스터디룸 등록")
    public ResponseEntity<?> createStudyroom(){
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/{studyroomNo}")
//    @ApiOperation(value = "스터디룸 조회")
    public ResponseEntity<?> viewStudyroom(){
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{studyroomNo}")
//    @ApiOperation(value = "스터디룸 삭제")
    public ResponseEntity<?> deleteStudyroom(){
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
