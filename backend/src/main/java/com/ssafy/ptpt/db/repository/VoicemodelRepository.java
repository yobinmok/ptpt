package com.ssafy.ptpt.db.repository;

import com.ssafy.ptpt.db.entity.Voicemodel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VoicemodelRepository extends JpaRepository<Voicemodel, Integer> {
}