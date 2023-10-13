package com.codestates.server.domain.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

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

    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[$@$!%*#?&])[A-Za-z\\d$@$!%*#?&]{8,20}$",
            message = "비밀번호는 8자리 이상 숫자, 문자, 특수문자 조합으로 입력해야 합니다.")
    private String password;

    @Pattern(regexp = "^010\\d{4}\\d{4}$",
            message = "휴대폰 번호는 010으로 시작하는 11자리 숫자로 구성되어야 합니다.")
    private String phone;
}
