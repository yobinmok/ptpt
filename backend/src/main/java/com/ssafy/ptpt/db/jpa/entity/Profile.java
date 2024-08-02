package com.ssafy.ptpt.db.jpa.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


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

    @OneToOne
    @JoinColumn(name = "voicemodel_id")
    private VoiceModel voiceModel;

    @OneToOne
    @JoinColumn(name = "statisitc_id")
    private Statistic statistic;

    private Long presentationId;
    private Long studyRoomId;

    public Profile(Long profileId, String oauthId) {
        this.profileId = profileId;
        this.oauthId = oauthId;
    }
}
