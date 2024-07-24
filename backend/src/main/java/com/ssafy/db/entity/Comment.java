package com.ssafy.db.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int commentNo;

    @ManyToOne
    @JoinColumn(name = "member_no")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "evaluation_no")
    private Evaluation evaluation;

    private String commentContent;
}
