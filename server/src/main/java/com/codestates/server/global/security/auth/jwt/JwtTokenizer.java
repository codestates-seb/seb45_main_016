package com.codestates.server.global.security.auth.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.io.Encoders;
import io.jsonwebtoken.security.Keys;
import lombok.Getter;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Calendar;
import java.util.Date;
import java.util.Map;
import java.util.TimeZone;

/**
 * 로그인 인증에 성공한 클라이언트에게 JWT를 생성,발급하고
 * 요청이 들어올 때 마다 전달된 JWT 검증
 */
@Component
public class JwtTokenizer {

    @Getter
    @Value("${jwt.key}")
    private String secretKey;

    @Value("${jwt.access-token-expiration-minutes}")
    private int originMinutes;

    @Getter
    private int accessTokenExpirationMinutes;

    @PostConstruct
    public void init() {
        this.accessTokenExpirationMinutes = this.originMinutes * 6;
    }
<<<<<<< HEAD
=======
  
>>>>>>> cb974d5a967888f29a852c9e07415512dcee831f
    @Getter
    @Value("${jwt.refresh-token-expiration-minutes}")
    private int refreshTokenExpirationMinutes;

    public String encodeBase64SecretKey(String secretKey) {
        return Encoders.BASE64.encode(secretKey.getBytes(StandardCharsets.UTF_8));
    }

    /**
     * AccessToken 생성 메서드
     *
     * @param claims
     * @param subject
     * @param expiration
     * @param base64EncodedSecretKey
     * @return
     */
    public String generateAccessToken(Map<String, Object> claims,
                                      String subject,
                                      Date expiration,
                                      String base64EncodedSecretKey) {

        Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(Calendar.getInstance().getTime())
                .setExpiration(expiration)
                .signWith(key)
                .compact();
    }

    /**
     * RefreshToken 생성 메서드
     *
     * @param subject
     * @param expiration
     * @param base64EncodedSecretKey
     * @return
     */
    public String generateRefreshToken(String subject,
                                       Date expiration,
                                       String base64EncodedSecretKey) {

        Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);

        return Jwts.builder()
                .setSubject(subject)
                .setIssuedAt(Calendar.getInstance().getTime())
                .setExpiration(expiration)
                .signWith(key)
                .compact();
    }

    /**
     * JWS에서 클래임 추출
     */
    public Jws<Claims> getClaims(String jws, String base64EncodedSecretKey) {
        Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);

        Jws<Claims> claims =    // JWT에 저장된 정보
                Jwts.parserBuilder()   // JWT를 파싱하기 위한 파서(Decoder)를 생성하는 메서드 -> 디코딩시 사용되는 파서 생성
                .setSigningKey(key) // 서명 검증을 위해 사용되는 key를 설정 (JWT 생성 시 사용된 키와 일치하면 검증 성공)
                .build()
                .parseClaimsJws(jws); // 실제 문자열을 파싱하고 JWT의 서명 검증 -> 검증되는 클레임 정보 추출, Jws<Claims>에 저장

        return claims;
    }

    /**
     * JWS 서명 검증
     * 그냥 검증하는 용도로만 작성
     */
    public void verifySignature(String jws, String base64EncodedSecretKey) {
        Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);

        Jwts.parserBuilder()
                .setSigningKey(key) // 서명 검증에 사용될 Key 설정
                .build()
                .parseClaimsJws(jws);   // jws 파싱, 서명 검증 -> 일치하지 않으면 예외발생
    }

    /**
     * 토큰 만료 시간 계산 후 반환
     *
      * @param expriationMinutes
     * @return
     */

    public Date getTokenExpiration(int expriationMinutes) {
        Calendar calendar = Calendar.getInstance(TimeZone.getTimeZone("GMT"));
        calendar.add(Calendar.MINUTE, expriationMinutes);   // 현재 시간에 토큰 만료 시간 더하기

        Date expiration = calendar.getTime();   // 캘린더 객체(expiration)를 Date 객체로 바꿔서 만료시간 얻기

        return expiration;  // 만료시간 반환
    }


    /**
     * 인코딩 된 시크릿 키로부터 Key 객체 생성
     *
     * @param base64EncodedSecretKey
     * @return
     */
    private Key getKeyFromBase64EncodedKey(String base64EncodedSecretKey) {
        byte[] keyBytes = Decoders.BASE64.decode(base64EncodedSecretKey); // 인코딩 된 key를 디코딩
        Key key = Keys.hmacShaKeyFor(keyBytes); // 디코딩 된 키를 HMAC-SHA 키 생성

        return key; // 키 반환 -> 서명 검증
    }
}
