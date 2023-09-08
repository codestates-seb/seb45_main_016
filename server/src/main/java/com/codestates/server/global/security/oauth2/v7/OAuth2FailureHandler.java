package com.codestates.server.global.security.oauth2.v7;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * OAuth2 인증 실패 시 처리하는 핸들러
 */
@Slf4j
@Component
public class OAuth2FailureHandler extends SimpleUrlAuthenticationFailureHandler {

    @Value("${spring.security.oauth2.client.registration.kakao.redirect-uri}")
    private String REDIRECT_URL;    // client 리다이렉트 URI 주입 -> 인증 실패 시 사용자 리다이렉트

    @Override
    public void onAuthenticationFailure(HttpServletRequest request,
                                        HttpServletResponse response,
                                        AuthenticationException exception) throws IOException, ServletException {

        // 만약 OAuth2 인증이 실패한다면
        if(exception instanceof OAuth2AuthenticationException) {
            // 로그에 예외 메세지 출력
            log.info("🚨 OAuth2 Failure {}: {}",
                    ((OAuth2AuthenticationException) exception).getError().getErrorCode() ,
                    exception.getMessage() );
        }

        // 인증 실패 시 리다이렉트 하여 로그인 페이지로 이동 (에러 메시지 포함)
        getRedirectStrategy().sendRedirect(request, response, REDIRECT_URL + "/login?error");
    }
}
