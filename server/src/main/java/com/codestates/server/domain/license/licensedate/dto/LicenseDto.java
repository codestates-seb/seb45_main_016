package com.codestates.server.domain.license.licensedate.dto;

import com.codestates.server.domain.license.licensedate.entity.License;
import lombok.Data;
import java.util.List;

@Data
public class LicenseDto {

    List<License> licenseList;
}
