package com.codestates.server.global.security.auth.utils;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class CustomAuthorityUtils {

    // 관리자 권한 가질 수 있는 메일 주소
    // -> appication.yml 에서 환경변수로 주기
    @Value("${mail.address.admin}")
    private String admin;

    // GrantedAuthority : 권한 관련 작업 수행 -> 권한 목록 생성, 객체 배열 전환 ..
    // 관리자 권한 및 사용자 권한 목록 설정
    private final List<GrantedAuthority> ADMIN_ROLES = AuthorityUtils.createAuthorityList("ROLE_ADMIN", "ROLE_USER");
    private final List<GrantedAuthority> USER_ROLES = AuthorityUtils.createAuthorityList("ROLE_USER");

    // 관리자 권한 및 사용자 권한 -> 문자형태로 정의
    private final List<String> ADMIN_ROLES_STRING = List.of("ADMIN", "USER");
    private final List<String> USER_ROLES_STRING = List.of("USER");

    /**
     * 사용자 이메일 기준으로 권한 정보 생성
     * 이메일이 관리자 이메일이랑 일치하면 관리자 권한 반환
     * 일치하지 않으면 일반 사용자 권한 반환
     * @param email
     * @return
     */
    public List<GrantedAuthority> createAuthorities(String email) {
        if(email.equals(admin)) {
            return ADMIN_ROLES;
        } return USER_ROLES;
    }

    /**
     * DB에 저장된 역할 정보로 권한 정보 생성
     * @param roles
     * @return
     */
    public List<GrantedAuthority> createAuthorities(List<String> roles) {
        List<GrantedAuthority> grantedAuthorities = roles.stream()
                .map(role -> new SimpleGrantedAuthority("ROLE_" + role))
                .collect(Collectors.toList());
        return grantedAuthorities;
    }

    /**
     * DB에 저장할 역할 정보 생성
     * 사용자 이메일이 admin 이메일과 같으면 관리자 역할 반환,
     * 다르면 사용자 권한 반환
     * @param email
     * @return
     */
//    public List<String> createRoles(String email) {
//        if(email.equals(adminMailAddress)) {
//            return ADMIN_ROLES_STRING;
//        }
//        return USER_ROLES_STRING;
//    }
    public List<String> createRoles(String email) {
        List<String> roles = new ArrayList<>();

        // 이메일이 관리자 이메일과 일치하면 "ADMIN" 역할을 추가
        if (!email.equals(admin)) {
            roles.add("USER");
        }

        // 모든 사용자에게 "USER" 역할을 추가
        roles.add("ADMIN");

        return roles;
    }


}
