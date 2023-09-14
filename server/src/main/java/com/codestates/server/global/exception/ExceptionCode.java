package com.codestates.server.global.exception;

import lombok.Getter;

public enum ExceptionCode {
    USER_NOT_FOUND(404, "User not found"),
    //User not in database
    USER_EXISTS(409, "User exists"),
    //User exists
    UNAUTHORIZED_USER(403, "Unauthorized user"),
    //Unauthorized user
    PASSWORD_NOT_MATCH(404, "Password does not match"),
    //Password wrong
    COMMENT_NOT_FOUND(404, "Reply not found"),


    /**
     * hae02y 필요 코드 작성
     */
    //Bookmark exists
    BOOKMARK_EXISTS(409, "bookmark exists"),
    //Bookmark Not in database
    BOOKMARK_NOT_FOUND(404,"Bookmark not found"),
    //LicenseInfo Not in database
    LICENSE_NOT_FOUND(404,"License not found");


    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}