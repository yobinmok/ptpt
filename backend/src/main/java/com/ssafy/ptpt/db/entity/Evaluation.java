package com.ssafy.ptpt.db.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Evaluation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int evaluationNo;

    private String presentationName;
    private int delivery;
    private int expression;
    private int preparation;
    private int logic;
    private int suitability;
}
