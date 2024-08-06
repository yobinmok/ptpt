package com.ssafy.ptpt.api.member.request;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class MemberOauthIdRequest {

    @NotNull
    private String oauthId;
}
