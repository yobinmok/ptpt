package com.ssafy.ptpt.db.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
@Document(collection = "preset")
public class Preset {

    @Id
    private String id;
    private int presetId;
    private String presetName;
    private int presetType;
    private Map<String, String> presetConfig;
    private Map<String, String> scriptData;

    public Preset(int presetId, String presetName, int presetType, Map<String, String> presetConfig, Map<String, String> scriptData) {
        this.presetId = presetId;
        this.presetName = presetName;
        this.presetType = presetType;
        this.presetConfig = presetConfig;
        this.scriptData = scriptData;
    }
}
