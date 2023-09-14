
package com.codestates.server.domain.answer.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;

import jdk.jfr.MemoryAddress;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AnswerPostDto {

	private Long boardId;

	@Positive
	private Long memberId;

	@NotBlank(message = "댓글 내용을 적어주세요.")
	private String content;

}

