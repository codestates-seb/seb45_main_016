//package com.codestates.server.global.security.oauth2.v3;
//
//import com.codestates.server.domain.member.entity.Member;
//import com.codestates.server.domain.member.repository.MemberRepository;
//import com.codestates.server.global.security.auth.jwt.JwtTokenizer;
//import com.codestates.server.global.security.auth.utils.CustomAuthorityUtils;
//import lombok.AllArgsConstructor;
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
//
//@AllArgsConstructor
//public class OAuth2MemberSuccessHandler3 extends SimpleUrlAuthenticationSuccessHandler {
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
//        super.onAuthenticationSuccess(request, response, authentication);
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
//
//}
