package com.ssafy.ptpt.db.mongo.entity;

import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.Map;

@Getter
@Setter
@Document(collation = "preset")
public class Preset {

    @Id
    private String presetId;

    @Field
    private String presetName;

    @Field(name = "json_data")
    private Map<String, String> jsonData;

    public Preset(String presetName, Map<String, String> jsonData) {
        this.presetName = presetName;
        this.jsonData = jsonData;
    }
}