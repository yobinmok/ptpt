package com.ssafy.ptpt.api.studyroom.controller;

//import io.swagger.annotations.ApiOperation;
import com.ssafy.ptpt.api.security.service.StudyRoomService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/studyroom")
@RequiredArgsConstructor
public class StudyRoomController {

    private final StudyRoomService studyRoomService;

    @PostMapping()
    @Operation(summary = "스터디룸 등록")
    public ResponseEntity<?> createStudyroom(){
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/{studyroomNo}")
    @Operation(summary = "스터디룸 조회")
    public ResponseEntity<?> viewStudyroom(){
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{studyroomNo}")
    @Operation(summary = "스터디룸 삭제")
    public ResponseEntity<?> deleteStudyroom(){
        return new ResponseEntity<>(HttpStatus.OK);
    }

//    //화상방 상세조회
//    @GetMapping("/{room_id}")
//    public ResponseEntity<RoomInfoResponse> findByRoomId(@PathVariable("room_id") Long roomId) {
//        RoomInfoResponse body = roomService.findByRoomId(roomId);
//        return ResponseEntity.ok().body(body);
//    }
//
//    // localhost:8080/members?page=0&size=3&sort=createdDate,asc
//    //화상방 리스트 전체 조회
//    //페이징
//    @GetMapping
//    public ResponseEntity<Page<RoomListResponse>> findBySearchRequest(@LoginUser User user,
//                                                                      @Valid RoomSearchRequest request,
//                                                                      @PageableDefault(size = 9) Pageable pageable) {
//        Page<RoomListResponse> body = roomService.findBySearchRequest(user, request, pageable);
//        return ResponseEntity.ok().body(body);
//    }
//
//    // 내 나이대로 설정된 방 최대 8개
//    @GetMapping("/recommend/ages")
//    public ResponseEntity<List<RoomListResponse>> findRoomBySameAges(@LoginUser User user) {
//        List<RoomListResponse> body = roomService.findBySameAges(user);
//        return ResponseEntity.ok().body(body);
//    }
//
//    // 관심사가 [내 관심사 중 소주제로 제일 많이 고른 대주제, 개수 똑같은거 있으면 랜덤 하나]로 설정된 방
//    @GetMapping("/recommend/category")
//    public ResponseEntity<List<RoomListResponse>> findRoomBySameCategory(@LoginUser User user) {
//        List<RoomListResponse> body = roomService.findRoomBySameCategory(user);
//        return ResponseEntity.ok().body(body);
//    }
//
//    // 지난 12시간 이내 생성 방 랜덤 8개
//    @GetMapping("/recommend/current")
//    public ResponseEntity<List<RoomListResponse>> findRoomByCurrentTime() {
//        List<RoomListResponse> body = roomService.findRandomRooms();
//        return ResponseEntity.ok().body(body);
//    }
//
//    //화상방 생성
//    @PostMapping
//    public ResponseEntity<Long> createRoom(@LoginUser User user, @RequestBody @Valid RoomCreateRequest request) {
//        Long roomId = roomService.createRoom(user, request);
//        return ResponseEntity.ok().body(roomId);
//    }
//
//    //화상방 수정
//    @PutMapping("/{room_id}")
//    public ResponseEntity<Void> updateRoom(@LoginUser User user,
//                                           @PathVariable("room_id") Long roomId,
//                                           @RequestBody @Valid RoomUpdateRequest request) {
//        roomService.updateRoom(user, roomId, request);
//        return ResponseEntity.ok().build();
//    }
//
//    //화상방 삭제
//    @DeleteMapping("/{room_id}")
//    public ResponseEntity<Void> deleteRoom(@LoginUser User user, @PathVariable("room_id") Long roomId) {
//        roomService.deleteRoom(user, roomId);
//        return ResponseEntity.ok().build();
//    }
//
//    // 화상방 비밀번호 확인
//    @PostMapping("/pwcheck")
//    public ResponseEntity<Void> findById(@RequestBody @Valid RoomConnectRequest request) {
//        roomService.findById(request);
//        return ResponseEntity.ok().build();
//    }
}
