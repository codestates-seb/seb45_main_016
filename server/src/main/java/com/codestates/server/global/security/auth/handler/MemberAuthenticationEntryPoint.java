package com.codestates.server.global.security.auth.handler;

import com.codestates.server.global.security.response.ErrorResponder;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * 사용자 인증 실패 시 응답
 */
@Slf4j
@Component
public class MemberAuthenticationEntryPoint implements AuthenticationEntryPoint {

    @Override
    public void commence(HttpServletRequest request,
                         HttpServletResponse response,
                         AuthenticationException authException) throws IOException, ServletException {
        // 요청에서 발생한 예외 가지고 오기
        Exception exception = (Exception) request.getAttribute("exception");
        // UNAUTHORIZED (401)로 응답코드 response
        ErrorResponder.sendErrorResponse(response, HttpStatus.UNAUTHORIZED);

        logExceptionMessage(authException, exception);
    }

    private void logExceptionMessage(AuthenticationException authException, Exception exception) {
        // exception이 null이 아니라면 (예외발생했다면 메세지 get) 아니면 AuthenticationException 메세지 get
        String message = exception != null ? exception.getMessage() : authException.getMessage();
        // 경고 로그 출력
        log.warn("⚠️ Unauthorized error happened: {}", message);
    }
}
