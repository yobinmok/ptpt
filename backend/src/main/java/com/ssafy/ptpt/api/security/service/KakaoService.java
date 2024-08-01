package com.ssafy.ptpt.api.security.service;

import org.springframework.web.servlet.view.RedirectView;

public interface KakaoService {

    public RedirectView goKakaoOAuth();
    public RedirectView goKakaoOAuth(String scope);
    String getAccessToken(String authorizationCode); // 추가된 부분
    public RedirectView loginCallback(String code);
    public String logout();
    String getProfile();
    public boolean verifyAccessToken(String accessToken);
}
