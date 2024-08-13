package com.ssafy.ptpt.oauth2.hadler;

import com.ssafy.ptpt.jwt.JWTUtil;
import com.ssafy.ptpt.oauth2.dto.CustomOAuth2User;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Collection;
import java.util.Iterator;

@Component
public class CustomSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    @Value("${react.server.address}")
    private String REACT_SERVER;

    private final JWTUtil jwtUtil;

    public CustomSuccessHandler(JWTUtil jwtUtil) {

        this.jwtUtil = jwtUtil;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {

        //OAuth2User
        CustomOAuth2User customUserDetails = (CustomOAuth2User) authentication.getPrincipal();
        System.out.println("customUserDetails: " + customUserDetails);
        String username = customUserDetails.getUsername();

        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        Iterator<? extends GrantedAuthority> iterator = authorities.iterator();
        GrantedAuthority auth = iterator.next();
        String role = auth.getAuthority();


        // oauthId 를 얻어오는 로직
        // 문자열을 공백으로 분리
        String[] parts = username.split(" ");
        // 첫 번째 부분의 첫 글자를 대문자로 변환
        String firstPart = parts[0];
        String firstCharUpperCase = firstPart.substring(0, 1).toUpperCase();
        String oauthId = firstCharUpperCase + parts[1];

        System.out.println("oauthId: " + oauthId);

        System.out.println("username: " + username + " role: " + role);
        String token = jwtUtil.createJwt(username, role, oauthId, 60*60*60L);

        response.addCookie(createCookie("Authorization", token));
        response.sendRedirect(REACT_SERVER + "userinfo?oauthId=" + oauthId);
    }

    private Cookie createCookie(String key, String value) {

        Cookie cookie = new Cookie(key, value);
        cookie.setMaxAge(60*60*60);
        //cookie.setSecure(true);
        cookie.setPath("/");
        
//        cookie.setHttpOnly(true);

        return cookie;
    }
}