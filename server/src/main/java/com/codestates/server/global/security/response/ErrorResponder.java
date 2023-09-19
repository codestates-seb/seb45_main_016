package com.codestates.server.global.security.response;

import com.google.gson.Gson;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * ErrorResponse 를 출력 스트림으로 생성하는 ErrorResponder 클래스
 */
public class ErrorResponder {

    public static void sendErrorResponse(HttpServletResponse response,
                                         HttpStatus status) throws IOException {

        Gson gson = new Gson();
        ErrorResponse errorResponse = ErrorResponse.of(status);

        // JSON 응답을 위한 콘텐츠 타입 및 상태코드 설정
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setStatus(status.value());

        // ErrorResponse 객체를 JSON 형식으로 변환하여 응답에 쓰기
        response.getWriter().write(gson.toJson(errorResponse, ErrorResponse.class));
    }

}
