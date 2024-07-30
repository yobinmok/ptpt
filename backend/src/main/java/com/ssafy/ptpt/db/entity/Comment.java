package com.ssafy.ptpt.db.entity;

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
@EntityScan
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
