package com.ssafy.ptpt.api.member.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class MemberProfileResponse {

    private String nickname;
    private String memberPicture;
    private Long profileId;
    private Long memberId;
    private Long voiceModelId;
    private Long statisticId;
    private Long presetId;
}
