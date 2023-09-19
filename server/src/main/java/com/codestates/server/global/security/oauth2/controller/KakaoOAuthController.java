package com.codestates.server.global.security.oauth2.controller;

import com.codestates.server.domain.member.entity.Member;
import com.codestates.server.global.security.oauth2.dto.KakaoMemberInfoDto;
import com.codestates.server.global.security.oauth2.service.KakaoOAuthService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
@AllArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
@Slf4j
public class KakaoOAuthController {

    private final KakaoOAuthService kakaoOAuthService;

    @GetMapping("/login/oauth/code/kakao")
    public ResponseEntity<?> handleKakaoCallback(@RequestParam("code") String code) {
        try {
            log.info("Received code: {}", code);
            // 1. 프론트에서 받아온 code로 카카오에서 AccessToken 받기
            String kakaoAccessToken = kakaoOAuthService.exchangeCodeForAccessToken(code);
            log.info("Received Kakao access token: {}", kakaoAccessToken);

            // 2. AccessToken으로 사용자 정보 조회
            KakaoMemberInfoDto kakaoMemberInfoDto = kakaoOAuthService.getKakaoMemberInfoDto(kakaoAccessToken);
            log.info("Kakao member info: {}", kakaoMemberInfoDto);

            // 3. 조회한 사용자 정보 DB에서 조회하기 -> 있으면 로그인, 없으면 저장(가입)
            Member member = kakaoOAuthService.createMemberForKakao(kakaoAccessToken);
            log.info("Created/Found member: {}", member);

            // 4. 멤버 정보로 토큰 만들기
            String accessToken = kakaoOAuthService.generateAccessToken(member);
            String refreshToken = kakaoOAuthService.generateRefreshToken(member);
            log.info("Generated access token: {}", accessToken);
            log.info("Generated access token: {}", refreshToken);

            // 5. 토큰을 응답 헤더에 추가
            HttpHeaders headers = new HttpHeaders();
            headers.add("accessToken", accessToken);
            headers.add("refreshToken", refreshToken);

            return ResponseEntity.ok().headers(headers).body(kakaoMemberInfoDto);
        } catch (Exception e) {
            log.error("Error occurred during Kakao OAuth process", e);
            // 예외 발생 시 에러 응답 반환
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
