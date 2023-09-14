
package com.codestates.server.domain.answer.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class AnswerPostDto {

	@NotBlank
	@Positive
	private Long memberId;

	@NotBlank(message = "댓글 내용을 적어주세요.")
	private String content;

	public AnswerPostDto(Long memberId, String content) {
		this.memberId = memberId;
		this.content = content;
	}
}

