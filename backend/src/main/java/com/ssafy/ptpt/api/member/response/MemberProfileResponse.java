package com.ssafy.ptpt.api.member.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class MemberProfileResponse {

    private String nickname;
    private String memberPicture;
    private Long profileId;
    private Long memberId;
    private Long voiceModelId;
    private Long statisticId;
    private Long presetId;
}
