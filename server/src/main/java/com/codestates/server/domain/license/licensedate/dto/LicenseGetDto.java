package com.codestates.server.domain.license.licensedate.dto;

import io.micrometer.core.lang.Nullable;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LicenseGetDto {
    @Nullable
    Long memberId;
}
