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
    @PostMapping
    @Operation(summary = "스터디룸 등록")
    public ResponseEntity<Long> createRoom(@LoginMember Member member, @RequestBody @Valid StudyRoomCreateRequest studyRoomCreateRequest) {
        Long studyRoomId = studyRoomService.createStudyRoom(member, studyRoomCreateRequest);
        return ResponseEntity.ok().body(studyRoomId);
    }
    //방 조회
    @GetMapping("/{studyRoomId}")
    @Operation(summary = "스터디룸 조회")
    public ResponseEntity<StudyRoomInfoResponse> findByRoomId(@PathVariable("studyRoomId") Long studyRoomId) {
        StudyRoomInfoResponse body = studyRoomService.findByStudyRoomId(studyRoomId);
        return ResponseEntity.ok().body(body);
    }

    //방 삭제
    @DeleteMapping("/{studyRoomId}")
    @Operation(summary = "스터디룸 삭제")
    public ResponseEntity<Void> deleteRoom(@LoginMember Member member, @PathVariable("studyRoomId") Long studyRoomId) {
        studyRoomService.deleteStudyRoom(member, studyRoomId);
        return ResponseEntity.ok().build();
    }

    //방 수정
    @PutMapping("/{studyRoomId}")
    @Operation(summary = "스터디룸 수정")
    public ResponseEntity<Void> updateRoom(@LoginMember Member member,
                                           @PathVariable("studyRoomId") Long studyRoomId,
                                           @RequestBody @Valid StudyRoomUpdateRequest studyRoomUpdateRequest) {
        studyRoomService.updateStudyRoom(member, studyRoomId, studyRoomUpdateRequest);
        return ResponseEntity.ok().build();
    }


    //화상방 리스트 전체 조회
    //페이징 처리 전  -----------------------------------------
    @GetMapping
    public ResponseEntity<List<StudyRoomListResponse>> findBySearchRequest(){
        List<StudyRoomListResponse> body = studyRoomService.findBySearchRequest();
        return ResponseEntity.ok().body(body);
    }

    // 방 비밀번호 확인
    @PostMapping("/pwCheck")
    public ResponseEntity<Void> findById(@RequestBody @Valid StudyRoomConnectRequest studyRoomConnectRequest) {
        studyRoomService.findById(studyRoomConnectRequest);
        return ResponseEntity.ok().build();
    }
}
