package com.codestates.server.domain.license.controller;

import com.codestates.server.domain.bookmark.service.BookmarkService;
import com.codestates.server.domain.license.licensedate.dto.LicenseDto;
import com.codestates.server.domain.license.licensedate.dto.LicenseGetDto;
import com.codestates.server.domain.license.licensedate.dto.LicenseResponseDto;
import com.codestates.server.domain.license.licensedate.entity.LicenseDate;
import com.codestates.server.domain.license.licensedate.mapper.LicenseDateMapper;
import com.codestates.server.domain.license.licenseinfo.entity.LicenseInfo;
import com.codestates.server.domain.license.service.LicenseService;
import com.codestates.server.domain.member.entity.Member;
import com.codestates.server.domain.member.service.MemberService;
import com.codestates.server.global.dto.MultiResponseDto;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Slf4j
@RestController
@RequestMapping("/licenses")
@AllArgsConstructor
public class LicenseController {

    private final LicenseService licenseService;
    private final LicenseDateMapper licenseDateMapper;
    private final BookmarkService bookmarkService;
    private final MemberService memberService;

    //memberId가 있으면 태그 가능. 없으면 불가능.

    /**
     * 스프링에서는 기본적으로 페이지 번호를 0부터 시작한다. -> 이를 위해서 controller쪽에서 page-1 을 해서 올바른 번호를 조회할수있게 해줌.
     * @param page : 페이지네이션을 위한 페이지 번호
     * @param /size : 한 페이지에 표시되어야 할 데이터 개수(row) - 9개로 고정
     * @return
     */
    @GetMapping
    public ResponseEntity getLicenses(@RequestParam int page,
                                      @RequestBody(required = false)Optional<Map<String,Long>> body){

        Page<LicenseInfo> pageLicenses = licenseService.findLicenses(page);
        List<LicenseInfo> licenses = pageLicenses.getContent();

        LicenseDto licenseList = licenseService.findLicenseDateList(licenses,
                body.isPresent() ? body.get().get("memberId") : 0L);

        return new ResponseEntity<>(
                new MultiResponseDto<>(licenseList.getData(),pageLicenses),HttpStatus.OK
        );
    }


    @GetMapping("/top5")
    public ResponseEntity<LicenseDto> getLicenseTop5(@RequestBody(required = false)Optional<Map<String,Long>> body){
        List<LicenseInfo> top5LicenseInfo = licenseService.findTop5LicenseInfoList();
        LicenseDto top5License = licenseService.findLicenseDateList(top5LicenseInfo,
                body.isPresent() ? body.get().get("memberId") : 0L);

        return new ResponseEntity<>(top5License,HttpStatus.OK);
    }


    @GetMapping("/find")
    public ResponseEntity<LicenseResponseDto> getLicense(@RequestParam("name") String name,
                                                         @RequestBody LicenseGetDto licenseGetDto) {

        LicenseInfo licenseInfo = licenseService.findLicenseInfo(name);
        List<LicenseDate> licenseDates = licenseService.findLicenseDateToLicenseInfo(licenseInfo);

        Member member = memberService.getMember(licenseGetDto.getMemberId());
        boolean bool = bookmarkService.existsBookmarkByLicenseInfoAndMember(licenseInfo, member);

        return new ResponseEntity<>(licenseDateMapper.licensesToLicenseResponseDto(licenseDates,licenseInfo, bool),HttpStatus.OK);
    }

}
