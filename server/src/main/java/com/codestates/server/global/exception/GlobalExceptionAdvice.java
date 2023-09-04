package com.codestates.server.global.exception;

import com.codestates.server.global.response.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

//추후 상황봐서 추가예정.
@RestControllerAdvice
public class GlobalExceptionAdvice {
    @ExceptionHandler
    // BusinessLogicException 처리
    public ResponseEntity handleBusinessLogicException(BusinessLogicException e) {
        final ErrorResponse response = ErrorResponse.of(e.getExceptionCode());

        return new ResponseEntity(response, HttpStatus.valueOf(e.getExceptionCode().getStatus()));
    }
}