//package com.codestates.server.global.security.oauth2.v5;
//
//import lombok.AccessLevel;
//import lombok.Builder;
//import lombok.Getter;
//import lombok.extern.slf4j.Slf4j;
//
//import java.util.Map;
//
//@Slf4j
//@Getter
//@Builder(access = AccessLevel.PRIVATE)
//public class OAuth2Attribute {
//
//    private Map<String, Object> attributes;
//    private String attributeKey;
//    private String email;
//    private String nickname;
//    private String profileImage;
//    private String provider;
//
//    public static OAuth2Attribute of(String provider, String attributeKey, Map<String, Object> attributes) {
//        if("kakao".equals(provider)) {
//            return ofKakao("id", attributes);
//        }
//        return null;
//    }
//
//    private static OAuth2Attribute ofKakao(String attributeKey, Map<String, Object> attributes) {
//
//        Map<String, Object> kakaoAccount = (Map<String, Object>) attributes.get("kakao_account");
//        Map<String, Object> kakapProfile = (Map<String, Object>) kakaoAccount.get("profile");
//
//        return OAuth2Attribute.builder()
//                .nickname((String) kakapProfile.get("nickname"))
//                .email((String) kakaoAccount.get("email"))
//                .profileImage((String) kakapProfile.get("profile_image_url"))
//                .attributes(attributes)
//                .attributeKey(attributeKey)
//                .provider("kakao")
//                .build();
//
//    }
//
//}
