package com.codestates.server.domain.license.licensedate.dto;

import lombok.Data;
import java.util.List;

@Data
public class LicenseTop5Dto {
    public List<LicenseResponseDto> data;
}
