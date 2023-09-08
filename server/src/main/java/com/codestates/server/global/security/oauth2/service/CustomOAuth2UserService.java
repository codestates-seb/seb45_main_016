package com.codestates.server.global.security.oauth2.service;

import com.codestates.server.domain.member.entity.Member;
import com.codestates.server.domain.member.repository.MemberRepository;
import com.codestates.server.global.security.auth.utils.CustomAuthorityUtils;
import com.codestates.server.global.security.oauth2.attribute.CustomOAuth2User;
import com.codestates.server.global.security.oauth2.attribute.OAuth2Attribute;
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

    /**
     * OAuth2UserRequest를 기반으로 OAuth2 사용자 정보 가져오고 처리하는 서비스 클래스
     *
     * @param userRequest the user request
     * @return
     * @throws OAuth2AuthenticationException
     */
    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {

        // OAuth2UserServicef로 OAuth2 사용자 정보 가지고 오기
        OAuth2UserService<OAuth2UserRequest, OAuth2User> delegate = new DefaultOAuth2UserService();
        OAuth2User oAuth2User = delegate.loadUser(userRequest);

        // OAuth2Attribute 클래스로 사용자 정보 추출
        OAuth2Attribute attributes = OAuth2Attribute.of(userRequest, oAuth2User);

        // 추출한 정보로 회원 정보 저장하고 회원 정보 반환
        Member member = saveOAuthUser(attributes);

        // 로그 입력
        log.info("✨ OAuth User email = {}, nickname = {}" , attributes.getEmail(), attributes.getNickname());

        return CustomOAuth2User.of(member.getMemberId(), attributes);
    }

    /**
     * OAuth2 사용자 정보를 기반으로 회원 정보 저장하고 반환
     * @param oAuth2Attribute : OAuth2 사용자 정보 객체
     * @return 저장된 회원 정보
     */
    private Member saveOAuthUser(OAuth2Attribute oAuth2Attribute) {

        // 이메일과 제공자(provider)로 가입된 회원 찾기
        Optional<Member> optionalMember
                = memberRepository.findByEmailAndProvider(oAuth2Attribute.getEmail(), oAuth2Attribute.getProvider());

        // 회원 가입 되어있는지 확인
        if(optionalMember.isPresent()) {
            Member member = optionalMember.orElseThrow(() -> new RuntimeException("🚨 회원 정보를 찾을 수 없습니다. 🚨"));
            return member;
        }
        // 이미 가입한 회원인지 찾기
        if(memberRepository.existsByEmail(oAuth2Attribute.getEmail())) {
            throw  new OAuth2AuthenticationException(new OAuth2Error("🚨 이미 가입한 회원입니다.🚨"), oAuth2Attribute.getEmail());
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
