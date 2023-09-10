package com.codestates.server.global.security.oauth2.dto;

import lombok.Data;

// ⭐⭐⭐⭐⭐⭐⭐카카오에서 토큰 받아오는 값입니다. 카멜케이스로 변경하지마세요 !!!⭐⭐⭐⭐⭐⭐⭐
@Data
public class KakaoTokenDto {

    private String access_token;
    private String token_type;
    private String refresh_token;
    private String id_token;
    private String expires_in;
    private String scope;
    private String refresh_token_expires_in;

}
