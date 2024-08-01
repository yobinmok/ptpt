package com.ssafy.ptpt.api.member.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MemberProfileResponse {

    private Long memberId;
    private Long voiceModelId;
    private Long statisticId;
    private Long studyRoomId;
    private Long presetId;
}
