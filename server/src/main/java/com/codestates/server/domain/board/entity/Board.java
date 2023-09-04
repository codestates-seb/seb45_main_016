package com.codestates.server.domain.board.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.codestates.server.domain.member.entity.Member;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Board {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "boardId")
	private Long boardId;

	@Column(name = "boardTitle", nullable = false)
	private String title;

	@Column(name = "boardContent",length = 10000, nullable = false)
	private String content;

	@Column(name = "boardViews")
	private Long views;

	@Column(name = "boardVideoLink")
	private String videoLink;

	@Column(name = "boardBookLink")
	private String bookLink;

	// 댓글 및 대댓글과의 연관관계 구성해야함.


	@ManyToOne
	@JoinColumn(name = "memberId")
	private Member member;
}
