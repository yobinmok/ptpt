package com.ssafy.ptpt.db.entity;

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
public class Evaluation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long evaluationId;

    @ManyToOne
    @JoinColumn(name = "studyroom_id")
    private StudyRoom studyRoom;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "member_id")
    private Member member;

    private int delivery;
    private int expression;
    private int preparation;
    private int logic;
    private int suitability;

    public Evaluation(StudyRoom studyRoom, Member member, int delivery, int expression, int preparation, int logic, int suitability) {
        this.studyRoom = studyRoom;
        this.member = member;
        this.delivery = delivery;
        this.expression = expression;
        this.preparation = preparation;
        this.logic = logic;
        this.suitability = suitability;
    }
}
