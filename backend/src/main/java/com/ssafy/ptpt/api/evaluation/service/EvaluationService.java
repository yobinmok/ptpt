package com.ssafy.ptpt.api.evaluation.service;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.ptpt.api.evaluation.request.EvaluationCreateRequest;
import com.ssafy.ptpt.api.evaluation.response.FeedBackInfoResponse;
import com.ssafy.ptpt.db.jpa.entity.*;
import com.ssafy.ptpt.db.jpa.repository.EvaluationRepository;
import com.ssafy.ptpt.db.jpa.repository.MemberRepository;
import com.ssafy.ptpt.db.jpa.repository.StatisticRepository;
import com.ssafy.ptpt.db.jpa.repository.StudyRoomRepository;
import com.ssafy.ptpt.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class EvaluationService {
    private final EvaluationRepository evaluationRepository;
    private final StatisticRepository statisticRepository;
    private final StudyRoomRepository studyRoomRepository;
    private final JPAQueryFactory jpaQueryFactory;

    //test
    private final MemberRepository memberRepository;

    // 평가 등록
    @Transactional
    public Long createEvaluation(Long studyRoomId, EvaluationCreateRequest evaluationCreateRequest) {
        // 임의 멤버 데이터
        Member member = memberRepository.findById(123L)
                .orElseThrow(() -> new NotFoundException(NotFoundException.MEMBER_NOT_FOUND));
        // 평가를 등록할때 통계 테이블 업데이트 -> 해당 맴버의 데이터가 있는지 조회 먼저

        StudyRoom studyRoom = studyRoomRepository.findByStudyRoomId(studyRoomId);
        Evaluation evaluation = new Evaluation(
                                                studyRoom,
                                                evaluationCreateRequest.getDelivery(),
                                                evaluationCreateRequest.getExpression(),
                                                evaluationCreateRequest.getPreparation(),
                                                evaluationCreateRequest.getLogic(),
                                                evaluationCreateRequest.getSuitability()
                                                );

        Statistic statistic = statisticRepository.findByMemberId(member.getMemberId());
        // 데이터가 없다면 통계 테이블에 값 삽입
        if (statistic == null) {
            statistic = new Statistic();
            statistic.createStatistic(
                    evaluation.getDelivery(),
                    evaluation.getExpression(),
                    evaluation.getPreparation(),
                    evaluation.getLogic()
                    , evaluation.getSuitability() );
            // 평가 등록 처리
            statisticRepository.save(statistic);
        } else {    // 데이터가 있다면 업데이트 처리
            // 유저 정보에 매칭되는 통계값을 가져오자

            // 평가 값을 더해서 업데이트를 진행햐지
            statistic.updateStatistic(evaluation);

        }
        return evaluation.getEvaluationId();
    }

    // 평가 전체 조회
    // 스터디룸과 사용자 식별값을 통해 평가와 코멘트를 전부 가져옴
    /**
     * querydsl 을 사용하여 평가와 코멘트를 조인하여 반환합니다.
     * 1개의 평가는 1개의 코멘트랑 매칭되도록 구성
     * 내정보 화면과 스터디룸 내부에서 사용
     */
    // 스터디룸 내부 사용자 평가 조회
    // 코멘트도 가져와야 하자너
    @Transactional
    public List<FeedBackInfoResponse> findFeedBackByStudyRoomIdAndOauthId(Long studyRoomId, String oauthId) {
        QEvaluation evaluation = QEvaluation.evaluation;
        QComment comment = QComment.comment;

        return jpaQueryFactory.select(
                        Projections.bean(
                                FeedBackInfoResponse.class,
                                evaluation.evaluationId,
                                evaluation.studyRoom.studyRoomId,
                                evaluation.member.oauthId,
                                evaluation.delivery,
                                evaluation.expression,
                                evaluation.preparation,
                                evaluation.logic,
                                evaluation.suitability,
                                comment.commentContent,
                                comment.evaluation.member.nickname,
                                comment.isAnonymous
                        )
                ).from(evaluation)
                .innerJoin(comment).on(comment.commentId.eq(evaluation.comment.commentId))
                .where(evaluation.studyRoom.studyRoomId.eq(studyRoomId)
                        .and(evaluation.member.oauthId.eq(oauthId)))
                .fetch();
    }

    // 평가 삭제
    @Transactional
    public void deleteEvaluation(Long evaluationId) {
        evaluationRepository.findById(evaluationId)
                .orElseThrow(() -> new NotFoundException(NotFoundException.EVALUATION_NOT_FOUND));

        evaluationRepository.deleteById(evaluationId);
    }
    
}
