package com.codestates.server.domain.board.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class BoardPostDto {

	@NotBlank
	@Positive
	private Long memberId;

	@NotBlank
	private String title;

	@NotBlank
	private String content;

	private int views;

}
