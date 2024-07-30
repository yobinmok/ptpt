package com.ssafy.api.controller;

import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/member")
public class MemberController {

//    @Autowired
//    MemberService memberService;

    @PostMapping("/signup")
    @ApiOperation(value = "회원가입")
    public ResponseEntity<?> signup(){
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PostMapping("/signin")
    @ApiOperation(value = "로그인")
    public ResponseEntity<?> signin(){
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }

    @PutMapping("/signout")
    @ApiOperation(value = "로그아웃")
    public ResponseEntity<?> signout(){
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{memberNo}")
    @ApiOperation(value = "회원 탈퇴")
    public ResponseEntity<?> deleteMember(){
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/{memberNo}")
    @ApiOperation(value = "회원 정보 수정")
    public ResponseEntity<?> modifyMemberInfo(){
        return new ResponseEntity<>(HttpStatus.OK);
    }


}
