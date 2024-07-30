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
@EntityScan
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int memberNo;

    private String nickname;
    private String memberPicture;
    private String oauthProvider;
    private int oauthNo;
    private String oauthEmail;
    private Timestamp registerTime;
    private boolean isWithdraw;
    private Timestamp withdrawTime;

    @OneToMany(mappedBy = "member")
    private List<Profile> profiles;

    @OneToMany(mappedBy = "member")
    private List<Role> roles;

    @OneToMany(mappedBy = "member")
    private List<Comment> comments;
}
