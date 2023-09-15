package com.codestates.server.domain.license.licensedate.mapper;

import com.codestates.server.domain.license.licensedate.dto.LicenseResponseDto;
import com.codestates.server.domain.license.licensedate.entity.LicenseDate;
import com.codestates.server.domain.license.licenseinfo.entity.LicenseInfo;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface LicenseDateMapper {
    default LicenseResponseDto licensesToLicenseResponseDto(List<LicenseDate> licenseDates, LicenseInfo licenseInfo, Boolean bool){
        String name = licenseInfo.getName();
        Long code = licenseInfo.getCode();

        return new LicenseResponseDto(code ,name, bool,licenseDates);
    }
}
