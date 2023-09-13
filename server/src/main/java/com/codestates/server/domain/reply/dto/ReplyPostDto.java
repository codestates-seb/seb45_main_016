package com.codestates.server.domain.reply.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;

@Getter
@Setter
public class ReplyPostDto {
    @Positive
    private Long userId;

    @NotBlank(message = "댓글을 작성해주세요.")
    private String content;
}
