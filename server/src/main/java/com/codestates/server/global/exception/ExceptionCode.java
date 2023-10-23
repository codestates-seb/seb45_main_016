package com.codestates.server.global.exception;

import lombok.Getter;

public enum ExceptionCode {
    //User not in database
    USER_NOT_FOUND(404, "User not found"),
    //User exists
    USER_EXISTS(409, "User exists"),
    //Unauthorized user
    UNAUTHORIZED_USER(401, "Unauthorized user"),
    // answer not in database
    ANSWER_NOT_FOUND(404, "Answer not found"),
    // comment not in database
    COMMENT_NOT_FOUND(404, "Comment not found"),
    // Board not in database
    BOARD_NOT_FOUND(404, "Board not found"),
    //Bookmark exists
    BOOKMARK_EXISTS(409, "bookmark exists"),
    //Bookmark Not in database
    BOOKMARK_NOT_FOUND(404,"Bookmark not found"),
    //LicenseInfo Not in database
    LICENSE_NOT_FOUND(404,"License not found"),
    // kakako 로부터 유효한 정보 받지 못함
    UNAUTHORIZED_KAKAO(401, "카카오로부터 유효한 사용자 정보를 받지 못했습니다."),
    // 이메일이 없는 사용자는 가입할 수 없습니다.
    UNAUTHORIZED_EMAIL_KAKAO(401, "이메일이 없는 사용자는 가입할 수 없습니다.");


    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}