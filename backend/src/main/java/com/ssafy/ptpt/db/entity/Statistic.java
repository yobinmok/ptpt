package com.ssafy.ptpt.db.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Statistic {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int statisticNo;

    private int totalDelivery;
    private int totalExpression;
    private int totalPreparation;
    private int totalLogic;
    private int totalSuitability;
    private int evaluateQuantity;
}
