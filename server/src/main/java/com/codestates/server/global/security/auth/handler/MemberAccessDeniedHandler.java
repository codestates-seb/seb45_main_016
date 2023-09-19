package com.codestates.server.global.security.auth.handler;

import com.codestates.server.global.security.response.ErrorResponder;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * 적절한 권한 없으면 호출되는 핸들러
 */
@Slf4j
@Component
public class MemberAccessDeniedHandler implements AccessDeniedHandler {
    @Override
    public void handle(HttpServletRequest request, 
                       HttpServletResponse response,
                       AccessDeniedException accessDeniedException) throws IOException, ServletException {
        // 권한 확인 과정에서 deniedException 발생 시 errorResponse 생성 후 전송
        ErrorResponder.sendErrorResponse(response, HttpStatus.FORBIDDEN);
        log.warn("⚠️ Forbidden error happened: {}", accessDeniedException.getMessage());
    }
}
