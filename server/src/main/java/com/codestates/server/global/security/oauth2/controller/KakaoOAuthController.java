package com.codestates.server.global.security.oauth2.controller;

import com.codestates.server.domain.member.entity.Member;
import com.codestates.server.global.security.oauth2.dto.KakaoMemberInfo;
import com.codestates.server.global.security.oauth2.service.KakaoOAuthService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

//@RestController
//@AllArgsConstructor
//@CrossOrigin(origins = "*", allowedHeaders = "*")
//public class KakaoOAuthController {
//
//    private final KakaoOAuthService kakaoOAuthService;
//
//    /**
//     * 카카오 code 콜백 컨트롤러
//     *
//     * @param code : 프론트로부터 받아오는 code 매개변수 -> kakao로 직접 전달한다
//     * @return
//     */
//    @GetMapping("/login/oauth/code/kakao")
//    public ResponseEntity<?> handleKakaoCallback(@RequestParam("code") String code) {
//
//        // 1. 프론트에서 받아온 code로 카카오에서 AccessToken 받기
//        String kakaoAccessToken = kakaoOAuthService.exchangeCodeForAccessToekn(code);
//
//        // 2. AccessToken으로 사용자 정보 조회
//        KakaoMemberInfo kakaoMemberInfo = kakaoOAuthService.getKakaoMemberInfo(kakaoAccessToken);
//
//        // 3. 조회한 사용자 정보 DB에서 조회하기 -> 있으면 로그인, 없으면 저장(가입)
//        Member member = kakaoOAuthService.createMemberForKakao(kakaoMemberInfo);
//
//        // 4. 멤버 정보로 토큰 만들기
//         String accessToken = kakaoOAuthService.generateAccessToken(member);
//         String refreshToken = kakaoOAuthService.generateRefreshToken(member);
//
//        // 토큰을 응답에 포함시킬 응답 객체 생성
//        Map<String, String> tokenResponse = new HashMap<>();
//        tokenResponse.put("accessToken", accessToken);
//        tokenResponse.put("refreshToken", refreshToken);
//
//        // 응답으로 토큰 전송
//        return ResponseEntity.ok(tokenResponse);
//    }
//}
@RestController
@AllArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class KakaoOAuthController {

    private final KakaoOAuthService kakaoOAuthService;

    @GetMapping("/login/oauth/code/kakao")
    public ResponseEntity<?> handleKakaoCallback(@RequestParam("code") String code) {
        try {
            // 1. 프론트에서 받아온 code로 카카오에서 AccessToken 받기
            String kakaoAccessToken = kakaoOAuthService.exchangeCodeForAccessToekn(code);

            // 2. AccessToken으로 사용자 정보 조회
            KakaoMemberInfo kakaoMemberInfo = kakaoOAuthService.getKakaoMemberInfo(kakaoAccessToken);

            // 3. 조회한 사용자 정보 DB에서 조회하기 -> 있으면 로그인, 없으면 저장(가입)
            Member member = kakaoOAuthService.createMemberForKakao(kakaoMemberInfo);

            // 4. 멤버 정보로 토큰 만들기
            String accessToken = kakaoOAuthService.generateAccessToken(member);

            // 토큰을 응답으로 반환
            Map<String, String> tokenResponse = new HashMap<>();
            tokenResponse.put("accessToken", accessToken);

            return ResponseEntity.ok(tokenResponse);
        } catch (Exception e) {
            // 예외 발생 시 에러 응답 반환
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
