package com.ssafy.ptpt.api.studyroom.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class StudyRoomStatusRequest {
    private Long studyRoomId;
    private String nickname;
}
