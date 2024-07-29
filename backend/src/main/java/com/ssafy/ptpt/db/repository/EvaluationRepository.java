package com.ssafy.ptpt.db.repository;

import com.ssafy.ptpt.db.entity.Evaluation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EvaluationRepository extends JpaRepository<Evaluation, Integer> {
}