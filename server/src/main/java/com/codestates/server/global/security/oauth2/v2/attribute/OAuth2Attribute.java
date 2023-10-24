//package com.codestates.server.global.security.oauth2.attribute;
//
//import lombok.Builder;
//import lombok.Getter;
//import lombok.RequiredArgsConstructor;
//import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
//import org.springframework.security.oauth2.core.user.OAuth2User;
//
//import javax.persistence.Column;
//import javax.persistence.Id;
//import java.util.Map;
//
///**
// * OAuth2 인증으로 사용자 정보 담는 OAuth2Attribute 클래스
// */
//
//@Getter
//@RequiredArgsConstructor
//public class OAuth2Attribute {
//
//    @Id
//    @Column
//    private Long oauthId;
//    private Map<String, Object> attributes;
//    private String attributeKey;
//    private String provider;
//    private String email;
//    private String nickname;
//    private String profileImage;
//
//    @Builder
//    public OAuth2Attribute(Long oauthId,
//                           Map<String, Object> attributes,
//                           String attributeKey,
//                           String provider,
//                           String email,
//                           String nickname,
//                           String profileImage) {
//        this.oauthId = oauthId;
//        this.attributes = attributes;
//        this.attributeKey = attributeKey;
//        this.provider = provider;
//        this.email = email;
//        this.nickname = nickname;
//        this.profileImage = profileImage;
//
//    }
//
//    /**
//     * OAuth2UserRequest 와 OAuth2User 사용해서 OAuth2Attribute 생성
//     *
//     * @param request
//     * @param user
//     * @return
//     */
//    public static OAuth2Attribute of(OAuth2UserRequest request, OAuth2User user) {
//        String registrationId = request.getClientRegistration().getRegistrationId();
//        String attributeName = request.getClientRegistration().getProviderDetails().getUserInfoEndpoint().getUserNameAttributeName();
//
//        OAuth2Attribute oAuth2Attribute = null;
//        if(registrationId.equals("kakao")) {
//            // 카카오 로그인인 경우 메서드 호출
//            oAuth2Attribute = ofKakao(user, registrationId, attributeName);
//        }
//
//        return oAuth2Attribute;
//    }
//
//    /**
//     * 카카오 로드인일 때 OAuth2User에서 필요한 정보 추출해서 OAuth2Attribute 생성
//     *
//     * @param user
//     * @param provider
//     * @param attributeKey
//     * @return
//     */
//    private static OAuth2Attribute ofKakao(OAuth2User user, String provider, String attributeKey) {
//
//        Map<String, Object> attributes = user.getAttributes();
//        Map<String, Object> kakaoAccount = (Map<String, Object>) attributes.get("kakao_account");
//        Map<String, Object> profile = (Map<String, Object>) kakaoAccount.get("profile");
//
//        String email = (String) kakaoAccount.get("email");
//        String nickname = (String) profile.get("nickname");
//        String profileImage = (String) profile.get("profile_image_url");
//
//        return OAuth2Attribute.builder()
//                .oauthId(user.getAttribute(attributeKey))
//                .attributeKey(attributeKey)
//                .provider(provider)
//                .email(email)
//                .nickname(nickname)
//                .profileImage(profileImage)
//                .build();
//    }
//}
