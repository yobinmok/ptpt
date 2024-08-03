package com.ssafy.ptpt.db.jpa.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Evaluation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "evaluation_id")
    private Long evaluationId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "studyroom_id")
    private StudyRoom studyRoom;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "statistic_id")
    private Statistic statistic;

    @OneToOne(mappedBy = "evaluation")
    private Comment comment;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "oauth_id")
    private Member member;

    private int delivery;
    private int expression;
    private int preparation;
    private int logic;
    private int suitability;

    public Evaluation(StudyRoom studyRoom, int delivery, int expression, int preparation, int logic, int suitability) {
        this.studyRoom = studyRoom;
        this.delivery = delivery;
        this.expression = expression;
        this.preparation = preparation;
        this.logic = logic;
        this.suitability = suitability;
    }

    public Evaluation(StudyRoom studyRoom, Statistic statistic, Comment comment, Member member, int delivery, int expression, int preparation, int logic, int suitability) {
        this.studyRoom = studyRoom;
        this.statistic = statistic;
        this.comment = comment;
        this.member = member;
        this.delivery = delivery;
        this.expression = expression;
        this.preparation = preparation;
        this.logic = logic;
        this.suitability = suitability;
    }
}
