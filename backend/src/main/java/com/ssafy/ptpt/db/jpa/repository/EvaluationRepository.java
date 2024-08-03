package com.ssafy.ptpt.db.jpa.repository;

import com.ssafy.ptpt.db.jpa.entity.Evaluation;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface EvaluationRepository extends JpaRepository<Evaluation, Long> {
    @Query("SELECT e FROM Evaluation e WHERE e.studyRoom.studyRoomId = :studyRoomId")
    List<Evaluation> findByStudyRoomId(@Param("studyRoomId") Long studyRoomId);

    @Query("SELECT e FROM Evaluation e WHERE e.studyRoom.studyRoomId = :studyRoomId AND e.studyRoom.oauthId = :oauthId")
    List<Evaluation> findByStudyRoomIdAndOauthId(@Param("studyRoomId") Long studyRoomId, @Param("oauthId") String oauthId);



}