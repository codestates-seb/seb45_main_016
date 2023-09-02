package com.codestates.server.global.security.dto;

import lombok.Getter;

/**
 * 로그인 인증 정보 역직렬화를 위한 LoginDto 클래스 생성
 * 클라이언트가 전송한 username(email)과 password를 Security Filter에서 사용할 수 있도록 역직렬화
 */
@Getter
public class LoginDto {

    private String email;

    private String password;

}
