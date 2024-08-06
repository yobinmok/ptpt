package com.ssafy.ptpt.db.jpa.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.boot.autoconfigure.domain.EntityScan;


@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class VoiceModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "voice_model_id")
    private Long voiceModelId;

    private String voiceModelPath;

    @OneToOne(mappedBy = "voiceModel",cascade = CascadeType.ALL)
    private Profile profile;
}
