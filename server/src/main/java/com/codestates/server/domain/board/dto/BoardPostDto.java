package com.codestates.server.domain.board.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;

import lombok.Getter;

@Getter
public class BoardPostDto {

	@NotBlank
	@Positive
	private Long memberId;

	@NotBlank
	private String title;

	@NotBlank
	private String content;

	@NotBlank
	private int views;

	// ✨(솔이님 첨삭) post 할 때는 userId로 검증해서 nickname, email 필요 없을 것 같아요

	// @NotBlank
	// private String memberNickname;
	//
	// @NotBlank
	// private String memberEmail;

	private String videoLink;

	private String bookLink;

}
