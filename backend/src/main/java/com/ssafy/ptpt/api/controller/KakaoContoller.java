package com.ssafy.ptpt.api.controller;

import com.ssafy.ptpt.api.service.KakaoService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

@RestController
public class KakaoContoller {

	@Autowired
	public KakaoService kakaoService;

	@Operation(summary = "카카오 로그인")
	@GetMapping("/login")
    public RedirectView goKakaoOAuth() {
		return kakaoService.goKakaoOAuth();
    }

	@Operation(summary = "카카오 OAuth Callback")
	@GetMapping("/login-callback")
	public RedirectView loginCallback(@RequestParam("code") String code) {
		return kakaoService.loginCallback(code);
	}

	@Operation(summary = "Redirect to Kakao OAuth with specific scope")
	@GetMapping("/authorize")
    public RedirectView goKakaoOAuth(@RequestParam("scope") String scope) {
		return kakaoService.goKakaoOAuth(scope);
    }

	@Operation(summary = "카카오 프로필")
	@GetMapping("/profile")
	public String getProfile() {
		return kakaoService.getProfile();
	}

	@Operation(summary = "카카오 로그아웃")
	@PostMapping("/logout")
    public String logout() {
    	return kakaoService.logout();
    }	
}
