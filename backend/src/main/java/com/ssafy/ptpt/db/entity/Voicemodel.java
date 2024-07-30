package com.ssafy.ptpt.db.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
@EntityScan
public class Voicemodel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int voicemodelNo;

    private String voicemodelPath;
}
