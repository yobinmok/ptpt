package com.ssafy.ptpt.db.jpa.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long memberId;

    private String nickname;
    private String memberPicture;
    private String oauthProvider;

    @Column(nullable = false, unique = true)
    private String oauthId;
    private String oauthEmail;
    private Timestamp registerTime;
    private int isWithdraw;
    private Timestamp withdrawTime;

    private Long profileId;

    @OneToOne(mappedBy = "member", cascade = CascadeType.ALL)
    private Role role;

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<Evaluation> evaluation;

    public Member(String oauthId) {
        this.oauthId = oauthId;
    }

    public Member(String nickname, String memberPicture, String oauthProvider, String oauthId, String oauthEmail, Timestamp registerTime, int isWithdraw, Timestamp withdrawTime, Long profileId, Role role, List<Evaluation> evaluation) {
        this.nickname = nickname;
        this.memberPicture = memberPicture;
        this.oauthProvider = oauthProvider;
        this.oauthId = oauthId;
        this.oauthEmail = oauthEmail;
        this.registerTime = registerTime;
        this.isWithdraw = isWithdraw;
        this.withdrawTime = withdrawTime;
        this.profileId = profileId;
        this.role = role;
        this.evaluation = evaluation;
    }
}
