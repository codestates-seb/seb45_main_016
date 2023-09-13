package com.codestates.server.domain.reply.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReplyResponseDto {
    private Long replyId;

    private Long userId;

    private String content;
}
