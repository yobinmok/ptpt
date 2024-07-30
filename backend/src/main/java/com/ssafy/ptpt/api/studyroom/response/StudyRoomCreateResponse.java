package com.ssafy.ptpt.api.studyroom.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudyRoomCreateResponse {

    // 방 고유 번호
    private Long StudyRoomId;

    // 참가자
    private String memberNo;
}
