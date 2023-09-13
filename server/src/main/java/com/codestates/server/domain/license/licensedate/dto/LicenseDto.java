package com.codestates.server.domain.license.licensedate.dto;

import lombok.Data;
import java.util.List;

@Data
public class LicenseDto {
    public List<LicenseResponseDto> data;
}
