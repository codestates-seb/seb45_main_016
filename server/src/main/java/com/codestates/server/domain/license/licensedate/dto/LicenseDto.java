package com.codestates.server.domain.license.licensedate.dto;

import com.codestates.server.domain.license.licensedate.entity.LicenseDate;
import lombok.Data;
import java.util.List;

@Data
public class LicenseDto {

    List<LicenseDate> licenseDateList;
}
