package com.codestates.server.domain.license.dto;

import com.codestates.server.domain.license.entity.License;
import lombok.Data;
import java.util.List;

@Data
public class LicenseDto {

    List<License> licenseList;
}
