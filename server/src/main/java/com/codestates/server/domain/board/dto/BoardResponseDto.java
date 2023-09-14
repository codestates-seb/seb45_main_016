package com.codestates.server.domain.board.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.codestates.server.domain.answer.entity.Answer;
import com.codestates.server.domain.member.dto.MemberBoardResponseDto;
import com.codestates.server.domain.member.dto.MemberResponseDto;
import com.codestates.server.domain.member.entity.Member;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BoardResponseDto {

	private Long boardId;

	private String title;

	private String content;

	private Long views;

	private LocalDateTime modifiedAt;

	private MemberBoardResponseDto boardCreater;

	private List<Answer> answers;
}
