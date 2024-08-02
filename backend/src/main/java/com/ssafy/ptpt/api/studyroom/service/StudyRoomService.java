package com.ssafy.ptpt.api.studyroom.service;

import com.ssafy.ptpt.api.studyroom.request.StudyRoomConnectRequest;
import com.ssafy.ptpt.api.studyroom.request.StudyRoomCreateRequest;
import com.ssafy.ptpt.api.studyroom.request.StudyRoomUpdateRequest;
import com.ssafy.ptpt.api.studyroom.response.StudyRoomInfoResponse;
import com.ssafy.ptpt.api.studyroom.response.StudyRoomListResponse;
import com.ssafy.ptpt.db.jpa.entity.StudyRoom;
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

import static com.ssafy.ptpt.exception.NotFoundException.MEMBER_NOT_FOUND;


@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class StudyRoomService {
    private final StudyRoomRepository studyRoomRepository;
    private final MemberRepository memberRepository;

    private final BCryptPasswordEncoder passwordEncoder;

    //방 상세 조회
    public StudyRoomInfoResponse findByStudyRoomTitle(String studyRoomTitle) {
        //제목을 통해 정보를 조회해온다
        StudyRoom studyRoom = studyRoomRepository.findByStudyRoomTitle(studyRoomTitle)
                .orElseThrow(() -> new NotFoundException(NotFoundException.STUDY_ROOM_NOT_FOUND));
        return StudyRoomInfoResponse.from(studyRoom);
    }

    //방 상세 조회
    public StudyRoomInfoResponse findByStudyRoomId(Long studyRoomId) {
        // 아이디를 통해 정보를 조회해온다
        StudyRoom studyRoom = studyRoomRepository.findById(studyRoomId)
                .orElseThrow(() -> new NotFoundException(NotFoundException.STUDY_ROOM_NOT_FOUND));
        return StudyRoomInfoResponse.from(studyRoom);
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
        memberRepository.findByOauthId(studyRoomCreateRequest.getOauthId());

        List<String> entryList = new ArrayList<>();
        entryList.add(studyRoomCreateRequest.getOauthId());

        // 공개 여부에 따른 코드 추가 필요
        StudyRoom studyRoom = new StudyRoom(studyRoomCreateRequest.getStudyRoomTitle()
                                    , studyRoomCreateRequest.getIsPublic()
                                    , studyRoomCreateRequest.getStudyRoomPw()
                                    , studyRoomCreateRequest.getPresentationTime()
                                    , studyRoomCreateRequest.getSubject()
                                    , studyRoomCreateRequest.getDescription()
                                    , studyRoomCreateRequest.getAnonymity()
                                    , studyRoomCreateRequest.getOauthId()
                                    , entryList
                                    , "스터디룸 코드값 추가 예정"
                                    , studyRoomCreateRequest.getOauthId());

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
    public void findById(StudyRoomConnectRequest studyRoomConnectRequest) {
        StudyRoom findStudyRoom = studyRoomRepository.findById(studyRoomConnectRequest.getStudyRoomId())
                .orElseThrow(() -> new NotFoundException(NotFoundException.STUDY_ROOM_NOT_FOUND));

        if (!passwordEncoder.matches(studyRoomConnectRequest.getStudyRoomPw(), findStudyRoom.getStudyRoomPw())) {
            throw new NotMatchException(NotMatchException.PW_NOT_MATCH);
        }
    }
}
