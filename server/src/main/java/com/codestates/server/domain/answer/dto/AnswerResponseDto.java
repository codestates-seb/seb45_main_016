package com.codestates.server.domain.answer.dto;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AnswerResponseDto {

	private Long memberId;

	private Long answerId;

	private String content;

	private LocalDateTime modifiedAt;
}
