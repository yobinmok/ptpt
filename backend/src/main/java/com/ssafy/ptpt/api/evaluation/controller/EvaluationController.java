package com.ssafy.ptpt.api.evaluation.controller;

import com.ssafy.ptpt.api.evaluation.request.EvaluationCreateRequest;
import com.ssafy.ptpt.api.evaluation.response.EvaluationInfoResponse;
import com.ssafy.ptpt.api.evaluation.service.EvaluationService;
import com.ssafy.ptpt.api.evaluation.service.StatisticService;
import com.ssafy.ptpt.config.LoginMember;
import com.ssafy.ptpt.db.entity.Member;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/evaluation")
@RequiredArgsConstructor
public class EvaluationController {

    private final EvaluationService evaluationService;
    private final StatisticService statisticService;

//    member,
//@LoginMember Member member,
    // 평가 등록 될때 통계 업데이트
    @PostMapping()
    @Operation(summary = "평가 등록")
    public ResponseEntity<?> createEvaluation(@RequestBody @Valid EvaluationCreateRequest evaluationCreateRequest){
        Long evaluationId = evaluationService.createEvaluation(evaluationCreateRequest);
        return ResponseEntity.ok().body(evaluationId);
    }


    @GetMapping()
    @Operation(summary = "평가 조회")
    public ResponseEntity<?> viewEvaluation(@PathVariable("memberId") Long memberId){

        List<EvaluationInfoResponse> evaluationInfoResponse = evaluationService.findEvaluationById(memberId);
        return ResponseEntity.ok().body(evaluationInfoResponse);
    }

    @DeleteMapping("/{evaluationId}")
    @Operation(summary = "평가 삭제")
    public ResponseEntity<Void> deleteEvaluation(@LoginMember Member member, @PathVariable("evaluationId") Long evaluationId){
        evaluationService.deleteEvaluation(member, evaluationId);
        return ResponseEntity.ok().build();
    }

}
