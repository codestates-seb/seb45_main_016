package com.codestates.server.domain.license.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/licenses")
public class LicenseController {

    @GetMapping
    public String getLicenses(){

        return "페이지네이션 적용";
    }

    @GetMapping("/{license-id}")
    public String getLicense(@PathVariable("license-id") String licenseId) {

        return "getLicense id";
    }

}
