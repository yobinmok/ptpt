package com.ssafy.ptpt.db.entity;

import com.ssafy.ptpt.api.studyroom.request.StudyRoomUpdateRequest;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.boot.autoconfigure.domain.EntityScan;

import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StudyRoom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long studyRoomId;

    private String studyRoomTitle;

    @OneToMany(mappedBy = "studyRoom")
    private List<Member> entryList;

    @OneToMany(mappedBy = "studyRoom")
    private List<Evaluation> Evaluation;

    private String studyRoomCode;

    private String studyRoomPw;

    private Long memberId;

    // 발표자
    private String presentationHost;

    // 방 공개 여부
    private int isPublic;

    // 발표 시간
    private String presentationTime;

    // 주제
    private String subject;

    // 설명
    private String description;

    // 익명여부
    private int anonymity;

    // 방 수정하기 - jpa 변경감지를 통해 entity 값 update
    public void updateStudyRoom(StudyRoomUpdateRequest studyRoomUpdateRequest){
        this.studyRoomTitle = studyRoomUpdateRequest.getStudyRoomTitle();
        this.isPublic = studyRoomUpdateRequest.getIsPublic();
        this.studyRoomPw = studyRoomUpdateRequest.getStudyRoomPw();
        this.presentationTime = studyRoomUpdateRequest.getPresentationTime();
        this.subject = studyRoomUpdateRequest.getSubject();
        this.description = studyRoomUpdateRequest.getDescription();
        this.anonymity = studyRoomUpdateRequest.getAnonymity();
    }
}
