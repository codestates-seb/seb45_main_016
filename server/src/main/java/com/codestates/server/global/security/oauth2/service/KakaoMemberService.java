package com.codestates.server.global.security.oauth2.service;

import com.codestates.server.domain.member.entity.Member;
import com.codestates.server.domain.member.repository.MemberRepository;
import com.codestates.server.global.exception.BusinessLogicException;
import com.codestates.server.global.exception.ExceptionCode;
import com.codestates.server.global.security.auth.utils.CustomAuthorityUtils;
import com.codestates.server.global.security.oauth2.dto.KakaoAccountDto;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
@Transactional
public class KakaoMemberService {

    private final MemberRepository memberRepository;
    private final CustomAuthorityUtils customAuthorityUtils;

    /**
     * 카카오 로그인 메서드
     *
     * @param kakaoAccessToken
     * @return
     */
    public KakaoAccountDto getKakaoInfo(String kakaoAccessToken) {

        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + kakaoAccessToken); // header에 값 추가
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
        HttpEntity<MultiValueMap<String, String>> accountInfoRequest = new HttpEntity<>(headers);

        ResponseEntity<String> accountInfoResponse = restTemplate.exchange(
                "https://kapi.kakao.com/v2/user/me",
                HttpMethod.POST,
                accountInfoRequest,
                String.class
        );

        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        KakaoAccountDto kakaoAccountDto = null;

        try {
            kakaoAccountDto = objectMapper.readValue(accountInfoResponse.getBody(), KakaoAccountDto.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return kakaoAccountDto;
    }

    /**
     * 카카오 사용자 이메일로 존재하는 사용자인지 확인
     * @param kakaoAccountDto
     */
    private void verifyExistedMemberForKakao(KakaoAccountDto kakaoAccountDto) {

        String email = kakaoAccountDto.getAccountEmail();
        // DB에서 카카오 이메일로 사용자 찾기
        Optional<Member> optionalMember = memberRepository.findByEmail(email);
        // 이메일이 등록 되어있으면 예외 발생
        if(optionalMember.isPresent()) throw new BusinessLogicException(ExceptionCode.USER_EXISTS);
    }

    /**
     * 카카오 계정으로 회원 만드는 메서드
     *
     * @param kakaoAccessToken
     * @return
     */
    public Member createMemberForKakao(String kakaoAccessToken) {
        KakaoAccountDto kakaoAccountDto = getKakaoInfo(kakaoAccessToken);

        verifyExistedMemberForKakao(kakaoAccountDto);

        // 예외 발생 안 하면 새로운 회원 정보 생성
        Member kakaoMember = new Member();

        // 이메일로 사용자 역할 DB에 저장
        List<String> roles = customAuthorityUtils.createRoles(kakaoAccountDto.getAccountEmail());
        kakaoMember.setRoles(roles); // member 역할 set
        kakaoMember.setEmail(kakaoAccountDto.getAccountEmail()); // 카카오 회원 email set
        kakaoMember.setName(kakaoAccountDto.getProfileNickname());   // 카카오 회원 name set
        if (kakaoAccountDto.getProfileImage() != null) {    // 만약에 프로필 사진 null 아니면 image set
            kakaoMember.setProfileImage(kakaoAccountDto.getProfileImage());
        } else {    // 아니면 기본 이미지 설정
            kakaoMember.setProfileImage("https://github.com/codestates-seb/seb45_main_016/assets/130022922/11d9f077-5b70-4e96-bb30-d4034bb8cb98");    // 추후 변경
        }
        // 멤버 저장
        Member savedMember = memberRepository.save(kakaoMember);

        return savedMember;
    }


}
