package com.ssafy.ptpt.api.studyroom.response;

import com.ssafy.ptpt.db.jpa.entity.StudyRoom;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StudyRoomInfoResponse {
    private Long studyRoomId;
    private String studyRoomTitle;
    private String subject;

    // 호스트 ID
    private Long memberId;

    public static StudyRoomInfoResponse from(StudyRoom studyRoom){
        StudyRoomInfoResponse studyRoomInfoResponse = new StudyRoomInfoResponse();
        studyRoomInfoResponse.studyRoomId = studyRoom.getStudyRoomId();
        studyRoomInfoResponse.studyRoomTitle = studyRoom.getStudyRoomTitle();
        studyRoomInfoResponse.subject = studyRoom.getSubject();
        studyRoomInfoResponse.memberId = studyRoom.getMemberId();

        return studyRoomInfoResponse;
    }
}
