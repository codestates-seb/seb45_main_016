package com.codestates.server.global.security.oauth.provider;

public interface OAuth2MemberInfo {

    String getProviderId(); //공급자 아이디 ex) google, facebook
    String getProvider(); //공급자 ex) google, facebook
    String getNickname(); //사용자 이름 ex) 홍길동
    String getEmail(); //사용자 이메일 ex) gildong@gmail.com
    String getProfileImage();

}

