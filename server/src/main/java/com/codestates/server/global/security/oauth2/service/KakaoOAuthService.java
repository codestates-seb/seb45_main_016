package com.codestates.server.global.security.oauth2.service;

import com.codestates.server.domain.member.entity.Member;
import com.codestates.server.domain.member.repository.MemberRepository;
import com.codestates.server.global.exception.BusinessLogicException;
import com.codestates.server.global.exception.ExceptionCode;
import com.codestates.server.global.security.auth.jwt.JwtTokenizer;
import com.codestates.server.global.security.auth.utils.CustomAuthorityUtils;
import com.codestates.server.global.security.oauth2.config.KakaoOAuthConfig;
import com.codestates.server.global.security.oauth2.dto.KakaoMemberInfoDto;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.*;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.*;

@AllArgsConstructor
@Service
@Transactional
@Slf4j
public class KakaoOAuthService {

    private final KakaoOAuthConfig kakaoOAuthConfig;
    private final MemberRepository memberRepository;
    private final CustomAuthorityUtils customAuthorityUtils;
    private final JwtTokenizer jwtTokenizer;


    /**
     * 인가 코드로 카카오 토큰 받는 exchangeCodeForAccessToken 메서드
     * 🔗 https://developers.kakao.com/docs/latest/ko/kakaologin/rest-api#request-token
     *
     * @param code
     * @return
     */
    @SneakyThrows
    public String exchangeCodeForAccessToken(String code) {

        log.info("🌷 Received code: {}", code);

        // Http Header 에 Content type 입력 (공식문서 참고)
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        // Http Request Body 생성
        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("grant_type", "authorization_code");   // 고정값
        body.add("client_id", kakaoOAuthConfig.getClientId());  // REST API key
        body.add("redirect_uri", kakaoOAuthConfig.getRedirectUri());
        body.add("code", code); // 프론트에서 요청 받은 코드 값 (매개변수로 들어오는 값)
        body.add("client_secret", kakaoOAuthConfig.getClientSecret());

        // HttpRequestHeader, HttpRequestBody 하나로 담아서 요청 보내기
        HttpEntity<MultiValueMap<String, String>> kakaoTokenRequest = new HttpEntity<>(body, headers);
        // RestTemplate : REST API 호출 후 응답을 받을 때 까지 기다리는 동기 방식의 http 템플릿 (json, xml을 쉽게 받음)
        RestTemplate restTemplate = new RestTemplate();
        // 카카오에서 AccessToken 받아오기
        ResponseEntity<String> response = restTemplate.exchange(
                "https://kauth.kakao.com/oauth/token",  // token 발급하는 주소
                HttpMethod.POST,    // POST 요청으로 토큰 발급받음
                kakaoTokenRequest,
                String.class
        );

        // JSON 형태의 kakaoAccessToken -> String으로 parsing
        String responseBody = response.getBody();
        // ObjectMapper : JSON 문자열 JAVA 객체로 변환
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(responseBody);
        // "access_token"필드값 추출하고 문자열로 반환
        return jsonNode.get("access_token").asText();
    }

    /**
     * 카카오애서 발급받은 accessToken으로 MemberInfo 조회하기
     * 🔗 https://developers.kakao.com/docs/latest/ko/kakaologin/rest-api#req-user-info-request
     *
     * @param accessToken
     * @return
     */
    public KakaoMemberInfoDto getKakaoMemberInfoDto(String accessToken) {

        log.info("Received Kakao access token for member info: {}", accessToken);

        return WebClient.builder()  // WebClient : 비동기 방식으로 원하는 값만 출력할 때 효율적이다
                .baseUrl("https://kapi.kakao.com/v2/user/me")   // 고정값
                .build()
                .get()
                .header("Authorization", "Bearer " + accessToken)
                .header("Content-type", "application/x-www-form-urlencoded;charset=utf-8")
                .retrieve()
                .bodyToMono(KakaoMemberInfoDto.class)
                .block();

    }

    /**
     * accesstoken으로 조회한 회원 정보로 Member 등록하기
     *
     * @param accessToken
     * @return
     */
    public Member createMemberForKakao(String accessToken) {

        KakaoMemberInfoDto kakaoMemberInfoDto = getKakaoMemberInfoDto(accessToken);

        // null 체크: Kakao API로부터 받은 정보가 null인지 확인 -> 동의 정보, 이메일 등
        if (kakaoMemberInfoDto == null || kakaoMemberInfoDto.getKakao_account() == null || kakaoMemberInfoDto.getProperties() == null) {
            log.error("카카오로부터 유효한 사용자 정보를 받지 못했습니다.");
            throw new BusinessLogicException(ExceptionCode.UNAUTHORIZED_KAKAO);
        }

        String email = kakaoMemberInfoDto.getKakao_account().getEmail();
        log.info("이메일로 회원 찾기 : {}", email);

        // 카카오에서 이메일 누락되면 예외 던지기
        if (email == null) {
            throw new BusinessLogicException(ExceptionCode.UNAUTHORIZED_EMAIL_KAKAO); // 예외 던지기
        }

        // DB에 중복되는 이메일 있는지 확인
        Optional<Member> existingMember = memberRepository.findByEmail(email);

        // 있으면
        if (existingMember.isPresent()) {
            // 그대로 반환
            return existingMember.get();

        } else {
            // 없으면 회원 가입
            Member newMember = new Member();

            newMember.setName(kakaoMemberInfoDto.getProperties().getNickname());
            log.info("Creating/Found member with name: {}", newMember.getName());
            newMember.setEmail(kakaoMemberInfoDto.getKakao_account().getEmail());
            log.info("Creating/Found member with email: {}", newMember.getEmail());
            newMember.setProfileImage(kakaoMemberInfoDto.getProperties().getProfile_image());
            log.info("Creating/Found member with profile image: {}", newMember.getProfileImage());
            newMember.setRoles(Collections.singletonList("USER"));

            // 새로운 멤버는 저장하고 리턴
            return memberRepository.save(newMember);
        }
    }

    public String generateAccessToken(Member member) {

        // jwt 클레임 생성
        Map<String, Object> claims = new HashMap<>();
        claims.put("memberId", member.getMemberId());
        claims.put("email", member.getEmail());
        claims.put("roles", member.getRoles());
        claims.put("name", member.getName());
        claims.put("profileImage", member.getProfileImage());

        Date expriration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        String accessToken = jwtTokenizer.generateAccessToken(claims, member.getEmail(), expriration, base64EncodedSecretKey);

        log.info("🗝️ JWT 토큰 생성 🗝️:{}", accessToken);

        return accessToken;
    }

    public String generateRefreshToken(Member member) {

        Date expriration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        String refreshToken = jwtTokenizer.generateRefreshToken(member.getEmail(), expriration, base64EncodedSecretKey);

        log.info("🗝️ JWT 토큰 생성 🗝️:{}", refreshToken);

        return refreshToken;
    }

}
