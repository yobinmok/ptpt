package com.ssafy.ptpt.db.repository;

import com.ssafy.ptpt.db.entity.VoiceModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface VoiceModelRepository extends JpaRepository<VoiceModel, Long> {
}