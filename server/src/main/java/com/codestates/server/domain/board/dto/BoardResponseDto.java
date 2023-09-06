package com.codestates.server.domain.board.dto;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BoardResponseDto {

	private Long boardId;

	private String title;

	private String content;

	private Long views;

	private String videoLink;

	private String bookLink;

	private String memberNickname;

	private String memberEmail;

	private String memberImage; // ✨(솔이님 첨삭) repsonse에 memberImage 추가했습니다

	private LocalDateTime modifiedAt;

	//댓글, 대댓글 ResponseDto 구성해야함.
}
