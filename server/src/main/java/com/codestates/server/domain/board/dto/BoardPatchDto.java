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

	@NotBlank(message = "제목을 적어주세요.")
	private String title;

	@NotBlank(message = "내용을 적어주세요.")
	private String content;

}
