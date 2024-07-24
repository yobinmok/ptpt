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
    private int delivery;
    private int expression;
    private int preparation;
    private int logic;
    private int suitability;
}
