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

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "profile_id")
    private Profile profile;

    private int memberReportCount;

    @OneToOne(mappedBy = "member", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Role role;

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<Evaluation> evaluation;

    public Member(String oauthId) {
        this.oauthId = oauthId;
    }

    public Member(String nickname, String memberPicture, String oauthProvider, String oauthId, String oauthEmail, Timestamp registerTime, int isWithdraw, Timestamp withdrawTime, Profile profile, Role role, List<Evaluation> evaluation) {
        this.nickname = nickname;
        this.memberPicture = memberPicture;
        this.oauthProvider = oauthProvider;
        this.oauthId = oauthId;
        this.oauthEmail = oauthEmail;
        this.registerTime = registerTime;
        this.isWithdraw = isWithdraw;
        this.withdrawTime = withdrawTime;
        this.profile = profile;
        this.role = role;
        this.evaluation = evaluation;
    }

    // 탈퇴여부가 1이면 정지회원
    // 0이면 일반 회원
    // 사용자 탈퇴여부 변경 로직
    public void memberReport() {
        this.isWithdraw = (this.isWithdraw + 1)%2;
        this.memberReportCount = 0;
    }

    public void memberReportCount(int memberReportCount) {
        this.memberReportCount = ++memberReportCount;
    }
}
