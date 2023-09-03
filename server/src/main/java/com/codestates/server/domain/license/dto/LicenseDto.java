package com.codestates.server.domain.license.dto;

import com.codestates.server.domain.license.entity.License;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.List;

@Data
public class LicenseDto {

    List<License> licenseList;
}
