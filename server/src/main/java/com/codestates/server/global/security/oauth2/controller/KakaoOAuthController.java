package com.codestates.server.global.security.oauth2.controller;

import com.codestates.server.global.security.oauth2.dto.KakaoLoginResponseDto;
import com.codestates.server.global.security.oauth2.service.KakaoOAuthService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor

public class KakaoOAuthController {

    private final KakaoOAuthService kakaoOAuthService;


    /**
     * 카카오 code 콜백 컨트롤러
     *
     * @param code
     * @return
     */
    @GetMapping("/login/oauth/code/kakao")
    public ResponseEntity<KakaoLoginResponseDto> handleKakaoCallback(@RequestParam("code") String code) {

        // 프론트에서 받아온 code로 카카오에서 AccessToken 받기
        String kakaoAccessToken = String.valueOf(kakaoOAuthService.exchangeCodeForAccessToekn(code));

        // 카카오 로그인 성공, 실패 response
        return kakaoOAuthService.kakaoLogin(kakaoAccessToken);
    }

}
