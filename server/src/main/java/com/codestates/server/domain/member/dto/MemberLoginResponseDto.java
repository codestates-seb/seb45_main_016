package com.codestates.server.domain.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

/**
 * 로그인 후 상단에 뜨는 요소들
 * 프로필 이미지 + 닉네임
 */
@Getter
@Setter
@AllArgsConstructor
public class MemberLoginResponseDto {

    private final String nickname;

    private final String image;

}
