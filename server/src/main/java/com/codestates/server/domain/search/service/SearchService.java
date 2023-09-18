package com.codestates.server.domain.search.service;

import com.codestates.server.domain.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SearchService {

    private final MemberService memberService;



}
