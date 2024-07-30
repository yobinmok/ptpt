package com.ssafy.ptpt.api.studyroom.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudyRoomConnectRequest {
    private Integer studyRoomId;
    private String studyRoomPw;
}
