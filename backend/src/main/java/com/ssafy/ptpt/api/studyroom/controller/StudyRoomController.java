package com.ssafy.ptpt.api.studyroom.controller;

import com.ssafy.ptpt.api.studyroom.request.StudyRoomConnectRequest;
import com.ssafy.ptpt.api.studyroom.request.StudyRoomCreateRequest;
import com.ssafy.ptpt.api.studyroom.request.StudyRoomUpdateRequest;
import com.ssafy.ptpt.api.studyroom.response.StudyRoomInfoResponse;
import com.ssafy.ptpt.api.studyroom.response.StudyRoomListResponse;
import com.ssafy.ptpt.api.studyroom.service.StudyRoomService;
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
    public ResponseEntity<Long> createRoom(@RequestBody @Valid StudyRoomCreateRequest studyRoomCreateRequest) {
        Long studyRoomId = studyRoomService.createStudyRoom(studyRoomCreateRequest);
        return ResponseEntity.ok().body(studyRoomId);
    }

    //스터디룸 검색
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Success"),
            @ApiResponse(responseCode = "404", description = "Not Found", content = @Content(schema = @Schema(hidden = true)))
    })
    @GetMapping("/{studyRoomTitle}")
    @Operation(summary = "스터디룸 검색", description = "대기실 화면에서 스터디룸을 검색 할수 있습니다.")
    public ResponseEntity<StudyRoomInfoResponse> findByRoomTitle(@PathVariable("studyRoomTitle") String studyRoomTitle) {
        StudyRoomInfoResponse studyRoomInfoResponse = studyRoomService.findByStudyRoomTitle(studyRoomTitle);
        return ResponseEntity.ok().body(studyRoomInfoResponse);
    }

    //스터디룸 조회
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Success"),
            @ApiResponse(responseCode = "404", description = "Not Found", content = @Content(schema = @Schema(hidden = true)))
    })
    @GetMapping("/{oauthId}")
    @Operation(summary = "스터디룸 조회", description = "프로필에서 사용자의 스터디룸을 확인할수 있습니다.")
    public ResponseEntity<List<StudyRoomInfoResponse>> findByOauthId(@PathVariable("oauthId") String oauthId) {
        List<StudyRoomInfoResponse> studyRoomInfoResponse = studyRoomService.findByOauthId(oauthId);
        return ResponseEntity.ok().body(studyRoomInfoResponse);
    }

    //스터디룸 삭제
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

    //스터디룸 수정
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Success"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
    })
    @PutMapping("/{studyRoomId}")
    @Operation(summary = "스터디룸 수정", description = "방 내부에서 스터리룸 관련 설정을 수정할수 있습니다.")
    public ResponseEntity<Void> updateRoom(
                                           @PathVariable("studyRoomId") Long studyRoomId,
                                           @RequestBody @Valid StudyRoomUpdateRequest studyRoomUpdateRequest) {
        studyRoomService.updateStudyRoom(studyRoomId, studyRoomUpdateRequest);
        return ResponseEntity.ok().build();
    }


    //스터디룸 리스트 전체 조회
    //페이징 처리 전  -----------------------------------------
    @GetMapping
    @Operation(summary = "스터디룸 전체 조회", description = "대기실 화면에 있는 스터디룸의 리스트를 확인할수 있습니다.")
    public ResponseEntity<List<StudyRoomListResponse>> findBySearchRequest(){
        List<StudyRoomListResponse> body = studyRoomService.findBySearchRequest();
        return ResponseEntity.ok().body(body);
    }

    // 스터디룸 비밀번호 확인
    // TODO : 성공시 200 실패시 ?? 반환할수 있도록 수정예정
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Success"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
    })
    @PostMapping("/pwCheck")
    @Operation(summary = "스터디룸 비밀번호 체크", description = "스터디룸의 비밀번호 체크")
    public ResponseEntity<Void> findById(@RequestBody @Valid StudyRoomConnectRequest studyRoomConnectRequest) {
        studyRoomService.studyRoomPwCheck(studyRoomConnectRequest);
        return ResponseEntity.ok().build();
    }

    // 스터디룸 발표자 지정
    // 호스트가 권한을 줌

    // 동작
    // 호스트의 식별값(oauthId)과 참가중인 사용자의 식별값을 입력받아서
    // 호스트의 스터디룸 목록 중 종료 여부를 확인하여 진행종인 스터디 룸 중에서 (라이브는 1개니까)
    // 검색된 스터디룸의 발표자를 참가중인 사용자의 식별값으로 변경
    // 변경 뒤 발표자의 id 값을 반환해서 프론트에 넘겨주자
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Success"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
    })
    @PostMapping("/assignation")
    @Operation(summary = "발표자 지정", description = "호스트가 참가한 사용자에 대해 발표권한을 부여합니다.")
    public ResponseEntity<Long> presentatorAssignation(@RequestBody @Valid StudyRoomConnectRequest studyRoomConnectRequest) {
        return ResponseEntity.ok().body(1L);
    }



    // 스터디 룸 입장 관리
    // 발표 시작 전 참가자의 현황을 관리하지 않고, 시작이 된다면 entryList 테이블에 스터디룸 번호와 함께 참가자 목록 저장
    // 현재 스터디 룸에 들어와 있는 사용자의 session 값을 얻어와서 사용자 식별 후 참가자 테이블에 업데이트
    // 난이도 높겠는데

    // 스터디 룸 퇴장 관리
    // 나가기 버튼을 누른 사용자에 대해 참가자 테이블 업데이트

}
