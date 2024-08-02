package com.ssafy.ptpt.api.security.service;

import org.springframework.web.servlet.view.RedirectView;

public interface KakaoService {

    String getAccessToken(String authorizationCode); // 추가된 부분
    String getProfile(String accessToken);
    public boolean verifyAccessToken(String accessToken);
}
