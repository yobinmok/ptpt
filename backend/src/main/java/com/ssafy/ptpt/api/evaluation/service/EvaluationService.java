package com.ssafy.ptpt.api.evaluation.service;

import com.ssafy.ptpt.api.evaluation.request.EvaluationCreateRequest;
import com.ssafy.ptpt.api.evaluation.response.EvaluationInfoResponse;
import com.ssafy.ptpt.db.entity.Evaluation;
import com.ssafy.ptpt.db.entity.Member;
import com.ssafy.ptpt.db.entity.Statistic;
import com.ssafy.ptpt.db.entity.StudyRoom;
import com.ssafy.ptpt.db.repository.EvaluationRepository;
import com.ssafy.ptpt.db.repository.MemberRepository;
import com.ssafy.ptpt.db.repository.StatisticRepository;
import com.ssafy.ptpt.db.repository.StudyRoomRepository;
import com.ssafy.ptpt.exception.NotFoundException;
import com.ssafy.ptpt.exception.NotMatchException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

import static com.ssafy.ptpt.exception.NotMatchException.MEMBER_NOT_MATCH;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class EvaluationService {
    private final EvaluationRepository evaluationRepository;
    private final StatisticRepository statisticRepository;

    //test
    private final MemberRepository memberRepository;

    // 평가 등록
    @Transactional
    public Long createEvaluation(EvaluationCreateRequest evaluationCreateRequest) {
        // 임의 멤버 데이터
        Member member = memberRepository.findById(123L)
                .orElseThrow(() -> new NotFoundException(NotFoundException.MEMBER_NOT_FOUND));
        // 평가를 등록할때 통계 테이블 업데이트 -> 해당 맴버의 데이터가 있는지 조회 먼저
        Evaluation evaluation = new Evaluation(
                                                member.getStudyRoom(),
                                                member,
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
            statistic.createStatistic(member,
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

    // 평가 조회
    @Transactional
    public List<EvaluationInfoResponse> findEvaluationById(Long memberId) {
        List<Evaluation> evaluation = evaluationRepository.findByMemberId(memberId);

        return evaluation.stream()
                .map(EvaluationInfoResponse::from)
                .collect(Collectors.toList());
    }

    // 평가 삭제
    @Transactional
    public void deleteEvaluation(Member member, Long evaluationId) {
        Evaluation evaluation = evaluationRepository.findById(evaluationId)
                .orElseThrow(() -> new NotFoundException(NotFoundException.EVALUATION_NOT_FOUND));
        if (!member.getMemberId().equals(evaluation.getMember().getMemberId())) {
            throw new NotMatchException(MEMBER_NOT_MATCH);
        }
        evaluationRepository.deleteById(evaluationId);
    }
    
}
