package com.ssafy.ptpt.api.controller;

import com.ssafy.ptpt.api.model.response.BaseResponseBody;
import com.ssafy.ptpt.api.model.response.TokenResponseBody;
import com.ssafy.ptpt.api.service.GoogleAuthService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.security.GeneralSecurityException;

@RestController
@RequestMapping("/member")
public class MemberController {

//    @Autowired
//    MemberService memberService;

    @Autowired
    GoogleAuthService googleAuthService;

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

    @PostMapping("/signin/google")
    @ApiOperation(value = "Google 로그인")
    public ResponseEntity<?> googleSignIn(@RequestBody String authorizationCode) {
        //TODO: 최초 로그인이면 회원가입 진행하기, 데이터베이스랑 연결하기
        System.out.println("TEST!");
        String aceessToken = googleAuthService.getAccessToken(authorizationCode);
        return ResponseEntity.ok(TokenResponseBody.of(200, "Success", aceessToken));
    }

    @GetMapping("/test")
    public ResponseEntity<?> test() {
        return ResponseEntity.ok(BaseResponseBody.of(200, "Success"));
    }

    @PostMapping("/auth/google")
    @ApiOperation(value = "Google Access Token 검증")
    public ResponseEntity<?> googleAuthVerify(@RequestBody String accessToken) throws GeneralSecurityException, IOException {
        if(googleAuthService.verifyAccessToken(accessToken)) {
            return ResponseEntity.ok(BaseResponseBody.of(200, "Success"));
        }
        return ResponseEntity.ok(BaseResponseBody.of(401, "Invalid Token"));
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
