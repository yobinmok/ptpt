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
    private String studyRoomCode;
    private String studyRoomPw;
    private Long memberId;
    private Long presentationHost;

    public static StudyRoomInfoResponse from(StudyRoom studyRoom){
        StudyRoomInfoResponse studyRoomInfoResponse = new StudyRoomInfoResponse();
        studyRoomInfoResponse.studyRoomId = studyRoom.getStudyRoomId();
        studyRoomInfoResponse.studyRoomTitle = studyRoom.getStudyRoomTitle();
        studyRoomInfoResponse.studyRoomCode = studyRoom.getStudyRoomCode();
        studyRoomInfoResponse.studyRoomPw = studyRoom.getStudyRoomPw();
        studyRoomInfoResponse.memberId = studyRoom.getMemberId();
        studyRoomInfoResponse.presentationHost = studyRoom.getPresentationHost();

        return studyRoomInfoResponse;
    }
}
