package com.ssafy.ptpt.db.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Profile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int profileNo;

    @ManyToOne
    @JoinColumn(name = "member_no")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "voicemodel_no")
    private Voicemodel voiceModel;

    @ManyToOne
    @JoinColumn(name = "statisitc_no")
    private Statistic statistic;

    private int presentationNo;
    private int evaluationNo;
    private int studyroomNo;
}
