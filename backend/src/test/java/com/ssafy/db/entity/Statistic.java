package com.ssafy.db.entity;

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

    private Integer totalDelivery;
    private Integer totalExpression;
    private Integer totalPreparation;
    private Integer totalLogic;
    private Integer totalSuitability;
    private Integer evaluateQuantity;
}
