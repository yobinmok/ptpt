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
    private String oauthId;
    private String oauthEmail;
    private Timestamp registerTime;
    private int isWithdraw;
    private Timestamp withdrawTime;

    private Long profileId;

    @OneToOne(mappedBy = "member")
    private Role role;

    @OneToMany(mappedBy = "member")
    private List<Comment> comments;

    public Member(String oauthId) {
        this.oauthId = oauthId;
    }
}
