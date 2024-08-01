package com.ssafy.ptpt.db.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.boot.autoconfigure.domain.EntityScan;

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
    private int oauthId;
    private String oauthEmail;
    private Timestamp registerTime;
    private boolean isWithdraw;
    private Timestamp withdrawTime;

    @OneToOne(mappedBy = "member")
    private Profile profile;

    @OneToOne(mappedBy = "member")
    private Statistic statistic;

    @OneToOne(mappedBy = "member")
    private Role role;

    @OneToMany(mappedBy = "member")
    private List<Comment> comments;

    @OneToMany(mappedBy = "member")
    private List<Evaluation> evaluation;

    @ManyToOne
    @JoinColumn(name = "studyroom_id")
    private StudyRoom studyRoom;
}
