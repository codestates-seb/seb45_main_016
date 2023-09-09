package com.codestates.server.domain.license.mapper;

import com.codestates.server.domain.license.dto.LicenseDto;
import com.codestates.server.domain.license.dto.LicenseResponseDto;
import com.codestates.server.domain.license.entity.License;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

import java.util.List;

@Mapper(componentModel = "spring")
public interface LicenseMapper {
    default LicenseResponseDto licenseToLicenseResponseDto(List<License> licenses){
        String name = "";

        for (License license : licenses){
            name = license.getName();
        }

        return new LicenseResponseDto(name,licenses);
    }
}
