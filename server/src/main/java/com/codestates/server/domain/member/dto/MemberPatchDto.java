package com.codestates.server.domain.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

/**
 * 프로필 수정 쿨래스
 * 프로필에서 Member의 닉네임, 패스워드, 이미지를 변경
 */
@Getter
@Setter
@AllArgsConstructor
public class MemberPatchDto {

    private Long memberId;

    private String name;

    private String password;

    private String phone;

    private String profileImage;

}
