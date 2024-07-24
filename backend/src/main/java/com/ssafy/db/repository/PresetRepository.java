package com.ssafy.db.repository;

import com.ssafy.db.entity.Preset;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PresetRepository extends MongoRepository<Preset, String> {

}