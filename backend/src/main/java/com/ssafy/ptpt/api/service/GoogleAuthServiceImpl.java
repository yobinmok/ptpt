package com.ssafy.ptpt.api.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken.Payload;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;

import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;

@Getter
@Setter
@Service
public class GoogleAuthServiceImpl implements GoogleAuthService {

    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${spring.security.oauth2.client.registration.google.clientId}")
    private String CLIENT_ID;
    @Value("${spring.security.oauth2.client.registration.google.clientSecret}")
    private String CLIENT_PW;
    @Value("${spring.security.oauth2.client.registration.google.token-uri}")
    private String TOKEN_URI;
    @Value("${spring.security.oauth2.client.registration.google.resource-uri}")
    private String RESOURCE_URI;
    @Value("${spring.security.oauth2.client.registration.google.redirect-uri}")
    private String REDIRECT_URI;

    @Override
    public String getAccessToken(String authorizationCode) {
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        System.out.println(authorizationCode);
        params.add("code", authorizationCode);
        params.add("client_id", CLIENT_ID);
        params.add("client_secret", CLIENT_PW);
        params.add("redirect_uri", REDIRECT_URI);
        params.add("grant_type", "authorization_code");

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        HttpEntity entity = new HttpEntity(params, headers);
        ResponseEntity<JsonNode> responseNode = restTemplate.exchange(TOKEN_URI, HttpMethod.POST, entity, JsonNode.class);
        JsonNode accessTokenNode = responseNode.getBody();

//        return accessTokenNode.get("access_token").asText();
        return accessTokenNode.get("id_token").asText();    //구글에서 액세스 토큰과 이이디 토큰을 둘다 반환해주는데 구글의 액세스토큰은 jwt가 아니다. 따라서 id토큰을 사용하였다.

    }

    /**
     * 구글 회원 정보 조회
     * @param accessToken 조회할 회원의 액세스 토큰
     * @return 조회한 데이터 JsonNode
     */
    @Override
    public JsonNode getUserResource(String accessToken) {

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer" + accessToken);
        HttpEntity entity = new HttpEntity(headers);
        JsonNode res = restTemplate.exchange(RESOURCE_URI, HttpMethod.GET, entity, JsonNode.class).getBody();

        String id = res.get("id").asText();
        String email = res.get("email").asText();
        String nickname = res.get("name").asText();
        System.out.println("id = " + id);
        System.out.println("email = " + email);
        System.out.println("nickname = " + nickname);

        return res;
    }

    /**
     * 액세스 토큰 검증
     * @param accessToken
     * @return 토큰이 유효하면 True
     * @throws GeneralSecurityException
     * @throws IOException
     */
    @Override
    public boolean verifyAccessToken(String accessToken) throws GeneralSecurityException, IOException {
        System.out.println("ACCESSTOKEN 2 = " + accessToken);
        HttpTransport transport = new NetHttpTransport();
//        JsonFactory jsonFactory = JacksonFactory.getDefaultInstance(); deprecated 공식 문서에서는 Gson사용을 권장
        JsonFactory jsonFactory = GsonFactory.getDefaultInstance();

        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(transport, jsonFactory)
                // Specify the CLIENT_ID of the app that accesses the backend:
                .setAudience(Collections.singletonList(CLIENT_ID))
                // Or, if multiple clients access the backend:
                //.setAudience(Arrays.asList(CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3))
                .build();

// (Receive idTokenString by HTTPS POST)
        GoogleIdToken idToken = verifier.verify(accessToken);
        //TODO: 받은 Token의 유저와 제출한 유저의 이름이 일치하는지? 검증? 토큰이 탈취되어서 전송된것인지 체크
        if (idToken != null) {
            Payload payload = idToken.getPayload();

            // Print user identifier
            String userId = payload.getSubject();
            System.out.println("User ID: " + userId);

            // Get profile information from payload
            String email = payload.getEmail();
            boolean emailVerified = Boolean.valueOf(payload.getEmailVerified());
            String name = (String) payload.get("name");
            String pictureUrl = (String) payload.get("picture");
            String locale = (String) payload.get("locale");
            String familyName = (String) payload.get("family_name");
            String givenName = (String) payload.get("given_name");

            System.out.println(email);
            System.out.println(name);
            System.out.println(locale);
            // Use or store profile information
            // ...
            return true;
        } else {
            System.out.println("Invalid ID token.");
            return false;
        }
    }
}
