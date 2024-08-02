package com.ssafy.ptpt.api.studyroom.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.ElementCollection;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudyRoomCreateRequest {

    @NotBlank(message = "방제목 필수 입력")
    private String studyRoomTitle;

    private int isPublic;

    private String studyRoomPw;

    @NotBlank(message = "발표시간 필수 입력")
    private String presentationTime;

    @NotBlank(message = "주제 필수 입력")
    private String subject;

    private String description;

    private int anonymity;

    private Long memberId;

    @ElementCollection
    private List<Long> entryList = new ArrayList<>();
}
