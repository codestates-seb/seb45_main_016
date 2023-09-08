//package com.codestates.server.global.security.oauth2.v5;
//
//import com.codestates.server.domain.member.entity.Member;
//import com.codestates.server.domain.member.repository.MemberRepository;
//import com.codestates.server.global.security.auth.jwt.JwtTokenizer;
//import com.codestates.server.global.security.auth.utils.CustomAuthorityUtils;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
//import org.springframework.security.oauth2.core.user.OAuth2User;
//import org.springframework.security.web.DefaultRedirectStrategy;
//import org.springframework.security.web.RedirectStrategy;
//import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
//import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
//import org.springframework.stereotype.Component;
//import org.springframework.util.LinkedMultiValueMap;
//import org.springframework.util.MultiValueMap;
//import org.springframework.web.util.UriComponentsBuilder;
//
//import javax.servlet.ServletException;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//import java.io.IOException;
//import java.net.URI;
//import java.util.Date;
//import java.util.HashMap;
//import java.util.Map;
//
//@Slf4j
//@Component
//@RequiredArgsConstructor
//public class OAuth2MemberSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
//
//    private final JwtTokenizer jwtTokenizer;
//    private final MemberRepository memberRepository;
//
//    private final RedirectStrategy redirectStrategy = new DefaultRedirectStrategy();
//
//    @Override
//    public void onAuthenticationSuccess(HttpServletRequest request,
//                                        HttpServletResponse response,
//                                        Authentication authentication) throws IOException, ServletException {
//
//        log.info("✨ Authenticated successfully !😃 ✨");
//
//        OAuth2AuthenticationToken forProviderInfo = (OAuth2AuthenticationToken) authentication;
//        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
//        String provider = forProviderInfo.getAuthorizedClientRegistrationId();
//
//        String email;
//
//        // 카카오 제공자에서 이메일
//        if("kakao".equals(provider)) {
//            Map<String, Object> kakaoAccount = (Map<String, Object>) oAuth2User.getAttributes().get("kakao_account");
//            email = String.valueOf(kakaoAccount.get("email"));
//        } else throw new RuntimeException("provider is not exist"); // 없으면 예외
//
//        // 사용자를 이메일을 기반으로 검색하고 없으면 예외
//        Member member = memberRepository
//                .findByEmail(email)
//                .orElseThrow(()-> new RuntimeException("Not fount : " + email));
//
//        // 액세스 토큰과 리프레시 토큰 생성
//        String accessToken = delegateAccessToken(member);
//        String refreshToken = delegateRefreshToken(member);
//
//        // 리다이렉트할 URI 생성
//        String uri = createURI(request, accessToken, refreshToken).toString();
//
//        // 응답 헤더에 토큰 정보 설정
//        String headerValue = "Bearer " + accessToken;
//        response.setHeader("Authorization", headerValue);
//        response.setHeader("Refresh", refreshToken);
//
//        // 생성한 URI로 리다이렉트
//        getRedirectStrategy().sendRedirect(request, response, uri);
//
//        log.info("로그인 성공 종료");
//
//    }
//    private String delegateAccessToken(Member member) {
//
//        // JWT 클레임 구성
//        Map<String, Object> claims = new HashMap<>();
//
//        claims.put("memberId", member.getMemberId());
//        claims.put("email", member.getEmail());
//        claims.put("roles", member.getPassword());
//
//        // token이 어떤 사용자를 대표하는지 명시적으로 표현하기 위해 사용 -> 주로 사용자의 이메일 또는 아이디를 담음
//        String subject = member.getEmail();
//
//        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());  // 만료시간 설정
//
//        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
//
//        String accessToken = jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);
//
//        return accessToken;
//    }
//
//
//    private String delegateRefreshToken(Member member) {
//
//        String subject = member.getEmail();
//
//        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());
//
//        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
//
//        String refreshToken = jwtTokenizer.generateRefreshToken(subject, expiration, base64EncodedSecretKey);
//
//        return refreshToken;
//
//    }
//
//    private URI createURI(HttpServletRequest request,
//                          String accessToken,
//                          String refreshToken) {
//
//        // 쿼리 파라미터를 설정하기 위한 MultiValueMap 생성
//        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
//
//        // 액세스 토큰과 리프레시 토큰을 쿼리 파라미터로 추가
//        queryParams.add("access_token", accessToken);
//        queryParams.add("refresh_token", refreshToken);
//
//        // 현재 서버의 이름과 포트를 가져
//        String serverName = request.getServerName();
//
//        return UriComponentsBuilder
//                .newInstance()
//                .scheme("http")
////                .host("연결 후 변경")
//                .host("localhost")
////                .port()   // 베포 시 포트
//                .port(8080)   // local 테스트용
//                .path("/login/oauth/code/kakao")            //리다이렉트 주소 (토큰이 포함된 url 을 받는 주소)
//                .queryParams(queryParams)
//                .build()
//                .toUri();
//
//    }
//}
