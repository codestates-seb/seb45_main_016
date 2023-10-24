package com.codestates.server.global.security.auth.filter;

import com.codestates.server.global.security.auth.jwt.JwtTokenizer;
import com.codestates.server.global.security.auth.utils.CustomAuthorityUtils;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.security.SignatureException;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.Map;

/**
 * Jwt 토큰 검증하는 security filter
 * request 당 한 번만 수행하는 JWT 전용 필터
 *
 */
@AllArgsConstructor
public class JwtVerificationFilter extends OncePerRequestFilter {

    // JWT 검증 및 claims 정보 얻기
    private final JwtTokenizer jwtTokenizer;
    // JWT 검증 성공 시 Authentication 에 채울 권한 생성
    private final CustomAuthorityUtils authorityUtils;

    @Override
    protected void doFilterInternal(HttpServletRequest request, 
                                    HttpServletResponse response, 
                                    FilterChain filterChain) throws ServletException, IOException {

        try {
            // Jwt 검증 및 claim 정보 요청에서 가지고 오기
            Map<String, Object> claims = verifyJws(request);
            // 추출 권한 정보를 보안 컨텍스트에 인증 정보로 설정
            setAuthenticationToContext(claims);
        } catch (SignatureException se) {   // 서명 실패시 예외 발생
            request.setAttribute("exception", se);
        } catch (ExpiredJwtException ee) {  // 기간 만료시 예외 발생
            request.setAttribute("exception", ee);
        } catch (Exception e) {
            request.setAttribute("exception", e);
        }

        // 다음 필터로 요청, 응답 전달
        filterChain.doFilter(request, response);
    }

    /**
     * filter가 적용되어야 하는지를 결정하는 메서드
     * true 이면 필터 적용 안 되고 false면 반환 필터 적용
     * @param request current HTTP request
     * @return
     * @throws ServletException
     */
    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        // Authorization을 header에서 가지고 온다.
        String authorization = request.getHeader("Authorization");
        // "Bearer"로 시작하지 않거나 "Authorization" 헤더가 없을 때 필터 적용 X
        return authorization == null || !authorization.startsWith("Bearer");
    }



    /**
     * JWT 검증하는 데 사용되는 private 메섣,
     *
     * @param request
     * @return
     */
    private Map<String, Object> verifyJws(HttpServletRequest request) {
        // 요청에서 Authorization 헤더 받아서 "Bearer "제거
        // jws : JSON Web Token Signed
        String jws = request.getHeader("Authorization").replace("Bearer ", "");
        // 시크릿 키 인코딩
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        // Claims 파싱 -> claims가 정상적으로 파싱되면 검증도 성공한 것
        Map<String, Object> claims = jwtTokenizer.getClaims(jws, base64EncodedSecretKey).getBody();

        return claims;
    }

    private void setAuthenticationToContext(Map<String, Object> claims) {
        // 클레임에서 'email' 가지고 오기
        String email = (String) claims.get("email");
        // 클레임에서 역할 정보 가져와서 권한 객체로 변경
        List<GrantedAuthority> authorities = authorityUtils.createAuthorities((List)claims.get("roles"));
        // 사용자 인증 객체 생성, 자격 증명은 null로 설정
        Authentication authentication = new UsernamePasswordAuthenticationToken(email, null, authorities);
        // 스프링 시큐리티 보안 컨텍스트에 인증 정보 설정
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }
}
