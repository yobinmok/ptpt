package com.ssafy.ptpt.api.studyroom.request;

import jakarta.persistence.ElementCollection;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Getter
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
    private List<String> entryList = new ArrayList<>();
}
