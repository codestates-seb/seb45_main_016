package com.codestates.server.domain.license.licenseinfo.dto;

import com.codestates.server.domain.license.licenseinfo.entity.LicenseInfo;
import lombok.Data;

@Data
public class CsvDto {
    private Long code;
    private String name;

    /**
     * License 엔티티 반환 시키기 (to entity)
     * @return License
     */
    public LicenseInfo toEntity(){
        return LicenseInfo.builder()
                .code(this.code)
                .name(this.name)
                .markCount(0L)
                .build();
    }
}
