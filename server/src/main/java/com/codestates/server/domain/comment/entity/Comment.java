package com.codestates.server.domain.comment.entity;

import com.codestates.server.domain.answer.entity.Answer;
import com.codestates.server.domain.member.entity.Member;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;


@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Comment {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @Column
        private String content;

        @ManyToOne
        @JoinColumn(name = "member_Id")
        @JsonIgnore
        private Member member;

        @ManyToOne
        @JoinColumn(name = "answer_id")
        @JsonIgnore
        private Answer answer;

}
