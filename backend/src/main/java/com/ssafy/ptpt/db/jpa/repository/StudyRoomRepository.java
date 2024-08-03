package com.ssafy.ptpt.db.jpa.repository;

import com.ssafy.ptpt.api.studyroom.request.StudyRoomAssignationRequest;
import com.ssafy.ptpt.db.jpa.entity.StudyRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface StudyRoomRepository extends JpaRepository<StudyRoom, Long> {

    Optional<StudyRoom> findByStudyRoomTitle(String studyRoomTitle);
    StudyRoom findByStudyRoomId(Long studyRoomId);
    List<StudyRoom> findByOauthId(String oauthId);

    @Modifying
    @Query("UPDATE StudyRoom s SET s.oauthId = :oauthId WHERE s.studyRoomId = :studyRoomId AND s.isCompleted = 1")
    int updatePresentatorAssignation(@Param("studyRoomId") Long studyRoomId, @Param("oauthId") String oauthId);

}
