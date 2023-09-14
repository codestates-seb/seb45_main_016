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

}
