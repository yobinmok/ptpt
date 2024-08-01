package com.ssafy.ptpt.api.evaluation.controller;

import com.ssafy.ptpt.api.evaluation.request.EvaluationCreateRequest;
import com.ssafy.ptpt.api.evaluation.response.EvaluationInfoResponse;
import com.ssafy.ptpt.api.evaluation.service.EvaluationService;
import com.ssafy.ptpt.api.studyroom.request.StudyRoomCreateRequest;
import com.ssafy.ptpt.api.studyroom.response.StudyRoomInfoResponse;
import com.ssafy.ptpt.config.LoginMember;
import com.ssafy.ptpt.db.entity.Member;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/evaluation")
@RequiredArgsConstructor
public class EvaluationController {

    private final EvaluationService evaluationService;

    @PostMapping()
    @Operation(summary = "평가 등록")
    public ResponseEntity<?> createEvaluation(@LoginMember Member member,
                                              @RequestBody @Valid EvaluationCreateRequest evaluationCreateRequest){
        Long evaluationId = evaluationService.createEvaluation(member, evaluationCreateRequest);
        return ResponseEntity.ok().body(evaluationId);
    }


    @GetMapping()
    @Operation(summary = "평가 조회")
    public ResponseEntity<?> viewEvaluation(@LoginMember Member member,
                                            @PathVariable("evaluationId") Long evaluationId){

        EvaluationInfoResponse evaluationInfoResponse = evaluationService.findEvaluationById(evaluationId);
        return ResponseEntity.ok().body(evaluationInfoResponse);
    }

    @DeleteMapping("/{evaluationId}")
    @Operation(summary = "평가 삭제")
    public ResponseEntity<Void> deleteEvaluation(@LoginMember Member member, @PathVariable("evaluationId") Long evaluationId){
        evaluationService.deleteEvaluation(member, evaluationId);
        return ResponseEntity.ok().build();
    }

}
