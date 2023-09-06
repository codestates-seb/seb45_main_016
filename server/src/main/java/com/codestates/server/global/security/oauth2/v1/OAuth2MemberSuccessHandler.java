//package com.codestates.server.global.security.oauth2.v1;
//
//import com.codestates.server.domain.member.entity.Member;
//import com.codestates.server.domain.member.service.MemberService;
//import com.codestates.server.global.security.auth.jwt.JwtTokenizer;
//import com.codestates.server.global.security.auth.utils.CustomAuthorityUtils;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.oauth2.core.user.OAuth2User;
//import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
//
//import javax.servlet.ServletException;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//import java.io.IOException;
//
//public class OAuth2MemberSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
//
//    private final JwtTokenizer jwtTokenizer;
//    private final CustomAuthorityUtils authorityUtils;
//    private final MemberService memberService;
//
//    public OAuth2MemberSuccessHandler(JwtTokenizer jwtTokenizer, CustomAuthorityUtils authorityUtils, MemberService memberService) {
//
//        this.jwtTokenizer = jwtTokenizer;
//        this.authorityUtils = authorityUtils;
//        this.memberService = memberService;
//    }
//
//    @Override
//    public void onAuthenticationSuccess(HttpServletRequest request,
//                                        HttpServletResponse response,
//                                        Authentication authentication) throws IOException, ServletException {
//
//        var oAuth2User = (OAuth2User) authentication.getPrincipal();
//        String email = String.valueOf(oAuth2User.getAttributes().get("email"));
//        String nickname = String.valueOf(oAuth2User.getAttributes().get("nickname"));
//        String profileImage = String.valueOf(oAuth2User.getAttributes().get("profile_image_url"));
//
//        saveMember(email, nickname, profileImage);
//
//
//        super.onAuthenticationSuccess(request, response, authentication);
//    }
//
//    private void saveMember(String email, String nickname, String profileImage) {
//        Member member = new Member();
//
//        member.setEmail(email);
//        member.setNickname(nickname);
//        member.setProfileImage(profileImage);
//
//        memberService.createMember(member);
//    }
//
//
//}
