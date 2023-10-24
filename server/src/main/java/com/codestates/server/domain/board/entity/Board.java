package com.codestates.server.domain.board.entity;


import javax.persistence.*;

import com.codestates.server.domain.answer.entity.Answer;
import com.codestates.server.domain.member.entity.Member;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

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

	@ManyToOne
	@JoinColumn(name = "memberId")
	@JsonIgnore
	private Member member;

	@Column
	private LocalDateTime modifiedAt = LocalDateTime.now();

	@OneToMany(mappedBy = "board", cascade = CascadeType.ALL, orphanRemoval = true)
	@JsonIgnore
	private List<Answer> answers;

}
