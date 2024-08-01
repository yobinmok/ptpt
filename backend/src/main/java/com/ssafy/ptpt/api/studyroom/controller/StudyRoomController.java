package com.ssafy.ptpt.api.studyroom.controller;

import com.ssafy.ptpt.api.studyroom.request.StudyRoomConnectRequest;
import com.ssafy.ptpt.api.studyroom.request.StudyRoomCreateRequest;
import com.ssafy.ptpt.api.studyroom.request.StudyRoomUpdateRequest;
import com.ssafy.ptpt.api.studyroom.response.StudyRoomInfoResponse;
import com.ssafy.ptpt.api.studyroom.response.StudyRoomListResponse;
import com.ssafy.ptpt.api.studyroom.service.StudyRoomService;
import com.ssafy.ptpt.config.LoginMember;
import com.ssafy.ptpt.db.entity.Member;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/studyRoom")
@RequiredArgsConstructor
public class StudyRoomController {

    private final StudyRoomService studyRoomService;

    //방 생성
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Success"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
    })
    @PostMapping
    @Operation(summary = "스터디룸 등록")
    public ResponseEntity<Void> createRoom(@RequestBody @Valid StudyRoomCreateRequest studyRoomCreateRequest) {
        studyRoomService.createStudyRoom(studyRoomCreateRequest);
        return ResponseEntity.ok().build();
    }
    //방 조회
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Success"),
            @ApiResponse(responseCode = "404", description = "Not Found", content = @Content(schema = @Schema(hidden = true)))
    })
    @GetMapping("/{studyRoomTitle}")
    @Operation(summary = "스터디룸 검색")
    public ResponseEntity<StudyRoomInfoResponse> findByRoomId(@PathVariable("studyRoomTitle") String studyRoomTitle) {
        StudyRoomInfoResponse studyRoomInfoResponse = studyRoomService.findByStudyRoomTitle(studyRoomTitle);
        return ResponseEntity.ok().body(studyRoomInfoResponse);
    }

    //방 삭제
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Success"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
    })
    @DeleteMapping("/{studyRoomId}")
    @Operation(summary = "스터디룸 삭제")
    public ResponseEntity<Void> deleteRoom(@PathVariable("studyRoomId") @RequestBody Long memberId) {
        studyRoomService.deleteStudyRoom(memberId);
        return ResponseEntity.ok().build();
    }

    //방 수정
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Success"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
    })
    @PutMapping("/{studyRoomId}")
    @Operation(summary = "스터디룸 수정")
    public ResponseEntity<Void> updateRoom(
                                           @PathVariable("studyRoomId") Long studyRoomId,
                                           @RequestBody @Valid StudyRoomUpdateRequest studyRoomUpdateRequest) {
        studyRoomService.updateStudyRoom(studyRoomId, studyRoomUpdateRequest);
        return ResponseEntity.ok().build();
    }


    //화상방 리스트 전체 조회
    //페이징 처리 전  -----------------------------------------
    @GetMapping
    @Operation(summary = "스터디룸 전체 조회")
    public ResponseEntity<List<StudyRoomListResponse>> findBySearchRequest(){
        List<StudyRoomListResponse> body = studyRoomService.findBySearchRequest();
        return ResponseEntity.ok().body(body);
    }

    // 방 비밀번호 확인
    @PostMapping("/pwCheck")
    @Operation(summary = "스터디방 비밀번호 체크")
    public ResponseEntity<Void> findById(@RequestBody @Valid StudyRoomConnectRequest studyRoomConnectRequest) {
        studyRoomService.findById(studyRoomConnectRequest);
        return ResponseEntity.ok().build();
    }
}
