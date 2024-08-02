package com.ssafy.ptpt.api.security.service;

import com.google.gson.JsonElement;
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


    @Override
    public String getAccessToken(String authorizationCode) {
        String param = "grant_type=authorization_code&client_id=" + REST_API_KEY +
                "&redirect_uri=" + REDIRECT_URI +
                "&client_secret=" + CLIENT_SECRET +
                "&code=" + authorizationCode;
        return httpCallService.Call("POST", TOKEN_URI, "", param);
    }

    public String getProfile(String tkn) {
        String uri = KAKAO_API_HOST + "/v2/user/me";
        return httpCallService.CallwithToken("GET", uri, tkn);
    }

    public boolean verifyAccessToken(String accessToken) {
        String uri = KAKAO_API_HOST + "/v1/user/access_token_info";
        String response = httpCallService.CallwithToken("GET", uri, accessToken);

        JsonElement element = JsonParser.parseString(response);
        if (element.getAsJsonObject().get("id") != null) {
            return true;  // 토큰이 유효함
        }
        return false;  // 토큰이 유효하지 않음
    }
}
