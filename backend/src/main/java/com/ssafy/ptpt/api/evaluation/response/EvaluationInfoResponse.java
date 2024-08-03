package com.ssafy.ptpt.api.evaluation.response;

import com.ssafy.ptpt.db.jpa.entity.Evaluation;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EvaluationInfoResponse {

    private Long evaluationId;
    private Long studyRoomId;
    private Long memberId;
    private int delivery;
    private int expression;
    private int preparation;
    private int logic;
    private int suitability;
    private Long commentId;

    public static EvaluationInfoResponse from(Evaluation evaluation) {
        EvaluationInfoResponse evaluationInfoResponse = new EvaluationInfoResponse();
        evaluationInfoResponse.evaluationId = evaluation.getEvaluationId();
        evaluationInfoResponse.studyRoomId = evaluation.getStudyRoom().getStudyRoomId();
        evaluationInfoResponse.delivery = evaluation.getDelivery();
        evaluationInfoResponse.expression = evaluation.getExpression();
        evaluationInfoResponse.preparation = evaluation.getPreparation();
        evaluationInfoResponse.logic = evaluation.getLogic();
        evaluationInfoResponse.suitability = evaluation.getSuitability();
        evaluationInfoResponse.commentId = evaluation.getComment().getCommentId();

        return evaluationInfoResponse;
    }
}
