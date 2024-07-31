package com.ssafy.ptpt.api.studyroom.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudyRoomUpdateRequest {

    // 방 이름
    @NotBlank(message = "이름은 필수")
    private String StudyRoomName;

    // 방장
    private Long StudyRoomAdminId;

    // 인원
    @NotNull(message = "인원 설정")
    private Integer entryListLimit;
}
