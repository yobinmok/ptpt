package com.ssafy.ptpt.db.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;


@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Statistic {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "statistic_id")
    private Long statisticId;

    @OneToOne
    @JoinColumn(name = "member_id")
    private Member member;

    private int totalDelivery;
    private int totalExpression;
    private int totalPreparation;
    private int totalLogic;
    private int totalSuitability;

    private int evaluateQuantity;

    @OneToMany(mappedBy = "statistic")
    private List<Evaluation> evaluation;

    public void createStatistic(Member member, int totalDelivery, int totalExpression, int totalPreparation, int totalLogic, int totalSuitability) {
        this.member = member;
        this.totalDelivery = totalDelivery;
        this.totalExpression = totalExpression;
        this.totalPreparation = totalPreparation;
        this.totalLogic = totalLogic;
        this.totalSuitability = totalSuitability;
        this.evaluateQuantity++;
    }

    public void updateStatistic(Evaluation evaluation){
        this.totalDelivery += evaluation.getDelivery();
        this.totalExpression += evaluation.getExpression();
        this.totalPreparation += evaluation.getPreparation();
        this.totalLogic += evaluation.getLogic();
        this.totalSuitability += evaluation.getSuitability();
        this.evaluateQuantity++;
    }

}
