package com.ssafy.ptpt.api.controller;

import com.ssafy.ptpt.api.model.request.AccessTokenRequestBody;
import com.ssafy.ptpt.api.model.request.AuthorizationCodeRequestBody;
import com.ssafy.ptpt.api.model.response.BaseResponseBody;
import com.ssafy.ptpt.api.model.response.TokenResponseBody;
import com.ssafy.ptpt.api.service.GoogleAuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.media.SchemaProperty;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
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
//    @ApiOperation(value = "회원가입")
    public ResponseEntity<?> signup(){
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PostMapping("/signin")
//    @ApiOperation(value = "로그인")
    public ResponseEntity<?> signin(){
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }


    @Operation(
            summary = "구글 액세스 토큰 발급",
            description = "구글 액세스 토큰 발급 (구글에서는 ID_Token이라 명명.",
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "액세스 토큰 반환",
                            content = @Content(
                                    schemaProperties = {
                                            @SchemaProperty(name = "message", schema = @Schema(type = "string", description = "message")),
                                            @SchemaProperty(name = "accessToken", schema = @Schema(type = "string", description = "액세스 토큰"))
                                    }
                            )
                    )
            }
    )
    @PostMapping("/signin/google")
//    @ApiOperation(value = "Google 로그인")
    public ResponseEntity<?> googleSignIn(@RequestBody AuthorizationCodeRequestBody authorizationCode) {
        //TODO: 최초 로그인이면 회원가입 진행하기, 데이터베이스랑 연결하기
        System.out.println("TEST!");
//        String accessToken = googleAuthService.getAccessToken(URLDecoder.decode(authorizationCode.getAuthorizationCode(), StandardCharsets.UTF_8));
        String accessToken = googleAuthService.getAccessToken(authorizationCode.getAuthorizationCode());
        return ResponseEntity.ok(TokenResponseBody.of(200, "Success", accessToken));
    }

    @Operation(
            summary = "구글 액세스 토큰 검증",
            description = "구글 액세스 토큰 검증",
            responses = {
                    @ApiResponse(responseCode = "200",
                            description = "유효한 토큰",
                            content = @Content(
                                    schemaProperties = {
                                            @SchemaProperty(name = "message", schema = @Schema(type = "string", description = "message"))
                                    }
                            )),
                    @ApiResponse(responseCode = "401",
                            description = "유효하지 않은 토큰",
                            content = @Content(
                                    schemaProperties = {
                                            @SchemaProperty(name = "message", schema = @Schema(type = "string", description = "message"))
                                    }
                            ))
            }
    )
    @PostMapping("/auth/google")
//    @ApiOperation(value = "Google Access Token 검증")
    public ResponseEntity<?> googleAuthVerify(@RequestBody AccessTokenRequestBody accessToken) throws GeneralSecurityException, IOException {
        System.out.println("ACCESS = " + accessToken.getAccessToken());
        if(googleAuthService.verifyAccessToken(accessToken.getAccessToken())) {
            return ResponseEntity.ok(BaseResponseBody.of(200, "Valid Token"));
        }
        return ResponseEntity.ok(BaseResponseBody.of(401, "Invalid Token"));
    }

    @PutMapping("/signout")
    @Operation(summary = "로그아웃")
    public ResponseEntity<?> signout(){
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{memberNo}")
    @Operation(summary = "회원 탈퇴")
    public ResponseEntity<?> deleteMember(){
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/{memberNo}")
    @Operation(summary = "회원 정보 수정")
    public ResponseEntity<?> modifyMemberInfo(){
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
