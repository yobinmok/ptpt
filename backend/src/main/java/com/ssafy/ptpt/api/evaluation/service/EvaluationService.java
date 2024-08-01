package com.ssafy.ptpt.api.evaluation.service;

import com.ssafy.ptpt.api.evaluation.request.EvaluationCreateRequest;
import com.ssafy.ptpt.api.evaluation.response.EvaluationInfoResponse;
import com.ssafy.ptpt.db.entity.Evaluation;
import com.ssafy.ptpt.db.entity.Member;
import com.ssafy.ptpt.db.entity.StudyRoom;
import com.ssafy.ptpt.db.repository.EvaluationRepository;
import com.ssafy.ptpt.db.repository.MemberRepository;
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

    // 평가 등록
    @Transactional
    public Long createEvaluation(Member member, EvaluationCreateRequest evaluationCreateRequest) {
        Evaluation evaluation = new Evaluation(
                                                member.getStudyRoom(),
                                                member,
                                                evaluationCreateRequest.getDelivery(),
                                                evaluationCreateRequest.getExpression(),
                                                evaluationCreateRequest.getPreparation(),
                                                evaluationCreateRequest.getLogic(),
                                                evaluationCreateRequest.getSuitability()
                                                );
        evaluationRepository.save(evaluation);
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
