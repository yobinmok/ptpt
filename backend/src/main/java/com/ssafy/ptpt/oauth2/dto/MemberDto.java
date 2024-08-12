package com.ssafy.ptpt.oauth2.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class MemberDto {
    private String role;
    private String name;
    private String username;
    private String oauthId;

    public MemberDto(String oauthId, String username, String name, String roleUser) {
        this.oauthId = oauthId;
        this.username = username;
        this.name = name;
        this.role = roleUser;
    }
}
