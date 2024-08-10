package com.ssafy.ptpt.config.oauth2;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Collections;

//@Service
//public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {
//
//    private final MemberRepository memberRepository;
//
//    public CustomOAuth2UserService(MemberRepository memberRepository) {
//        this.memberRepository = memberRepository;
//    }
//
//    @Override
//    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
//        System.out.println("!!!!!!!!!!!!!!!!!!!!!!");
//        System.out.println("아니 왜");
//        OAuth2User oAuth2User = super.loadUser(userRequest);
//        System.out.println(oAuth2User);
//
//        String registrationId = userRequest.getClientRegistration().getRegistrationId();
//        OAuth2Response oAuth2Response;
////        if (registrationId.equals("Kakao")) {
////
////            oAuth2Response = new KakaoResponse(oAuth2User.getAttributes());
////        }
////        else if (registrationId.equals("google")) {
////
////            oAuth2Response = new GoogleResponse(oAuth2User.getAttributes());
////        }
////        else {
////
////            return null;
////        }
//
//        System.out.println("!!!!!!!!!!!!!!!!!!!!!!");
////        System.out.println(oAuth2Response);
////        String username = oAuth2Response.getProvider()+" "+oAuth2Response.getProviderId();
//
////        if (existData == null) {
////
////            UserEntity userEntity = new UserEntity();
////            userEntity.setUsername(username);
////            userEntity.setEmail(oAuth2Response.getEmail());
////            userEntity.setName(oAuth2Response.getName());
////            userEntity.setRole("ROLE_USER");
////
////            userRepository.save(userEntity);
////
////            UserDTO userDTO = new UserDTO();
////            userDTO.setUsername(username);
////            userDTO.setName(oAuth2Response.getName());
////            userDTO.setRole("ROLE_USER");
////
////            return new CustomOAuth2User(userDTO);
////        }
////        else {
////
////            existData.setEmail(oAuth2Response.getEmail());
////            existData.setName(oAuth2Response.getName());
////
////            userRepository.save(existData);
////
////            UserDTO userDTO = new UserDTO();
////            userDTO.setUsername(existData.getUsername());
////            userDTO.setName(oAuth2Response.getName());
////            userDTO.setRole(existData.getRole());
////
////            return new CustomOAuth2User(userDTO);
////        }
//        return oAuth2User;
//    }
//}

@Service
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        System.out.println("제발좀 넘어와라");
        // OAuth2 제공자에서 사용자 정보를 로드
        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        OAuth2User oauth2User = null;

        if (registrationId.equals("kakao")) {
            oauth2User = loadGoogleUser(userRequest);
        }

        // 사용자 정보 반환
        return oauth2User;
    }

    private OAuth2User loadGoogleUser(OAuth2UserRequest userRequest) {
        // Google API를 호출하여 사용자 정보를 가져오는 로직 구현
        // 예: RestTemplate을 사용하여 사용자 정보 요청
        // 반환값은 OAuth2User 타입이어야 합니다
        return new DefaultOAuth2User(Collections.singleton(new SimpleGrantedAuthority("ROLE_USER")),
                Collections.singletonMap("name", "example"),
                "name");
    }
}