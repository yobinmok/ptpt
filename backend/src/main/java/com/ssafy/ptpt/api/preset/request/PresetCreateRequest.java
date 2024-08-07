package com.ssafy.ptpt.api.preset.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;
import java.util.Objects;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PresetCreateRequest {
    private String oauthId;
    private String presetType;
    private Map<String, Object> presetData;
}
