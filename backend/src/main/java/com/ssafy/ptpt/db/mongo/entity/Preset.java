package com.ssafy.ptpt.db.mongo.entity;

import jakarta.persistence.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.Map;

@Document(collation = "preset")
public class Preset {

    @Id
    private String presetId;

    @Field
    private String presetName;

    @Field(name = "json_data")
    private Map<String, String> jsonData;
}