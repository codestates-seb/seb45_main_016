package com.codestates.server.domain.answer.entity;

import com.codestates.server.domain.board.entity.Board;
import com.codestates.server.domain.member.entity.Member;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@EntityListeners(AuditingEntityListener.class)
public class Answer {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "answerId")
	private Long answerId;

	@Column(name = "answerContent", length = 10000, nullable = false)
	private String content;

	@ManyToOne
	@JoinColumn(name = "boardId")
	private Board board;

	@ManyToOne
	@JoinColumn(name = "memberId")
	private Member member;

	// 대댓글하고 연관관계(매핑) 구성해야함.

}
