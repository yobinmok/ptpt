package com.ssafy.ptpt.db.jpa.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Profile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long profileId;

    @OneToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @OneToOne
    @JoinColumn(name = "voicemodel_id")
    private VoiceModel voiceModel;

    @OneToOne
    @JoinColumn(name = "statisitc_id")
    private Statistic statistic;

    private int presentationId;
    private int evaluationId;
    private int studyRoomId;
}
