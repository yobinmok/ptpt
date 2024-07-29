package com.ssafy.ptpt.db.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Voicemodel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int voicemodelNo;

    private String voicemodelPath;
}
