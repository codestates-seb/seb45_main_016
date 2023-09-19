package com.codestates.server.domain.comment.dto;

import com.codestates.server.domain.answer.entity.Answer;
import com.codestates.server.domain.member.dto.MemberBoardResponseDto;
import com.codestates.server.domain.member.entity.Member;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@AllArgsConstructor
public class CommentAnswerDto {

    private Long commentId;

    private String content;

    private MemberBoardResponseDto commentCreator;

}
