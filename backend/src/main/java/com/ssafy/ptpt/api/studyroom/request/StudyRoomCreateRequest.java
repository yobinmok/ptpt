package com.ssafy.ptpt.api.studyroom.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudyRoomCreateRequest {

    @NotBlank(message = "방제목 필수 입력")
    private String studyRoomName;

    private int isPublic;

    private String studyRoomPw;

    @NotBlank(message = "발표시간 필수 입력")
    private String presentationTime;

    @NotBlank(message = "주제 필수 입력")
    private String subject;

    private String description;

    private boolean anonymity;

    private Long memberId;
}
