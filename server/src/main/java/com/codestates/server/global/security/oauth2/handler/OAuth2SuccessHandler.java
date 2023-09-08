package com.codestates.server.global.security.oauth2.handler;

import com.codestates.server.domain.member.entity.Member;
import com.codestates.server.domain.member.repository.MemberRepository;
import com.codestates.server.global.security.auth.jwt.JwtTokenizer;
import com.codestates.server.global.security.oauth2.attribute.CustomOAuth2User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * OAuth2 인증 성공 시 실행되는 핸들러
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    @Value("${spring.security.oauth2.client.registration.kakao.redirect-uri}")
    private String REDIRECT_URL;    // Kakao OAuth2 클라이언트의 리다이렉트 URL
    private final JwtTokenizer jwtTokenizer;
    private final MemberRepository memberRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {

        // 사용자 정보 추출
        CustomOAuth2User oAuth2User = (CustomOAuth2User) authentication.getPrincipal();
        Map<String, Object> kakao_account = (Map<String, Object>) oAuth2User.getAttributes().get("kakao_account");
        Map<String, Object> profile = (Map<String, Object>) kakao_account.get("profile");
        String email = (String) kakao_account.get("email");

        // 이메일을 기반으로 회원 정보 검색
        Member member = memberRepository.findByEmail(email).orElseThrow();

        // jwt 클레임 생성
        Map<String, Object> claims = new HashMap<>();
        claims.put("email", member.getEmail());
        claims.put("name", member.getName());
        claims.put("roles", member.getRoles());
        claims.put("memberId", member.getMemberId());

        // jwt 토큰 생성
        log.info("🗝️ JWT 토큰 생성 🗝️");
        Date expriration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        String accessToken = jwtTokenizer.generateAccessToken(claims, email, expriration, base64EncodedSecretKey);
        String refreshToken = jwtTokenizer.generateRefreshToken(email, expriration, base64EncodedSecretKey);

        // 리다이렉트 URL 생성
        String url = makeRedirectUrl(accessToken, refreshToken);

        // 사용자를 새롭게 지정된 URL로 리다이렉트
        getRedirectStrategy().sendRedirect(request, response, url);
    }

    // 새롭게 지정할 리다이렉트 URL 생성
    private String makeRedirectUrl(String accessToken, String refreshToken) {

        return UriComponentsBuilder
                .fromUriString(REDIRECT_URL + "/oauth2/redirect?accessToken=" + accessToken + "&refreshToken=" + refreshToken)
                .build()
                .toUriString();

    }
}
