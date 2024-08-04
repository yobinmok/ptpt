package com.ssafy.ptpt.db.jpa.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;


@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Profile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "profile_id")
    private Long profileId;

    private String oauthId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "voice_model_id")
    private VoiceModel voiceModel;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "statistic_id")
    private Statistic statistic;

    @OneToOne(mappedBy = "profile")
    private Member member;

    private Long presetId;

    public Profile(Long profileId, String oauthId) {
        this.profileId = profileId;
        this.oauthId = oauthId;
    }

    public Profile(String oauthId) {
        this.oauthId = oauthId;
    }
}
