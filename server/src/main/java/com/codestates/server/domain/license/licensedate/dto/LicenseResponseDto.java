package com.codestates.server.domain.license.licensedate.dto;

import com.codestates.server.domain.license.licensedate.entity.License;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@AllArgsConstructor
public class LicenseResponseDto {

    private String name;

    private List<License> info;
}