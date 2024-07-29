package com.ssafy.ptpt.db.repository;

import com.ssafy.ptpt.db.entity.Statistic;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StatisticRepository extends JpaRepository<Statistic, Integer> {
}