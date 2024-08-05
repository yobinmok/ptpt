package com.ssafy.ptpt.api.member.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class MemberUpdateRequest {

    private String oauthId;
    private String nickName;
    private String memberPicture;
}
