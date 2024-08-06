package com.ssafy.ptpt.api.preset.service;

import com.ssafy.ptpt.db.mongo.SequenceGeneratorService;
import com.ssafy.ptpt.db.mongo.entity.Preset;
import com.ssafy.ptpt.db.mongo.repositoy.PresetRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class PresetService {

    private final PresetRepository presetRepository;
    private final SequenceGeneratorService sequenceGeneratorService;


    //  mongoDB 연결 테스트
    public void saveUser() {
        Map<String, String> test = new HashMap<>();
        test.put("이름", "홍길동");
        test.put("나이", "30");
        test.put("이메일", "hong@example.com");
        test.put("주소", "서울시 강남구");
//        Preset preset = new Preset("test1", test);
//
//        presetRepository.insert(preset);
//
//        // 저장 후 ID 값 확인
//        Preset savedPreset = presetRepository.insert(preset);
//        System.out.println("Saved Preset ID: " + savedPreset.getPresetId());

//        Preset preset = new Preset("test1", test);
        Preset preset = new Preset();
        preset.setPresetId(sequenceGeneratorService.generateSequence(Preset.SEQUENCE_NAME));
        preset.setPresetName("java-w3schools@example.com");
        preset.setJsonData(test);
        presetRepository.insert(preset);

    }

    // mongoDB read
    public Preset getUser() {
        List<Preset> all = presetRepository.findAll();
        for (Preset preset : all) {
            System.out.println(preset.toString());
        }

        return null;
    }
}
