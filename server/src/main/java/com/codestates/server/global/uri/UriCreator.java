package com.codestates.server.global.uri;

import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

public class UriCreator {
    // URI 를 만드는 createUri 메서드
    public static URI createUri(String defaultUri, Long resourceId) {
        return UriComponentsBuilder
                .newInstance()
                .path(defaultUri + "/{resourceId}")// URI 경로 설정, resourceId 변수에는 값을 대체
                .buildAndExpand(resourceId) // 경로 변수를 실제 값으로 대체해서 URI 생성
                .toUri(); // 최종 URI로 변환하여 반환
    }
}
