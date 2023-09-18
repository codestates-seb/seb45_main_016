package com.codestates.server.domain.board.dto;

import com.codestates.server.domain.license.licensedate.dto.LicenseDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class BoardLicenseDto {

    LicenseDto licenses;
    List<BoardPageResponse> boards;
}
