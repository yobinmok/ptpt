package com.ssafy.ptpt.api.studyroom.response;

import com.ssafy.ptpt.db.jpa.entity.StudyRoom;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudyRoomInfoResponse {
    private Long studyRoomId;
    private String studyRoomTitle;
    private List<String> entryList;
    private String studyRoomCode;
    private String studyRoomPw;
    private String oauthId;
    private String presentationHost;

    public static StudyRoomInfoResponse from(StudyRoom studyRoom){
        StudyRoomInfoResponse studyRoomInfoResponse = new StudyRoomInfoResponse();
        studyRoomInfoResponse.studyRoomId = studyRoom.getStudyRoomId();
        studyRoomInfoResponse.studyRoomTitle = studyRoom.getStudyRoomTitle();
        studyRoomInfoResponse.entryList = studyRoom.getEntryList();
        studyRoomInfoResponse.studyRoomCode = studyRoom.getStudyRoomCode();
        studyRoomInfoResponse.studyRoomPw = studyRoom.getStudyRoomPw();
        studyRoomInfoResponse.oauthId = studyRoom.getOauthId();
        studyRoomInfoResponse.presentationHost = studyRoom.getPresentationHost();

        return studyRoomInfoResponse;
    }
}
