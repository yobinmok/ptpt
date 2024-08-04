package com.ssafy.ptpt.api.member.request;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MemberIdRequest {

    @NotNull
    private String oauthId;
}
