package com.ssafy.ptpt.db.entity;

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
@EntityScan
public class StudyRoom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long studyRoomId;

    private String studyRoomName;

    @OneToMany(mappedBy = "studyRoom")
    private List<Member> entryList;

    private String studyRoomCode;

    private String studyRoomPw;

    private Long memberId;

    // 발표자
    private String presentationHost;

    // 방 공개 여부
    private boolean isPublic;

    // 발표 시간
    private String presentationTime;

    // 주제
    private String subject;

    // 설명
    private String description;

    // 익명여부
    private boolean anonymity;

    // 방 수정하기 - jpa 변경감지를 통해 entity 값 update
    public void updateStudyRoom(StudyRoom studyRoom){
        this.studyRoomName = studyRoom.getStudyRoomName();
        this.isPublic = studyRoom.isPublic;
        this.studyRoomPw = studyRoom.getStudyRoomPw();
        this.presentationTime = studyRoom.getPresentationTime();
        this.subject = studyRoom.getSubject();
        this.description = studyRoom.getDescription();
        this.anonymity = studyRoom.isAnonymity();
    }
}
