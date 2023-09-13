package com.codestates.server.domain.reply.dto;

import lombok.Getter;
import lombok.Setter;
import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class ReplyPatchDto {
    @NotBlank(message = "댓글을 수정해주세요.")
    private String content;
}
