package com.codestates.server.global.security.response;

import com.codestates.server.global.exception.ExceptionCode;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;


import javax.validation.ConstraintViolation;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * HTTP 상태 코드, 에러 메시지, 필드 에러 목록 및 제약 위반 에러 목록 포함하는 응답 객체 생성
 */
@Getter
@AllArgsConstructor
public class ErrorResponse {
    private int status;
    private String message;
    private List<FieldError> fieldErrors;
    private List<ConstraintViolationError> violationErrors;

    public ErrorResponse(int status, String message) {
        this.status = status;
        this.message = message;
    }

    private ErrorResponse(final List<FieldError> fieldErrors,
                          final List<ConstraintViolationError> violationErrors) {
        this.fieldErrors = fieldErrors;
        this.violationErrors = violationErrors;
    }

    /**
     * BindingResult에서 ErrorResponse 객체 생성
     * @param bindingResult : 클라이언트 입력 데이터 처리하고 검증, 유효성 검사 및 에러 처리 수행
     *                      : binding 이란 HTTP 요청으로부터 전송된 데이터를 Java 객체로 변환하는 작업
     * @return
     */
    public static ErrorResponse of(BindingResult bindingResult) {
        return new ErrorResponse(FieldError.of(bindingResult), null);
    }

    // ConstrainViolation(제약 위반)에서 ErrorResponse 객체 생성
    public static ErrorResponse of(Set<ConstraintViolation<?>> violations) {
        return new ErrorResponse(null, ConstraintViolationError.of(violations));
    }

    // 예외 코드로 ErrorReponse 객체 생성
    public static ErrorResponse of(ExceptionCode exceptionCode) {
        return new ErrorResponse(exceptionCode.getStatus(), exceptionCode.getMessage());
    }

    // 상태 코드, 기본 메세지로 ErrorReponse 객체 생성
    public static ErrorResponse of(HttpStatus httpStatus) {
        return new ErrorResponse(httpStatus.value(), httpStatus.getReasonPhrase());
    }

    // 상태코드, 메세지로 ErrorReponse 객체 생성
    public static ErrorResponse of(HttpStatus httpStatus, String message) {
        return new ErrorResponse(httpStatus.value(), message);
    }

    @Getter
    @AllArgsConstructor
    public static class FieldError {

        private String field; // 에러 발생필드
        private Object rejectedValue; // 거부된 값
        private String reason;  // 에러 발생 이유

        // BindingResult에서 FieldError 객체 목록 생성하는 정적 메서드
        // 정적 메서드로 사용하면 독립적 사용이 유용하기 때문에 어디서든 기능 사용 가능
        public static List<FieldError> of(BindingResult bindingResult) {
            // BindingResult 객체에서 필드 에러 정보 추출
            final List<org.springframework.validation.FieldError> fieldErrors =
                    bindingResult.getFieldErrors();

            // 추출 정보로 FieldError 객체 목록 작성
            return fieldErrors.stream()
                    .map(error -> new FieldError(
                            error.getField(),
                            error.getRejectedValue() == null ?
                                    "" : error.getRejectedValue().toString(),
                            error.getDefaultMessage()))
                    .collect(Collectors.toList());
        }
    }

    // 제약위반 나타내는 클래스
    @Getter
    @AllArgsConstructor
    public static class ConstraintViolationError {

        private String propertyPath;    // 제약위반 에러 일어난 경로
        private Object rejectedValue;   // 거부된 값
        private String reason;  // 에러 발생 이유

        // ConstraintViolation에서 ConstrainViolationError 객체 목록 생성
        public static List<ConstraintViolationError> of(
                Set<ConstraintViolation<?>> constraintViolations) {

            // ConstraintViolation 객체 목록에서 제약 위반 에러 정보 추출
            return constraintViolations.stream()
                    .map(constraintViolation -> new ConstraintViolationError(
                            constraintViolation.getPropertyPath().toString(),
                            constraintViolation.getInvalidValue().toString(),
                            constraintViolation.getMessage()
                    )).collect(Collectors.toList());
        }
    }
}