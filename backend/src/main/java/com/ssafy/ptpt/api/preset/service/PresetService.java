package com.ssafy.ptpt.api.preset.service;

import com.ssafy.ptpt.api.preset.request.PresetCreateRequest;
import com.ssafy.ptpt.api.preset.request.PresetSearchRequest;
import com.ssafy.ptpt.api.preset.response.PresetInfoResponse;
import com.ssafy.ptpt.db.jpa.entity.Member;
import com.ssafy.ptpt.db.jpa.repository.MemberRepository;
import com.ssafy.ptpt.db.mongo.entity.Preset;
import com.ssafy.ptpt.db.mongo.repositoy.PresetRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class PresetService {

    private final MemberRepository memberRepository;
    private final PresetRepository presetRepository;

    public void savePreset(PresetCreateRequest presetCreateRequest) {
        Member member = memberRepository.findByOauthId(presetCreateRequest.getOauthId());
        Preset preset = new Preset(member.getMemberId(),
                                presetCreateRequest.getPresetType(),
                                presetCreateRequest.getPresetData());
        presetRepository.save(preset);
    }

    public List<PresetInfoResponse> viewPresetList(PresetSearchRequest presetSearchRequest) {
        Member member = memberRepository.findByOauthId(presetSearchRequest.getOauthId());
        List<Preset> presetList = presetRepository.findByMemberId(member.getMemberId());

        return presetList.stream()
                .map(PresetInfoResponse::fromPreset)
                .collect(Collectors.toList());
    }

    public PresetInfoResponse viewPreset(Long presetId) {
        Preset preset = presetRepository.findByPresetId(presetId);
        return PresetInfoResponse.fromPreset(preset);
    }

    public int deletePreset(Long presetId) {
        return presetRepository.deleteByPresetId(presetId);
    }
}
