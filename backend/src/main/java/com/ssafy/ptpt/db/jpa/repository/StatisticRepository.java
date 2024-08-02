package com.ssafy.ptpt.db.jpa.repository;

import com.ssafy.ptpt.db.jpa.entity.Statistic;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface StatisticRepository extends JpaRepository<Statistic, Long> {
    @Query("SELECT e FROM Statistic e WHERE e.statisticId = :memberId")
    Statistic findByMemberId(@Param("memberId") Long memberId);
}