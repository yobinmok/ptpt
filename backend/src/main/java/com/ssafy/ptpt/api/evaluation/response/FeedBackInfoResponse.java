package com.ssafy.ptpt.api.evaluation.response;

import com.ssafy.ptpt.db.jpa.entity.Comment;
import com.ssafy.ptpt.db.jpa.entity.Evaluation;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FeedBackInfoResponse {

    private Long evaluationId;
    private Long studyRoomId;
    private String oauthId;
    private int delivery;
    private int expression;
    private int preparation;
    private int logic;
    private int suitability;
    private String commentContent;
    private String nickname;
    private int isAnonymous;

    public static FeedBackInfoResponse from(Evaluation evaluation, Comment comment) {
        FeedBackInfoResponse feedBackInfoResponse = new FeedBackInfoResponse();
        feedBackInfoResponse.evaluationId = evaluation.getEvaluationId();
        feedBackInfoResponse.studyRoomId = evaluation.getStudyRoom().getStudyRoomId();
        feedBackInfoResponse.oauthId = evaluation.getMember().getOauthId();
        feedBackInfoResponse.delivery = evaluation.getDelivery();
        feedBackInfoResponse.expression = evaluation.getExpression();
        feedBackInfoResponse.preparation = evaluation.getPreparation();
        feedBackInfoResponse.logic = evaluation.getLogic();
        feedBackInfoResponse.suitability = evaluation.getSuitability();
        feedBackInfoResponse.commentContent = comment.getCommentContent();
        feedBackInfoResponse.nickname = comment.getEvaluation().getMember().getNickname();
        feedBackInfoResponse.isAnonymous = comment.getIsAnonymous();

        return feedBackInfoResponse;
    }
}
