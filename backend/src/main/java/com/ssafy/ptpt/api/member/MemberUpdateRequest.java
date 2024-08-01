package com.ssafy.ptpt.api.member;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class MemberUpdateRequest {

    private String nickName;
    private String memberPicture;
}
