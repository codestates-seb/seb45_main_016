package com.codestates.server.domain.license.licensedate.mapper;

import com.codestates.server.domain.license.licensedate.dto.LicenseResponseDto;
import com.codestates.server.domain.license.licensedate.entity.LicenseDate;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface LicenseDateMapper {
    default LicenseResponseDto licensesToLicenseResponseDto(List<LicenseDate> licenses){
        String name = "";
        Long code = 0L;
//        for (License license : licenses){
//            name = license.getName();
//        }

        return new LicenseResponseDto(code ,name, licenses);
    }
}
