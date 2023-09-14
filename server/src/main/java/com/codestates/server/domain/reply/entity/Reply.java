package com.codestates.server.domain.reply.entity;

import com.codestates.server.domain.answer.entity.Answer;
import com.codestates.server.domain.member.entity.Member;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class Reply {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @Column(name = "Content")
    private String content;

    @ManyToOne
    @JoinColumn(name = "meberid")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "answerid")
    private Answer answer;
}