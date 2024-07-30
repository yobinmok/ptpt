package com.ssafy.ptpt.api.service;

import org.springframework.web.servlet.view.RedirectView;

public interface KakaoService {

    public RedirectView goKakaoOAuth();
    public RedirectView goKakaoOAuth(String scope);
    public RedirectView loginCallback(String code);
    public String logout();
    String getProfile();
}
