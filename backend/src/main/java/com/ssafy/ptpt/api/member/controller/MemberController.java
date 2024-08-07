package com.ssafy.ptpt.api.member.controller;

import com.google.gson.JsonParser;
import com.ssafy.ptpt.api.member.request.MemberNicknameRequest;
import com.ssafy.ptpt.api.member.request.MemberOauthIdRequest;
import com.ssafy.ptpt.api.member.request.MemberUpdateRequest;
import com.ssafy.ptpt.api.member.response.MemberProfileResponse;
import com.ssafy.ptpt.api.member.response.MemberStatisticResponse;
import com.ssafy.ptpt.api.member.service.MemberService;
import com.ssafy.ptpt.api.security.model.request.AccessTokenRequestBody;
import com.ssafy.ptpt.api.security.model.request.AuthorizationCodeRequestBody;
import com.ssafy.ptpt.api.security.model.response.BaseResponseBody;
import com.ssafy.ptpt.api.security.model.response.TokenResponseBody;
import com.ssafy.ptpt.api.security.service.GoogleAuthService;
import com.ssafy.ptpt.api.security.service.KakaoService;
import com.ssafy.ptpt.api.transformer.Trans;
import com.ssafy.ptpt.db.jpa.entity.Member;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.media.SchemaProperty;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.security.GeneralSecurityException;

@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
public class MemberController {

    private final GoogleAuthService googleAuthService;
    private final KakaoService kakaoService;
    private final MemberService memberService;

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
                                             @SchemaProperty(name = "accessToken", schema = @Schema(type = "string", description = "액세스 토큰")),
                                             @SchemaProperty(name = "oauthId", schema = @Schema(type = "string", description = "oauthId"))
                                     }
                             )
                     )
            }
    )
    @PostMapping("/signin/kakao")
    public ResponseEntity<?> kakaoSignIn(@RequestBody AuthorizationCodeRequestBody authorizationCode) {
        System.out.println("로그인 API");
        String accessToken = kakaoService.getAccessToken(authorizationCode.getAuthorizationCode());
        System.out.println("!!!!!!!!!!!!!!!!!" + accessToken);
        String tokenString = Trans.token(accessToken, new JsonParser());
        String oauthId = "K"+Trans.id(kakaoService.getProfile(tokenString), new JsonParser());

        Member member = memberService.saveMember(oauthId);
        if(member != null){
            memberService.saveProfile(member);
            return ResponseEntity.ok(TokenResponseBody.of(200, "Success", tokenString, oauthId));
        }else{
            return ResponseEntity.ok(TokenResponseBody.of(200, "Existing Member", tokenString, oauthId));
        }
    }


    @Operation(
            summary = "카카오 액세스 토큰 검증",
            description = "카카오 액세스 토큰 검증",
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
    @PostMapping("/auth/kakao")
    public ResponseEntity<?> kakaoAuthVerify(@RequestBody AccessTokenRequestBody accessToken) {
        System.out.println("토큰검증 API");
        if (kakaoService.verifyAccessToken(accessToken.getAccessToken())) {
            return ResponseEntity.ok(BaseResponseBody.of(200, "Valid Token"));
        }
        return ResponseEntity.ok(BaseResponseBody.of(401, "Invalid Token"));
    }


    @PostMapping("/signout/kakao")
    @Operation(
            summary = "카카오 로그아웃",
            description = "카카오 사용자의 세션을 종료하거나 액세스 토큰을 무효화합니다.",
            responses = {
                    @ApiResponse(responseCode = "200", description = "로그아웃 성공"),
                    @ApiResponse(responseCode = "401", description = "로그아웃 실패")
            })
    public ResponseEntity<?> kakaoLogout(@RequestBody AccessTokenRequestBody accessTokenRequestBody) {
        try {
            boolean result = kakaoService.logout(accessTokenRequestBody.getAccessToken());
            if (result) {
                return ResponseEntity.ok(BaseResponseBody.of(200, "로그아웃 성공"));
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(BaseResponseBody.of(401, "로그아웃 실패"));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(BaseResponseBody.of(500, "서버 오류"));
        }
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
                                            @SchemaProperty(name = "accessToken", schema = @Schema(type = "string", description = "액세스 토큰")),
                                            @SchemaProperty(name = "oauthId", schema = @Schema(type = "string", description = "oauthId"))
                                    }
                            )
                    )
            }
    )
    @PostMapping("/signin/google")
    public ResponseEntity<?> googleSignIn(@RequestBody AuthorizationCodeRequestBody authorizationCode) {
        String[] tokens = googleAuthService.getAccessToken(authorizationCode.getAuthorizationCode());
        String accessToken = tokens[1];
        String oauthId = "G"+googleAuthService.getUserResource(tokens[0]).get("id").asText();

        Member member = memberService.saveMember(oauthId);
        if(member != null){
            memberService.saveProfile(member);
            return ResponseEntity.ok(TokenResponseBody.of(200, "Existing Member", accessToken, oauthId));
        }else{
            return ResponseEntity.ok(TokenResponseBody.of(200, "Success", accessToken, oauthId));
        }
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
    @DeleteMapping("/withdraw")
    @Operation(summary = "회원 탈퇴")
    public ResponseEntity<Void> withdrawMember(@RequestBody @Valid MemberOauthIdRequest memberOauthIdRequest){
        int complete = memberService.withdrawMember(memberOauthIdRequest);
        return complete == 1 ? ResponseEntity.ok().build() : ResponseEntity.badRequest().build();
    }

    @PutMapping("/modify")
    @Operation(
            summary = "회원 정보 수정",
            description = "회원 정보 수정",
            responses = {
                    @ApiResponse(responseCode = "200",
                            description = "수정 성공"),
                    @ApiResponse(responseCode = "401",
                            description = "수정 실패")
            })
    public ResponseEntity<Void> modifyMemberInfo(@RequestBody MemberUpdateRequest memberUpdateRequest){
        int complete = memberService.modifyMemberInfo(memberUpdateRequest);
        return complete == 1 ? ResponseEntity.ok().build() : ResponseEntity.badRequest().build();
    }


    // 프로필 조회
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Success"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
    })
    @PostMapping("/profile")
    @Operation(summary = "프로필 조회")
    public ResponseEntity<MemberProfileResponse> findUserProfile(@RequestBody @Valid MemberOauthIdRequest memberOauthIdRequest) {
        MemberProfileResponse memberProfile = memberService.findMemberProfile(memberOauthIdRequest.getOauthId());
        return ResponseEntity.ok().body(memberProfile);
    }


    /**
     * 사용자 신고기능
     * 사용작의 정보를 조회하여
     * 신고횟수 확인 후
     * 3회 일시 정지
     * else 신고횟수 누적++
     *
     */
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Success"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
    })
    @PostMapping("/report")
    @Operation(summary = "유저 신고")
    public ResponseEntity<Void> memberReport(@RequestBody @Valid MemberNicknameRequest memberOauthIdRequest) {
        memberService.memberReport(memberOauthIdRequest);
        return ResponseEntity.ok().build();
    }

    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Success"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
    })
    @GetMapping("/{nickname}")
    @Operation(summary = "닉네임 중복 체크")
    public ResponseEntity<String> nicknameDuplicateCheck(@PathVariable("nickname") String nickname) {
        return (memberService.nicknameDuplicateCheck(nickname) == null)
                ? ResponseEntity.ok().body("입력한 닉네임 사용 가능.")
                : ResponseEntity.badRequest().body("입력한 닉네임이 이미 사용 중입니다.");
    }

    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Success"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
    })
    @PostMapping("/statistic")
    @Operation(summary = "프로필 화면에서 통계를 조회할수 있습니다")
    public ResponseEntity<MemberStatisticResponse> findMemberStatistic(@RequestBody @Valid MemberNicknameRequest memberOauthIdRequest) {
        MemberStatisticResponse memberStatisticResponse = memberService.findMemberStatistic(memberOauthIdRequest);
        return ResponseEntity.ok().body(memberStatisticResponse);
    }

}
