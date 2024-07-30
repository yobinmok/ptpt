package com.ssafy.ptpt.api.controller;

import com.ssafy.ptpt.api.service.KakaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;

@RestController
public class KakaoContoller {

	@Autowired
	public KakaoService kakaoService;

	@RequestMapping("/login")
    public RedirectView goKakaoOAuth() {
		return kakaoService.goKakaoOAuth();
    }

	@RequestMapping("/login-callback")
	public RedirectView loginCallback(@RequestParam("code") String code) {
		return kakaoService.loginCallback(code);
	}
	
	@RequestMapping("/authorize")
    public RedirectView goKakaoOAuth(@RequestParam("scope") String scope) {
		return kakaoService.goKakaoOAuth(scope);
    }	

	@RequestMapping("/logout")
    public String logout() {
    	return kakaoService.logout();
    }	
}
