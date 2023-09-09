package com.codestates.server.domain.license.controller;

import com.codestates.server.domain.license.dto.LicenseResponseDto;
import com.codestates.server.domain.license.entity.License;
import com.codestates.server.domain.license.mapper.LicenseMapper;
import com.codestates.server.domain.license.service.LicenseService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/licenses")
@AllArgsConstructor
public class LicenseController {

    private final LicenseService licenseService;
    private final LicenseMapper licenseMapper;

    @GetMapping
    public String getLicenses(){

        return "페이지네이션 적용";
    }

    @GetMapping("/find")
    public ResponseEntity<LicenseResponseDto> getLicense(@RequestParam("name") String name) {

        List<License> licenses = licenseService.findLicense(name);

        return new ResponseEntity<>(licenseMapper.licenseToLicenseResponseDto(licenses),HttpStatus.OK);
    }

}
