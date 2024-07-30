package com.ssafy.ptpt.db.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.boot.autoconfigure.domain.EntityScan;


@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EntityScan
public class Profile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long profileNo;

    @ManyToOne
    @JoinColumn(name = "member_no")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "voicemodel_no")
    private VoiceModel voiceModel;

    @ManyToOne
    @JoinColumn(name = "statisitc_no")
    private Statistic statistic;

    private int presentationNo;
    private int evaluationNo;
    private int studyRoomNo;
}
