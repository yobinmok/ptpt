package com.ssafy.ptpt.db.jpa.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id")
    private Long commentId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "evaluation_id")
    private Evaluation evaluation;

    private String commentContent;

    private int isAnonymous;

    public Comment(Evaluation evaluation, String commentContent, int isAnonymous) {
        this.evaluation = evaluation;
        this.commentContent = commentContent;
        this.isAnonymous = isAnonymous;
    }
}
