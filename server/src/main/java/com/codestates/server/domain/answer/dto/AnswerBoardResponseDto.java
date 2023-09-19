package com.codestates.server.domain.answer.dto;

import com.codestates.server.domain.comment.dto.CommentAnswerDto;
import com.codestates.server.domain.comment.entity.Comment;
import com.codestates.server.domain.member.dto.MemberBoardResponseDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class AnswerBoardResponseDto {

    private Long answerId;

    private String content;

    private LocalDateTime modifiedAt;

    private MemberBoardResponseDto answerCreator;

    private List<CommentAnswerDto> comments;
}
