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
    public ResponseEntity<Long> createEvaluation(@RequestParam("studyRoomId") Long studyRoomId,@RequestBody @Valid EvaluationCreateRequest evaluationCreateRequest){
        Long evaluationId = evaluationService.createEvaluation(studyRoomId, evaluationCreateRequest);
        return ResponseEntity.ok().body(evaluationId);
    }


    // 프로필 화면에서 조회한 사용자의 스터디룸을 클릭했을때 평가를 조회
    @GetMapping("/{studyRoomId}")
    @Operation(summary = "사용자 별 스터디룸 조회")
    public ResponseEntity<List<EvaluationInfoResponse>> findByEvaluation(@PathVariable("studyRoomId") Long studyRoomId){
        List<EvaluationInfoResponse> evaluationInfoResponse = evaluationService.findByStudyRoomId(studyRoomId);
        return ResponseEntity.ok().body(evaluationInfoResponse);
    }

    @PostMapping("/studyRoom")
    @Operation(summary = "스터디 룸 내부 사용자 평가 조회")
    public ResponseEntity<List<EvaluationInfoResponse>> findByStudyRoomMemberEvaluation(@RequestParam("studyRoomId") Long studyRoomId,
                                                                                        @RequestParam("oauthId") String oauthId){
        List<EvaluationInfoResponse> evaluationInfoResponse = evaluationService.findByStudyRoomIdAndOauthId(studyRoomId, oauthId);
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
