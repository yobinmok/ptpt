package com.ssafy.ptpt.db.repository;

import com.ssafy.ptpt.db.entity.Preset;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PresetRepository extends MongoRepository<Preset, String> {

}