package com.codestates.server.domain.bookmark.controller;

import com.codestates.server.domain.bookmark.dto.BookmarkDto;
import com.codestates.server.domain.bookmark.entity.Bookmark;
import com.codestates.server.domain.bookmark.service.BookmarkService;
import com.codestates.server.domain.license.licenseinfo.entity.LicenseInfo;
import com.codestates.server.domain.license.service.LicenseService;
import com.codestates.server.domain.member.entity.Member;
import com.codestates.server.domain.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/bookmark")
@RequiredArgsConstructor
public class BookmarkController {

    private final MemberService memberService;
    private final LicenseService licenseService;
    private final BookmarkService bookmarkService;

    @PostMapping()
    public ResponseEntity postBookmark(@RequestBody BookmarkDto bookmarkDto){

        Member member = memberService.findMember(bookmarkDto.getMemberId());
        LicenseInfo licenseInfo = licenseService.findLicenseInfoByCode(bookmarkDto.getCode());

        bookmarkService.saveBookmark(member,licenseInfo);

        return new ResponseEntity(HttpStatus.ACCEPTED);
    }

    @DeleteMapping()
    public ResponseEntity deleteBookmark(@RequestBody BookmarkDto bookmarkDto){

        Member member = memberService.findMember(bookmarkDto.getMemberId());
        LicenseInfo licenseInfo = licenseService.findLicenseInfoByCode(bookmarkDto.getCode());

        bookmarkService.cancelBookmark(member,licenseInfo);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
