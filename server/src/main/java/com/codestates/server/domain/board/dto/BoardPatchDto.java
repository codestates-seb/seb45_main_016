package com.codestates.server.domain.board.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BoardPatchDto {

	@Positive
	private Long boardId;

	@NotBlank
	private Long memberId;

	@NotBlank
	private String title;

	@NotBlank
	private String content;

	// ✨(솔이님 첨삭) patch 할 때는 userId로 검증해서 nickname, email 필요 없을 것 같아

	// @NotBlank
	// private String memberNickname;
	//
	// @NotBlank
	// private String memberEmail;

	private String videoLink;

	private String bookLink;
}
