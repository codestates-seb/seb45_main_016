package com.codestates.server.global.security.oauth2.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class KakaoAccountDto {

    // 사용자 프로필 닉네임
    private String profileNickname;

    private String profileImage;

    private String accountEmail;

}
