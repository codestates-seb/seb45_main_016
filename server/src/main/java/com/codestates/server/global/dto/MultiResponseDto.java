package com.codestates.server.global.dto;

import com.codestates.server.member.dto.MemberResponseDto;
import com.codestates.server.member.entity.Member;
import lombok.Getter;
import org.springframework.data.domain.Page;


import java.util.List;

@Getter
public class MultiResponseDto<T> {

    private List<T> data;
    private PageInfo pageInfo;
    public MultiResponseDto(List<T> data, Page page) {

        this.data = data;

        this.pageInfo = new PageInfo(page.getNumber() + 1,
                page.getSize(), page.getTotalElements(), page.getTotalPages());

    }
}
