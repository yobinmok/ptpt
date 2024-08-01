package com.ssafy.ptpt.api.evaluation.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EvaluationCreateRequest {
    private int delivery;
    private int expression;
    private int preparation;
    private int logic;
    private int suitability;
}
