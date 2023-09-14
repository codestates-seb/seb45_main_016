package com.codestates.server.domain.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class MemberBoardResponseDto {
    private Long memberId;

    private String email;

    private String name;

    private String profileImage;
}
