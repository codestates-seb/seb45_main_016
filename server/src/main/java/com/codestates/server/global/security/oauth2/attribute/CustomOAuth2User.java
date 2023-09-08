package com.codestates.server.global.security.oauth2.attribute;

import lombok.AllArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.io.Serializable;
import java.util.Collection;
import java.util.Collections;
import java.util.Map;

@AllArgsConstructor
public class CustomOAuth2User implements OAuth2User, Serializable {

    private Long memberId;  // 고유한 멤버Id
    private Map<String, Object> attributes; // OAuth2 인증 서버로부터 받은 사용자의 속성 정보
    private String attributeKey;    // 사용자의 고유 식별 키

    public static CustomOAuth2User of(Long memberId, OAuth2Attribute oAuth2Attribute) {
        return new CustomOAuth2User(memberId, oAuth2Attribute.getAttributes(), oAuth2Attribute.getAttributeKey());
    }

    // 사용자의 속성 정보를 반환하는 메서드
    @Override
    public Map<String, Object> getAttributes() {

        return this.attributes;
    }

    // 사용자의 권한을 반환하는 메서드 (여기서는 "USER" 권한을 부여)
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singleton(new SimpleGrantedAuthority("USER"));
    }

    // 사용자의 속성키를 반환하는 메서드
    @Override
    public String getName() {
        return String.valueOf(attributes.get(attributeKey));
    }

    // 사용자의 멤버 ID를 반환하는 메서드
    public Long getMemberId() {
        return this.memberId;
    }

    public String getEmail() {
        return String.valueOf(attributes.get("email"));
    }

    public String getNickname() {
        return String.valueOf(attributes.get("nickname"));
    }

    public String getProfileImage() {
        return String.valueOf(attributes.get("profile_image_url"));
    }

}
