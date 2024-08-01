package com.ssafy.ptpt.api.studyroom.request;

import jakarta.validation.constraints.NotBlank;
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

    // 방 공개 여부
    private boolean isPublic;

    // 방 비밀번호
    private String StudyRoomPw;

    // 발표 시간
    @NotBlank(message = "발표시간 필수 입력")
    private String presentationTime;

    // 주제
    @NotBlank(message = "주제 필수 입력")
    private String subject;

    // 설명
    private String description;

    // 익명여부
    private boolean anonymity;

    // 호스트
    private Long memberId;
}
