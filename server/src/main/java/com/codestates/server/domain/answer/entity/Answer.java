package com.codestates.server.domain.answer.entity;

import com.codestates.server.domain.board.entity.Board;
import com.codestates.server.domain.comment.entity.Comment;
import com.codestates.server.domain.member.entity.Member;
import javax.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
public class Answer {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long answerId;

	@Column(length = 10000, nullable = false)
	private String content;

	@Column
	private LocalDateTime modifiedAt = LocalDateTime.now();

	@JoinColumn(name = "board_Id")
	@JsonIgnore
	@ManyToOne
	private Board board;

	@JoinColumn(name = "member_Id")
	@JsonIgnore
	@ManyToOne
	private Member member;

	@OneToMany(mappedBy = "answer", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Comment> comments;
}