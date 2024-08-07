package com.ssafy.ptpt.db.mongo.repositoy;

import com.ssafy.ptpt.db.mongo.entity.Preset;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Map;

public interface PresetRepository extends MongoRepository<Preset, String> {
    List<Preset> findByMemberId(Long memberId);
    Preset findByPresetId(Long presetId);
    int deleteByPresetId(Long presetId);

}