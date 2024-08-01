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
    private String StudyRoomTitle;

    private int isPublic;

    private String studyRoomPw;
    private String presentationTime;
    private String subject;
    private String description;

    // 익명여부
    private int anonymity;


}
