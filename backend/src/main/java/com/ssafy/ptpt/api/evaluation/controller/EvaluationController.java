package com.ssafy.ptpt.api.evaluation.controller;

import com.ssafy.ptpt.api.evaluation.request.EvaluationCreateRequest;
import com.ssafy.ptpt.api.evaluation.response.EvaluationInfoResponse;
import com.ssafy.ptpt.api.evaluation.service.EvaluationService;
import com.ssafy.ptpt.api.evaluation.service.StatisticService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
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

    // 평가 등록 될때 통계 업데이트
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Success"),
            @ApiResponse(responseCode = "404", description = "Not Found"),})
    @PostMapping
    @Operation(summary = "평가 등록")
    public ResponseEntity<Void> createEvaluation(@RequestParam("studyRoomId") Long studyRoomId,@RequestBody @Valid EvaluationCreateRequest evaluationCreateRequest){
        evaluationService.createEvaluation(evaluationCreateRequest);
        return ResponseEntity.ok().build();
    }


    @GetMapping("/{memberId}")
    @Operation(summary = "평가 조회")
    public ResponseEntity<List<EvaluationInfoResponse>> viewEvaluation(@PathVariable("memberId") Long memberId){
        List<EvaluationInfoResponse> evaluationInfoResponse = evaluationService.findEvaluationById(memberId);
        return ResponseEntity.ok().body(evaluationInfoResponse);
    }

    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Success"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
    })
    @DeleteMapping("/{evaluationId}")
    @Operation(summary = "평가 삭제")
    public ResponseEntity<Void> deleteEvaluation(@PathVariable("evaluationId") Long evaluationId){
        evaluationService.deleteEvaluation(evaluationId);
        return ResponseEntity.ok().build();
    }

}
