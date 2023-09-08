package com.codestates.server.global.security.oauth2.v7;

import com.codestates.server.domain.member.entity.Member;
import com.codestates.server.domain.member.repository.MemberRepository;
import com.codestates.server.global.security.auth.utils.CustomAuthorityUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.OAuth2Error;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

    private final MemberRepository memberRepository;
    private final CustomAuthorityUtils authorityUtils;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {

        OAuth2UserService<OAuth2UserRequest, OAuth2User> delegate = new DefaultOAuth2UserService();
        OAuth2User oAuth2User = delegate.loadUser(userRequest);

        OAuth2Attribute attributes = OAuth2Attribute.of(userRequest, oAuth2User);

        Member member = saveOAuthUser(attributes);

        return null;
    }

    private Member saveOAuthUser(OAuth2Attribute oAuth2Attribute) {

        Optional<Member> optionalMember
                = memberRepository.findByEmailAndProvider(oAuth2Attribute.getEmail(), oAuth2Attribute.getProvider());

        if(optionalMember.isPresent()) {
            Member member = optionalMember.orElseThrow(() -> new RuntimeException("🚨 회원 정보를 찾을 수 없습니다. 🚨"));
            return member;
        }
        if(memberRepository.existsByEmail(oAuth2Attribute.getEmail())) {
            throw  new OAuth2AuthenticationException(new OAuth2Error("이미 가입한 회원입니다."), oAuth2Attribute.getEmail());
        }

        Member member = new Member();
        member.setEmail(oAuth2Attribute.getEmail());
        member.setName(oAuth2Attribute.getNickname());
        member.setProfileImage(oAuth2Attribute.getProfileImage());
        member.setProvider(oAuth2Attribute.getProvider());
        member.setRoles(authorityUtils.createRoles(oAuth2Attribute.getEmail()));

        return memberRepository.save(member);
    }
}
