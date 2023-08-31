package com.codestates.server.global.dto;

import lombok.Getter;
import org.springframework.data.domain.Page;


import java.util.List;

@Getter
public class MultiResponseDto<T> {

    private List<T> data;   // 응답 데이터 목록 담는 필드
    private PageInfo pageInfo;  // 페이지 정보 담는 필드

    public MultiResponseDto(List<T> data, Page page) {

        this.data = data;

        // 페이지 번호 0부터 시작하기 때문에 1부터 시작하는 걸로 변경
        this.pageInfo = new PageInfo(page.getNumber() + 1,
                page.getSize(), page.getTotalElements(), page.getTotalPages());

    }
}
