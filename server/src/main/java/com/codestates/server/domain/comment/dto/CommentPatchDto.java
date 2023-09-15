package com.codestates.server.domain.comment.dto;

import com.codestates.server.domain.answer.entity.Answer;
import com.codestates.server.domain.member.entity.Member;
import lombok.Getter;
import lombok.Setter;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;

@Getter
@Setter
public class CommentPatchDto {

    private Member member;
    private Answer answer;

    @Positive
    private Long memberId;

    @NotBlank(message = "답글을 수정해주세요.")
    private String content;
}
