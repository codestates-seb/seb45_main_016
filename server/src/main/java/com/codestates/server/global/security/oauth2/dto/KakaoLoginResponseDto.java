package com.codestates.server.global.security.oauth2.dto;


import com.codestates.server.domain.member.entity.Member;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class KakaoLoginResponseDto {

    public boolean loginSuccess;

    public Member member;

}
