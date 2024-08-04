package com.ssafy.ptpt.api.member.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MemberProfileResponse {

    private String nickname;
    private String memberPicture;
    private String oauthId;
    private Long voiceModelId;
    private Long statisticId;
    private Long presetId;
}
