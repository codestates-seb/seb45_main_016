package com.codestates.server.domain.answer.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AnswerPatchDto {

	private Long answerId;

	@Positive
	private Long memberId;

	@NotBlank(message = "댓글 내용을 적어주세요.")
	private String content;
}
