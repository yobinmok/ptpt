package com.ssafy.ptpt.api.member.controller;

import com.google.gson.JsonParser;
import com.ssafy.ptpt.api.member.service.MemberService;
import com.ssafy.ptpt.api.member.MemberUpdateRequest;
import com.ssafy.ptpt.api.member.response.MemberProfileResponse;
import com.ssafy.ptpt.api.security.model.request.AccessTokenRequestBody;
import com.ssafy.ptpt.api.security.model.request.AuthorizationCodeRequestBody;
import com.ssafy.ptpt.api.security.model.response.BaseResponseBody;
import com.ssafy.ptpt.api.security.model.response.TokenResponseBody;
import com.ssafy.ptpt.api.security.service.GoogleAuthService;
import com.ssafy.ptpt.api.security.service.KakaoService;
import com.ssafy.ptpt.api.transformer.Trans;
import com.ssafy.ptpt.db.entity.Member;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.media.SchemaProperty;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Map;

@RestController
@RequestMapping("/member")
public class MemberController {

//    @Autowired
//    MemberService memberService;

    @Autowired
    GoogleAuthService googleAuthService;

    @Autowired
    public KakaoService kakaoService;

<<<<<<< backend/src/main/java/com/ssafy/ptpt/api/member/controller/MemberController.java
    @Autowired
    private MemberService memberService;

//    @PostMapping("/signup")
////    @ApiOperation(value = "회원가입")
//    public ResponseEntity<?> signup(){
//        return new ResponseEntity<>(HttpStatus.CREATED);
//    }
//
//    @PostMapping("/signin")
////    @ApiOperation(value = "로그인")
//    public ResponseEntity<?> signin(){
//        return new ResponseEntity<>(HttpStatus.ACCEPTED);
//    }


=======
    @PostMapping("/signup")
    @Operation(summary = "회원가입")
    public ResponseEntity<Void> signup(@RequestParam("ACCESS_TOKEN") String ACCESS_TOKEN){
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

>>>>>>> backend/src/main/java/com/ssafy/ptpt/api/member/controller/MemberController.java
//    @Operation(summary = "카카오 로그인")
//    @GetMapping("/login/kakao")
//    public RedirectView goKakaoOAuth() {
//        return kakaoService.goKakaoOAuth();
//    }
<<<<<<< backend/src/main/java/com/ssafy/ptpt/api/member/controller/MemberController.java

    @Operation(summary = "카카오 로그인")
    @PostMapping("/signin/kakao")
    public ResponseEntity<?> kakaoSignIn(@RequestBody AuthorizationCodeRequestBody authorizationCode) {
//        System.out.println(kakaoService.getProfile());
        System.out.println("로그인 API");
        String accessToken = kakaoService.getAccessToken(authorizationCode.getAuthorizationCode());
        System.out.println("!!!!!!!!!!!!!!!!!" + accessToken);
        String tokenString = Trans.token(accessToken, new JsonParser());
        String memberId = "K"+Trans.id(kakaoService.getProfile(tokenString), new JsonParser());

        Member member = memberService.findMemberByOauthId(memberId);
        if (member == null) {
            member = new Member();
            member.setOauthId(memberId);
            memberService.saveMember(member);
        }

        return ResponseEntity.ok(TokenResponseBody.of(200, "Success", tokenString, memberId));
    }

//    @Operation(summary = "카카오 권한요청")
//    @GetMapping("/authorize/kakao")
//    public RedirectView goKakaoOAuth(@RequestParam("scope") String scope) {
//        System.out.println("권한요청 API");
//        return kakaoService.goKakaoOAuth(scope);
//    }
//
//    @Operation(summary = "카카오 프로필")
//    @GetMapping("/profile/kakao")
//    public String getProfile() {
//        System.out.println("프로필 API");
//        return kakaoService.getProfile();
//    }

//    @Operation(summary = "카카오 로그아웃")
//    @PostMapping("/signout/kakao")
//    public String logout() {
//        System.out.println("로그아웃 API");
//        return kakaoService.logout();
//    }

    @Operation(summary = "카카오 액세스 토큰 검증")
=======
    @Operation(
            summary = "카카오톡 로그인",
            description = "카카오톡 OAuth2.0 인증을 통해 사용자를 로그인합니다.",
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "로그인 성공",
                            content = @Content(
                                    schema = @Schema(
                                            description = "로그인 성공 응답",
                                            example = "{ \"message\": \"로그인 성공\"}"
                                    )
                            )
                    ),
                    @ApiResponse(
                            responseCode = "400",
                            description = "잘못된 요청 또는 파라미터 오류",
                            content = @Content(
                                    schema = @Schema(
                                            description = "잘못된 요청 응답",
                                            example = "{ \"message\": \"잘못된 요청입니다. 요청 파라미터를 확인하세요.\" }"
                                    )
                            )
                    ),
                    @ApiResponse(
                            responseCode = "401",
                            description = "인증 실패 또는 인증 정보 오류",
                            content = @Content(
                                    schema = @Schema(
                                            description = "인증 실패 응답",
                                            example = "{ \"message\": \"인증에 실패하였습니다. 인증 정보를 확인하세요.\" }"
                                    )
                            )
                    ),
                    @ApiResponse(
                            responseCode = "500",
                            description = "서버 오류",
                            content = @Content(
                                    schema = @Schema(
                                            description = "서버 오류 응답",
                                            example = "{ \"message\": \"서버에서 오류가 발생했습니다. 나중에 다시 시도해 주세요.\" }"
                                    )
                            )
                    )
            }
    )
    @GetMapping("/signin/kakao")
    public RedirectView loginCallback(@RequestParam("authorize") String authorize) {
        return kakaoService.loginCallback(authorize);
    }

    @Operation(summary = "카카오 프로필")
    @GetMapping("/profile/kakao")
    public String getProfile() {
        return kakaoService.getProfile();
    }

    @Operation(
            summary = "카카오 액세스 토큰 발급",
            description = "카카오 액세스 토큰 발급.",
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
>>>>>>> backend/src/main/java/com/ssafy/ptpt/api/member/controller/MemberController.java
    @PostMapping("/auth/kakao")
    public ResponseEntity<?> kakaoAuthVerify(@RequestBody AccessTokenRequestBody accessToken) {
        System.out.println("토큰검증 API");
        if (kakaoService.verifyAccessToken(accessToken.getAccessToken())) {
            return ResponseEntity.ok(BaseResponseBody.of(200, "Valid Token"));
        }
        return ResponseEntity.ok(BaseResponseBody.of(401, "Invalid Token"));
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
        String[] tokens = googleAuthService.getAccessToken(authorizationCode.getAuthorizationCode());
        String accessToken = tokens[1];
        String memberId = "G"+googleAuthService.getUserResource(tokens[0]).get("id").asText();

        Member member = memberService.findMemberByOauthId(memberId);
        if (member == null) {
            member = new Member();
            member.setOauthId(memberId);
            memberService.saveMember(member);
        }

        return ResponseEntity.ok(TokenResponseBody.of(200, "Success", accessToken, memberId));
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
    @Operation(
            summary = "로그아웃",
            description = "현재 사용자의 세션을 종료하거나 액세스 토큰을 무효화합니다.",
            security = @SecurityRequirement(name = "bearerAuth"),
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "로그아웃 성공",
                            content = @Content(
                                    schema = @Schema(
                                            description = "로그아웃 성공 응답",
                                            example = "{ \"message\": \"로그아웃이 성공적으로 완료되었습니다.\" }"
                                    )
                            )
                    ),
                    @ApiResponse(
                            responseCode = "401",
                            description = "인증 실패 또는 요청이 잘못됨",
                            content = @Content(
                                    schema = @Schema(
                                            description = "로그아웃 실패 응답",
                                            example = "{ \"message\": \"로그아웃에 실패하였습니다. 인증 정보를 확인하세요.\" }"
                                    )
                            )
                    ),
                    @ApiResponse(
                            responseCode = "500",
                            description = "서버 오류",
                            content = @Content(
                                    schema = @Schema(
                                            description = "서버 오류 응답",
                                            example = "{ \"message\": \"서버에서 오류가 발생했습니다. 나중에 다시 시도해 주세요.\" }"
                                    )
                            )
                    )
            }
    )
    public ResponseEntity<?> signout(@RequestParam("ACCESS_TOKEN") String ACCESS_TOKEN){
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Success"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
    })
    @DeleteMapping("/{oauthId}")
    @Operation(summary = "회원 탈퇴")
    public ResponseEntity<Void> deleteMember(@PathVariable String oauthId){
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{oauthId}")
    @Operation(
            summary = "회원 정보 수정",
            description = "회원 정보 수정",
            responses = {
                    @ApiResponse(responseCode = "200",
                            description = "수정 성공"),
                    @ApiResponse(responseCode = "401",
                            description = "수정 실패")
            })
    public ResponseEntity<Void> modifyMemberInfo(@PathVariable String oauthId, @RequestBody MemberUpdateRequest memberUpdateRequest){
        return ResponseEntity.ok().build();
    }

    // 프로필 조회
    @GetMapping("/profile/{oauthId}")
    @Operation(summary = "프로필 조회")
    public ResponseEntity<MemberProfileResponse> findUserProfile(@PathVariable("oauthId") Long oauthId) {
        MemberProfileResponse memberProfileResponse = new MemberProfileResponse();
        return ResponseEntity.ok().body(memberProfileResponse);
    }
}
