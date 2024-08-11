package com.ssafy.ptpt.oauth2.dto;

import lombok.Data;

@Data
public class MemberDto {
    private String role;
    private String name;
    private String username;
    private String oauthId;
}
