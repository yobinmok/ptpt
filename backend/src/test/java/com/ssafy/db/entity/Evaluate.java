package com.ssafy.db.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Evaluate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int evaluateNo;

    private String presentationName;
    private Integer delivery;
    private Integer expression;
    private Integer preparation;
    private Integer logic;
    private Integer suitability;
}
