package com.codestates.server.global.security.auth.handler;

import com.codestates.server.global.security.response.ErrorResponse;
import com.google.gson.Gson;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

// 로그인 인증 실패 시 추가 작업하는 클래스
@Slf4j
public class MemberAuthenticationFailureHandler implements AuthenticationFailureHandler {

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, 
                                        HttpServletResponse response, 
                                        AuthenticationException exception) throws IOException, ServletException {

        // 인증 실패 후 로그 기록하거나 사용자 정보 response로 전송하는 작업
        log.error("⚠️ Authentication failed : {}", exception.getMessage());
        
        sendErrorResponse(response);
        
    }

    /**
     * 응답 싪패 보내는 메서드
     *
     * @param response
     * @throws IOException
     */
    private void sendErrorResponse(HttpServletResponse response) throws IOException {

        // JSON 형태로 응답 데이터를 생성
        Gson gson = new Gson();

        // 인증 실패에 대한 응답 데이터 ErrorResponse 객체로 생성
        ErrorResponse errorResponse = ErrorResponse.of(HttpStatus.UNAUTHORIZED);

        // 응답 헤더 설정
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setStatus(HttpStatus.UNAUTHORIZED.value());
        // 응답데이터 JSON 형태로 변환해서 클라이언트에 전송
        response.getWriter().write(gson.toJson(errorResponse, ErrorResponse.class));

    }
}
