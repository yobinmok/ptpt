package com.ssafy.ptpt.db.mongo.repositoy;

import com.ssafy.ptpt.db.mongo.entity.Preset;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PresetRepository extends MongoRepository<Preset, String> {

}