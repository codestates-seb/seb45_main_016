package com.codestates.server.global.security.auth.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
public class SecurityConfiguration {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .headers().frameOptions().sameOrigin()  // 동일한 출처로 들어오는 요청만 렌더링 허용
                .and()
                .csrf().disable() // csrf 허용 안 함
                .cors().configurationSource(corsConfigurationSource())  // 직접 작성한 corsConfiguration 적용
                .and()
                .formLogin().disable()  // formLogin(주로 SSR 방식에서 사용됨) 허용 안 함 -> JSON 형식으로 전송할 것
                .httpBasic().disable() // httpBasic(username, password를 헤더에 실어서 인증) 허용 안 함
                .authorizeHttpRequests(authorize -> authorize
                        .anyRequest().permitAll()   // 모든 요청 접근 허용
                );
        return http.build();
    }

    /**
     * Password Encoder Bean 객체 생성
     *
     * @return
     */
    @Bean
    public PasswordEncoder passwordEncoder(){
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration = new CorsConfiguration();

        // 모든 헤더 허용
        configuration.setAllowedHeaders(Arrays.asList("*"));
        //자격 증명 (예 : 쿠키, 인증 헤더 등) 허용
        configuration.setAllowCredentials(true);
        // 허용할 출처 패턴 설정 ** setAllowedOrigin은 setAlowedCredentials 과 함께 사용 불가 **
        // setAllowedOriginPattern은 이전 버전으로 setAlowedCredentials와 사용이 가능
        configuration.setAllowedOriginPatterns(Arrays.asList("*"));
        // 지정한 HTTP 메서드에 대한 통신 허용
        // OPTIONS : 프리플라이트 요청
        configuration.setAllowedMethods(Arrays.asList("POST", "PATCH", "GET", "DELETE", "OPTIONS"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        // 모든 엔드포인트에 구성한 CORS 적용
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }
}