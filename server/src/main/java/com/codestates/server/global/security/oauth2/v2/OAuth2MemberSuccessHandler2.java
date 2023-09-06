//package com.codestates.server.global.security.oauth2.v2;
//
//import com.codestates.server.domain.member.entity.Member;
//import com.codestates.server.domain.member.repository.MemberRepository;
//import com.codestates.server.global.security.auth.filter.JwtAuthenticationFilter;
//import com.codestates.server.global.security.auth.jwt.JwtTokenizer;
//import com.codestates.server.global.security.auth.utils.CustomAuthorityUtils;
//import lombok.AllArgsConstructor;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.oauth2.core.user.OAuth2User;
//import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
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
//import java.util.List;
//import java.util.Map;
//
//import static org.apache.http.client.utils.URIUtils.createURI;
//
//@AllArgsConstructor
//public class OAuth2MemberSuccessHandler2 extends SimpleUrlAuthenticationSuccessHandler {
//
//    private final JwtTokenizer jwtTokenizer;
//    private final CustomAuthorityUtils authorityUtils;
//    private final MemberRepository memberRepository;
//
//
//    @Override
//    public void onAuthenticationSuccess(HttpServletRequest request,
//                                        HttpServletResponse response,
//                                        Authentication authentication) throws IOException, ServletException {
//
//        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
//
//        String email = (String) oAuth2User.getAttributes().get("email");
//        String nickname = (String) oAuth2User.getAttributes().get("nickname");
//        String profileImage = (String) oAuth2User.getAttributes().get("profile_image_url");
//
//        List<String> roles = authorityUtils.createRoles(email);
//
//        Member member = makeMember(nickname, email, profileImage, roles);
//
//
//        redirect(request, response, member, roles);
////        super.onAuthenticationSuccess(request, response, authentication);
//    }
//
//    private Member makeMember(String nickname, String email, String profileImage, List<String> roles) {
//        Member member = new Member();
//
//        member.setEmail(email);
//        member.setNickname(nickname);
//        member.setProfileImage(profileImage);
//        member.setRoles(roles);
//
//        return member;
//    }
//
//    private void redirect(HttpServletRequest request,
//                          HttpServletResponse response,
//                          Member member,
//                          List<String> authorities) throws IOException {
//        String accessToken = delegateAccessToken(member);
//        String refreshToken = delegateRefreshToken(member);
//
//        String uri = createURI(request, accessToken, refreshToken).toString();
//
//        String headerValue = "Bearer " + accessToken;
//        response.setHeader("Authorization", headerValue);
//        response.setHeader("Refresh", refreshToken);
//
//        getRedirectStrategy().sendRedirect(request, response, uri);
//    }
//
//
//    private String delegateAccessToken(Member member) {
//
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
//        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
//
//        queryParams.add("access_token", accessToken);
//        queryParams.add("refresh_token", refreshToken);
//
//        String serverName = request.getServerName();
//
//        return UriComponentsBuilder
//                .newInstance()
//                .scheme("http")
////                .host("연결 후 변경")
//                .host("localhost")
////                .port()   // 베포 시 포트
//                .port(7070)   // local 테스트용
//                .path("/oauth2/authorization/kakao")            //리다이렉트 주소 (토큰이 포함된 url 을 받는 주소)
//                .queryParams(queryParams)
//                .build()
//                .toUri();
//
//    }
//}
