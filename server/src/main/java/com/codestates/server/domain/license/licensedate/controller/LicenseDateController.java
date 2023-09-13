package com.codestates.server.domain.license.licensedate.controller;

import com.codestates.server.domain.license.licensedate.dto.LicenseResponseDto;
import com.codestates.server.domain.license.licensedate.entity.LicenseDate;
import com.codestates.server.domain.license.licensedate.mapper.LicenseDateMapper;
import com.codestates.server.domain.license.licensedate.service.LicenseDateService;
import com.codestates.server.global.dto.MultiResponseDto;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/licenses")
@AllArgsConstructor
public class LicenseDateController {

    private final LicenseDateService licenseDateService;
    private final LicenseDateMapper licenseDateMapper;

    /**
     * 스프링에서는 기본적으로 페이지 번호를 0부터 시작한다. -> 이를 위해서 controller쪽에서 page-1 을 해서 올바른 번호를 조회할수있게 해줌.
     * @param page : 페이지네이션을 위한 페이지 번호
     * @param size : 한 페이지에 표시되어야 할 데이터 개수(row)
     * @return
     */
    @GetMapping
    public ResponseEntity getLicenses(@RequestParam int page,
                              @RequestParam int size){
        Page<LicenseDate> pageLicenses = licenseDateService.findLicenses(page, size);
        List<LicenseDate> licenses = pageLicenses.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(licenses,pageLicenses),HttpStatus.OK
        );
    }


    @GetMapping("/find")
    public ResponseEntity<LicenseResponseDto> getLicense(@RequestParam("name") String name) {

        List<LicenseDate> licenses = licenseDateService.findLicense();

        return new ResponseEntity<>(licenseDateMapper.licensesToLicenseResponseDto(licenses),HttpStatus.OK);
    }

}
