//package com.codestates.server.global.security.oauth2.v5;
//
//import com.codestates.server.domain.member.entity.Member;
//import com.codestates.server.domain.member.repository.MemberRepository;
//import com.codestates.server.global.security.auth.utils.CustomAuthorityUtils;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
//import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
//import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
//import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
//import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
//import org.springframework.security.oauth2.core.user.OAuth2User;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//import java.util.Optional;
//
//@Slf4j
//@Service
//@RequiredArgsConstructor
//public class OAuth2DetailService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {
//
//    private final MemberRepository memberRepository;
//    private final CustomAuthorityUtils authorityUtils;
//
//    @Override
//    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
//        DefaultOAuth2UserService delegate = new DefaultOAuth2UserService();
//
//        OAuth2User oAuth2User = delegate.loadUser(userRequest);
//
//        String provider = userRequest.getClientRegistration().getRegistrationId();
//        String attributeKey = userRequest.getClientRegistration()
//                .getProviderDetails()
//                .getUserInfoEndpoint()
//                .getUserNameAttributeName();
//
//        OAuth2Attribute oAuth2Attribute = OAuth2Attribute
//                .of(provider, attributeKey, oAuth2User.getAttributes());
//
//        String email = oAuth2Attribute.getEmail();
//        String nickname = oAuth2Attribute.getNickname();
//        String profileImage = oAuth2Attribute.getProfileImage();
//        Member OAuth2Member = saveMemberIfNotExist(email, nickname, profileImage, provider);
//        List<GrantedAuthority> roles = authorityUtils.createAuthorities(OAuth2Member.getRoles());
//
//        return new DefaultOAuth2User(roles, oAuth2Attribute.getAttributes(), oAuth2Attribute.getAttributeKey());
//    }
//
//    private Member saveMemberIfNotExist(String email, String nickname, String profileImage, String provider) {
//
//        Optional<Member> getMember = memberRepository
//                .findByEmail(email);
//        if(getMember.isPresent()) return getMember.get();
//        List<String> roles = authorityUtils.createRoles(email);
//        Member newMember = Member.builder()
//                .email(email)
//                .nickname(nickname)
//                .roles(roles)
//                .profileImage(profileImage)
//                .provider(provider)
//                .build();
//
//        return memberRepository.save(newMember);
//    }
//}
