package com.ssafy.ptpt.api.studyroom.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudyRoomCreateRequest {
    // 방 이름
    @NotBlank(message = "방제목 필수 입력")
    private String StudyRoomName;

    // 방 비밀번호
    private String StudyRoomPw;

    // 방 인원
    @NotNull(message = "참가 인원수 지정은 필수")
    private Integer entryListLimit;
}
