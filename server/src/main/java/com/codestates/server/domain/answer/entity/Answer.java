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

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

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

	@Column
	private LocalDateTime modifiedAt = LocalDateTime.now();

	@ManyToOne
	@JoinColumn(name = "boardId")
	@JsonIgnore
	private Board board;

	@ManyToOne
	@JoinColumn(name = "memberId")
	@JsonIgnore
	private Member member;



	// 대댓글하고 연관관계(매핑) 구성해야함.

}
