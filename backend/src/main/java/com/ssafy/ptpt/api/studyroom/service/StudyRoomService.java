package com.ssafy.ptpt.api.studyroom.service;

import com.ssafy.ptpt.api.studyroom.request.*;
import com.ssafy.ptpt.api.studyroom.response.StudyRoomInfoResponse;
import com.ssafy.ptpt.api.studyroom.response.StudyRoomListResponse;
import com.ssafy.ptpt.db.jpa.entity.EntryList;
import com.ssafy.ptpt.db.jpa.entity.Member;
import com.ssafy.ptpt.db.jpa.entity.StudyRoom;
import com.ssafy.ptpt.db.jpa.repository.EntryListRepository;
import com.ssafy.ptpt.db.jpa.repository.MemberRepository;
import com.ssafy.ptpt.db.jpa.repository.StudyRoomRepository;
import com.ssafy.ptpt.exception.NotFoundException;
import com.ssafy.ptpt.exception.NotMatchException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;


@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class StudyRoomService {
    private final StudyRoomRepository studyRoomRepository;
    private final MemberRepository memberRepository;
    private final EntryListRepository entryListRepository;

    private final BCryptPasswordEncoder passwordEncoder;

    //방 조회
    public StudyRoomInfoResponse findByStudyRoomTitle(String studyRoomTitle) {
        //제목을 통해 정보를 조회해온다
        StudyRoom studyRoom = studyRoomRepository.findByStudyRoomTitle(studyRoomTitle)
                .orElseThrow(() -> new NotFoundException(NotFoundException.STUDY_ROOM_NOT_FOUND));
        return StudyRoomInfoResponse.from(studyRoom);
    }

    // 사용자 방 조회
    public List<StudyRoomInfoResponse> findByMemberId(Long memberId) {
        // 아이디를 통해 정보를 조회해온다
        List<StudyRoom> studyRoom = studyRoomRepository.findByMemberId(memberId);
        return studyRoom.stream()
                .map(StudyRoomInfoResponse::from)
                .collect(Collectors.toList());
    }

    //방 리스트 전체 조회 - 페이징 추가 해야함
//    public Page<StudyRoomListResponse> findBySearchRequest(Member member,
//                                                           StudyRoomSearchRequest request,
//                                                           Pageable pageable) {
//        return findStudyRoomList.map(StudyRoomListResponse::from);
//    }

    // 방 리스트 전체 조회 - 페이징 전
    public List<StudyRoomListResponse> findBySearchRequest() {
        List<StudyRoom> studyRoomList = studyRoomRepository.findAll();

        // 결과를 변환하여 List 반환
        return studyRoomList.stream()
                .map(StudyRoomListResponse::from)
                .collect(Collectors.toList());
    }


    //방 생성
    @Transactional
    public Long createStudyRoom(StudyRoomCreateRequest studyRoomCreateRequest) {
        Member member = memberRepository.findByOauthId(studyRoomCreateRequest.getOauthId());

        // 공개 여부에 따른 코드 추가 필요
        StudyRoom studyRoom = new StudyRoom(studyRoomCreateRequest.getStudyRoomTitle()
                                    , studyRoomCreateRequest.getIsPublic()
                                    , studyRoomCreateRequest.getStudyRoomPw()
                                    , studyRoomCreateRequest.getPresentationTime()
                                    , studyRoomCreateRequest.getSubject()
                                    , studyRoomCreateRequest.getDescription()
                                    , studyRoomCreateRequest.getAnonymity()
                                    , member.getMemberId()
                                    , "스터디룸 코드값 추가 예정"
                                    , member.getMemberId());

        studyRoomRepository.save(studyRoom);

        return studyRoom.getStudyRoomId();
    }

    //방 수정
    @Transactional
    public void updateStudyRoom(Long studyRoomId, StudyRoomUpdateRequest studyRoomUpdateRequest) {
        StudyRoom findStudyRoom = studyRoomRepository.findById(studyRoomId)
                .orElseThrow(() -> new NotFoundException(NotFoundException.STUDY_ROOM_NOT_FOUND));

//        호출을 위한 코드 추가 필요
        findStudyRoom.updateStudyRoom(studyRoomUpdateRequest);
    }

    //방 삭제
    @Transactional
    public void deleteStudyRoom(Long memberId) {
        StudyRoom findStudyRoom = studyRoomRepository.findById(memberId)
                .orElseThrow(() -> new NotFoundException(NotFoundException.STUDY_ROOM_NOT_FOUND));

        studyRoomRepository.deleteById(findStudyRoom.getStudyRoomId());
    }

    // 방 비밀번호 일치여부 확인
    @Transactional
    public void studyRoomPwCheck(StudyRoomConnectRequest studyRoomConnectRequest) {
        StudyRoom findStudyRoom = studyRoomRepository.findById(studyRoomConnectRequest.getStudyRoomId())
                .orElseThrow(() -> new NotFoundException(NotFoundException.STUDY_ROOM_NOT_FOUND));

        if (!studyRoomConnectRequest.getStudyRoomPw().equals(findStudyRoom.getStudyRoomPw())) {
            throw new NotMatchException(NotMatchException.PW_NOT_MATCH);
        }
    }

    //스터디룸 호스트가 발표자 지정
    @Transactional
    public int presentatorAssignation(StudyRoomStatusRequest studyRoomStatusRequest) {
        Member member = memberRepository.findByNickname(studyRoomStatusRequest.getNickname());
        return studyRoomRepository.updatePresentatorAssignation(member.getMemberId(),
                studyRoomStatusRequest.getStudyRoomId());
    }

    // 스터디룸 퇴장
    @Transactional
    public int studyRoomExit(StudyRoomStatusRequest studyRoomStatusRequest) {
        Member member = memberRepository.findByNickname(studyRoomStatusRequest.getNickname());
        StudyRoom studyRoom = studyRoomRepository.findByStudyRoomIdAndMemberId(studyRoomStatusRequest.getStudyRoomId(),
                member.getMemberId());
        return studyRoomRepository.deleteByStudyRoomIdAndOauthId(studyRoomStatusRequest.getStudyRoomId()
                , studyRoom.getMemberId());
    }

    // 스터디룸 입장 참가자 저장
    public void studyRoomEntryRegister(StudyRoomCreateEntryRequest studyRoomCreateEntryRequest) {
        List<String> nicknameList = studyRoomCreateEntryRequest.getNicknameList();
        List<EntryList> entryList = new ArrayList<>();
        for (String nickname : nicknameList) {
            Member member = memberRepository.findByNickname(nickname);
            StudyRoom studyRoom = studyRoomRepository.findByStudyRoomId(studyRoomCreateEntryRequest.getStudyRoomId());
            EntryList entry = new EntryList(studyRoom,
                                                member.getMemberId());
            entryList.add(entry);
        }

        entryListRepository.saveAll(entryList);
    }

    public void clearEntryList(StudyRoomClearRequest studyRoomClearRequest) {
        // 상태 변경 로직
        studyRoomRepository.studyRoomStatusChange(studyRoomClearRequest.getStudyRoomId());

        // 삭제 로직
        entryListRepository.deleteByStudyRoomId(studyRoomClearRequest.getStudyRoomId());
    }
}
