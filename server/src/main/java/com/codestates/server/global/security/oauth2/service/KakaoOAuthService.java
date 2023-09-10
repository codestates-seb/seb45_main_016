package com.codestates.server.global.security.oauth2.service;

import com.codestates.server.domain.member.dto.MemberResponseDto;
import com.codestates.server.domain.member.entity.Member;
import com.codestates.server.domain.member.mapper.MemberMapper;
import com.codestates.server.domain.member.service.MemberService;
import com.codestates.server.global.security.oauth2.config.KakaoOAuthConfig;
import com.codestates.server.global.security.oauth2.dto.KakaoAccountDto;
import com.codestates.server.global.security.oauth2.dto.KakaoLoginResponseDto;
import com.codestates.server.global.security.oauth2.dto.KakaoTokenDto;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import lombok.AllArgsConstructor;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@AllArgsConstructor
@Service
public class KakaoOAuthService {

    private final KakaoOAuthConfig kakaoOAuthConfig;
    private final KakaoMemberService kakaoMemberService;
    private final MemberMapper mapper;


    public KakaoTokenDto exchangeCodeForAccessToekn(String code) {

        // Http Header 에 Content type 입력 (공식문서 참고)
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        // Http Response Body 생성
        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("grant_type", "authorization_code");   // 고정값
        body.add("code", code); // 프론트에서 요청 받은 코드 값 (매개변수로 들어오는 값)
        body.add("client_id", kakaoOAuthConfig.getClientId());  // REST API key
        body.add("redirect_uri", kakaoOAuthConfig.getRedirectUri());
        body.add("client_secret", kakaoOAuthConfig.getClientSecret());

        // HttpHeader, HttpBody 하나로 담기
        HttpEntity<MultiValueMap<String, String>> kakaoTokenRequest = new HttpEntity<>(body, headers);

        // REST API 호출 후 응답을 받을 때 까지 기다리는 동기 방식의 http 템플릿 (json, xml을 쉽게 받음)
        RestTemplate restTemplate = new RestTemplate();
        // 카카오에서 AccessToken 받아오기
        ResponseEntity<String> kakaoAccessToken = restTemplate.exchange(
                "https://kauth.kakao.com/oauth/token",  // token 발급하는 주소
                HttpMethod.POST,    // POST 요청으로 토큰 발급받음
                kakaoTokenRequest,
                String.class
        );

        // JSON 데이터 -> JAVA 데이터로 직렬화
        // 혹은 JAVA 데이터 -> JSON 데이터로 역직렬화 하는 ObjectMapper 객체 생성
        ObjectMapper objectMapper = new ObjectMapper();
        // JavaTimeModule을 ObjectMapper에 등록(날짜, 시간 parsing)
        objectMapper.registerModule(new JavaTimeModule());
        // 알 수 없는 JSON속성 예외 반환 하지 않도록 (토큰을 받아야 하기 때문)
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);

        // KakaoTokenDto 초기화 -> JSON 응답 파싱 후 저장
        KakaoTokenDto kakaoTokenDto = null;

        try {
            // JSON 응답 문자열 objectMapper.readValue() 메서드 사용해서 KakaoTokenDto 객체로 변환
            kakaoTokenDto = objectMapper.readValue(kakaoAccessToken.getBody(), KakaoTokenDto.class);
        } catch (JsonProcessingException e) {
            // JSON 파싱 중에 예외가 발생하면 예외 처리
            e.printStackTrace();
        }
        // 파싱된 카카오 토큰 DTO 받아오기
        return kakaoTokenDto;
    }

    public ResponseEntity<KakaoLoginResponseDto> kakaoLogin(String kakaoAccessToken) {

        // 카카오 계정 정보 가지고 오기
        KakaoAccountDto kakaoAccountDto = kakaoMemberService.getKakaoInfo(kakaoAccessToken);

        // 회원 생성 또는 이미 존재하는 회원 가지고 오기
        Member member = kakaoMemberService.createMemberForKakao(kakaoAccessToken);

        // KakaoLoginResponseDto 생성
        KakaoLoginResponseDto kakaoLoginResponseDto = new KakaoLoginResponseDto();
        kakaoLoginResponseDto.setLoginSuccess(true);
        kakaoLoginResponseDto.setMember(member);

//        MemberResponseDto responseDto = mapper.memberToMemberResponseDto(member);

        // 성공적인 로그인 응답 반환
        return ResponseEntity.ok(kakaoLoginResponseDto);
    }
}
