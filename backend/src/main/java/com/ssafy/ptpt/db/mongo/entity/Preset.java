package com.ssafy.ptpt.db.mongo.entity;

import com.mongodb.client.model.CollationStrength;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.annotation.Collation;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.Map;
import java.util.Objects;

@Getter
@Setter
@Document(collection  = "preset")
@ToString
@NoArgsConstructor
public class Preset {

    @Transient
    public static final String SEQUENCE_NAME = "preset_sequence";

    @Id
    private Long presetId;

    // solo or multi
    @Field
    private String presetType;

    @Field(name = "json_data")
    private Map<String, Object> jsonData;

    public Preset(Map<String, Object> jsonData) {
        this.jsonData = jsonData;
    }
}