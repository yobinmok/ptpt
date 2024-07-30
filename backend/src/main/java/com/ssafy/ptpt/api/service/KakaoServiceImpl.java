package com.ssafy.ptpt.api.service;

import com.google.gson.JsonParser;
import com.ssafy.ptpt.api.transformer.Trans;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.view.RedirectView;

@RequiredArgsConstructor
@Service
public class KakaoServiceImpl implements KakaoService {

    private final HttpSession httpSession;

    @Autowired
    public HttpCallService httpCallService;

    @Value("${rest-api-key}")
    private String REST_API_KEY;
    @Value("${redirect-uri}")
    private String REDIRECT_URI;
    @Value("${authorize-uri}")
    private String AUTHORIZE_URI;
    @Value("${token-uri}")
    public String TOKEN_URI;
    @Value("${client-secret}")
    private String CLIENT_SECRET;
    @Value("${kakao-api-host}")
    private String KAKAO_API_HOST;

    public RedirectView goKakaoOAuth() {
        return goKakaoOAuth("");
    }

    public RedirectView goKakaoOAuth(String scope) {

        String uri = AUTHORIZE_URI+"?redirect_uri="+REDIRECT_URI+"&response_type=code&client_id="+REST_API_KEY;
        if(!scope.isEmpty()) uri += "&scope="+scope;

        return new RedirectView(uri);
    }

    public RedirectView loginCallback(String code) {
        String param = "grant_type=authorization_code&client_id="+REST_API_KEY+"&redirect_uri="+REDIRECT_URI+"&client_secret="+CLIENT_SECRET+"&code="+code;
        String rtn = httpCallService.Call("POST", TOKEN_URI, "", param);
        httpSession.setAttribute("token", Trans.token(rtn, new JsonParser()));
        return new RedirectView("/index.html");
    }

    public String getProfile() {
        String uri = KAKAO_API_HOST + "/v2/user/me";
        return httpCallService.CallwithToken("GET", uri, httpSession.getAttribute("token").toString());
    }

    public String logout() {
        String uri = KAKAO_API_HOST + "/v1/user/logout";
        return httpCallService.CallwithToken("POST", uri, httpSession.getAttribute("token").toString());
    }
}
