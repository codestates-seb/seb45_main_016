package com.codestates.server.domain.license.licensedate.dto;

import com.codestates.server.domain.license.licensedate.entity.LicenseDate;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@AllArgsConstructor
public class LicenseResponseDto {

    private Long code;

    private String name;

    private List<LicenseDate> info;
}
