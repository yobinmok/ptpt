package com.ssafy.ptpt.db.repository;

import com.ssafy.ptpt.db.entity.Evaluation;
import com.ssafy.ptpt.db.entity.Statistic;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface StatisticRepository extends JpaRepository<Statistic, Long> {
    @Query("SELECT e FROM Statistic e WHERE e.member.id = :memberId")
    Statistic findByMemberId(@Param("memberId") Long memberId);
}