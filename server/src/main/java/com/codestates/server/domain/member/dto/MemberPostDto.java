package com.codestates.server.domain.member.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Getter
@Setter
public class MemberPostDto {

    @NotBlank(message = "이름은 필수값입니다.")
    private String nickname;

    @NotBlank(message = "이메일은 필수값입니다.")
    @Email(message = "이메일 형식으로 작성해주세요. email@example.com")
    private String email;

    @Pattern(regexp = "^010\\d{4}\\d{4}$",
            message = "휴대폰 번호는 010으로 시작하는 11자리 숫자로 구성되어야 합니다.")
    private String phone;

    @NotBlank(message = "비밀번호는 필수값입니다.")
    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[$@$!%*#?&])[A-Za-z\\d$@$!%*#?&]{8,20}$",
            message = "비밀번호는 8자리 이상 숫자, 문자, 특수문자 조합으로 입력해야 합니다.")
    private String password;

}
