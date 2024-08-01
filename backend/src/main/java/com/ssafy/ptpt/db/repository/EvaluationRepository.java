package com.ssafy.ptpt.db.repository;

import com.ssafy.ptpt.db.entity.Evaluation;
import io.lettuce.core.dynamic.annotation.Param;
import jakarta.persistence.Entity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface EvaluationRepository extends JpaRepository<Evaluation, Long> {
    @Query("SELECT e FROM Evaluation e WHERE e.studyRoom.memberId = :memberId")
    List<Evaluation> findByMemberId(@Param("memberId") Long memberId);

}