package com.ssafy.ptpt.api.member.request;

import lombok.Data;

@Data
public class MemberUpdateRequest {

    private String oauthId;
    private String nickName;
    private String memberPicture;
}
