package com.ssafy.ptpt.api.studyroom.response;

import com.ssafy.ptpt.api.member.MemberInfoResponse;
import com.ssafy.ptpt.db.entity.StudyRoom;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudyRoomInfoResponse {
    private Long studyRoomId;
    private String studyRoomTitle;
    private List<Long> entryList;
    private String studyRoomCode;
    private String studyRoomPw;
    private Long memberId;
    private Long presentationHost;

    public static StudyRoomInfoResponse from(StudyRoom studyRoom){
        StudyRoomInfoResponse studyRoomInfoResponse = new StudyRoomInfoResponse();
        studyRoomInfoResponse.studyRoomId = studyRoom.getStudyRoomId();
        studyRoomInfoResponse.studyRoomTitle = studyRoom.getStudyRoomTitle();
        studyRoomInfoResponse.entryList = studyRoom.getEntryList();
        studyRoomInfoResponse.studyRoomCode = studyRoom.getStudyRoomCode();
        studyRoomInfoResponse.studyRoomPw = studyRoom.getStudyRoomPw();
        studyRoomInfoResponse.memberId = studyRoom.getMemberId();
        studyRoomInfoResponse.presentationHost = studyRoom.getPresentationHost();

        return studyRoomInfoResponse;
    }
}
