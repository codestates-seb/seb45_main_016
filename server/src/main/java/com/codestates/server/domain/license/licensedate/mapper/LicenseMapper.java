package com.codestates.server.domain.license.licensedate.mapper;

import com.codestates.server.domain.license.licensedate.dto.LicenseResponseDto;
import com.codestates.server.domain.license.licensedate.entity.License;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface LicenseMapper {
    default LicenseResponseDto licenseToLicenseResponseDto(List<License> licenses){
        String name = "";

//        for (License license : licenses){
//            name = license.getName();
//        }

        return new LicenseResponseDto(name,licenses);
    }
}
