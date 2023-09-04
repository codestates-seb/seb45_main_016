package com.codestates.server.global.security.oauth.provider;

import java.util.Map;

public class KakaoMemberInfo implements OAuth2MemberInfo {

    private Map<String, Object> attributes;
    private Map<String, Object> kakaoAccountAttributes;
    private Map<String, Object> profileAttributes;

    public KakaoMemberInfo(Map<String, Object> attributes) {
        this.attributes = attributes;
        this.kakaoAccountAttributes = (Map<String, Object>) attributes.get("kakao_account");
        this.profileAttributes = (Map<String, Object>) kakaoAccountAttributes.get("profile");
    }

    @Override
    public String getProviderId() {
        return attributes.get("id").toString();
    }

    @Override
    public String getProvider() {
        return "kakao";
    }

    @Override
    public String getNickname() {
        return profileAttributes.get("nickname").toString();
    }

    @Override
    public String getEmail() {
        return profileAttributes.get("email").toString();
    }

    @Override
    public String getProfileImage() {
        return profileAttributes.get("profile_image_url").toString();
    }
}
