package com.ssafy.ptpt.api.studyroom.response;

import com.ssafy.ptpt.db.jpa.entity.StudyRoom;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class StudyRoomListResponse {

    private Long studyRoomId;

    private String studyRoomTitle;

    private String studyRoomCode;

    // 방 공개 여부
    private int isPublic;

    private String studyRoomPw;

    // 발표 시간
    private String presentationTime;

    // 주제
    private String subject;

    // 설명
    private String description;

    // 익명여부
    private int anonymity;

    // StudyRoom 객체를 StudyRoomListResponse 로 변환하는 정적 메서드
    public static StudyRoomListResponse from(StudyRoom studyRoom) {
        StudyRoomListResponse studyRoomListResponse = new StudyRoomListResponse();
        studyRoomListResponse.studyRoomId = studyRoom.getStudyRoomId();
        studyRoomListResponse.studyRoomTitle = studyRoom.getStudyRoomTitle();
        studyRoomListResponse.studyRoomCode = studyRoom.getStudyRoomCode();
        studyRoomListResponse.isPublic = studyRoom.getIsPublic();
        studyRoomListResponse.studyRoomPw = studyRoom.getStudyRoomPw();
        studyRoomListResponse.presentationTime = studyRoom.getPresentationTime();
        studyRoomListResponse.subject = studyRoom.getSubject();
        studyRoomListResponse.description = studyRoom.getDescription();
        studyRoomListResponse.anonymity = studyRoom.getAnonymity();

        return studyRoomListResponse;
    }
}
