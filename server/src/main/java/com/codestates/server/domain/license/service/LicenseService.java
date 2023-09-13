package com.codestates.server.domain.license.service;

import com.codestates.server.domain.license.licensedate.dto.LicenseTop5Dto;
import com.codestates.server.domain.license.licensedate.dto.LicenseResponseDto;
import com.codestates.server.domain.license.licensedate.entity.LicenseDate;
import com.codestates.server.domain.license.licensedate.repository.LicenseDateRepository;
import com.codestates.server.domain.license.licenseinfo.entity.LicenseInfo;
import com.codestates.server.domain.license.licenseinfo.repository.LicenseInfoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class LicenseService {

    private final LicenseDateRepository licenseDateRepository;
    private final LicenseInfoRepository licenseInfoRepository;


    /**
     * licenseinfo를 자격증 이름으로 조회한다.
     * @param name
     * @return
     */
    public LicenseInfo findLicenseInfo(String name){
//
        LicenseInfo licenseInfo = licenseInfoRepository.findByName(name);

        return licenseInfo;
    }

    /**
     * licenseDate를 licenseinfo로 조회한다.
     * @param licenseInfo
     * @return
     */
    public List<LicenseDate> findLicenseDateToLicenseInfo(LicenseInfo licenseInfo){
        List<LicenseDate> licenseDates = licenseDateRepository.findAllByLicenseInfo(licenseInfo);

        if(licenseDates.isEmpty()){
            throw new RuntimeException("정보가 없습니다~?");
        }

        return licenseDates;
    }

    public List<LicenseInfo> findTop5LicenseInfo(){
        List<LicenseInfo> licenseInfos = licenseInfoRepository.findTop5ByOrderByMarkCountDesc();
        return licenseInfos;
    }

    public LicenseTop5Dto findTop5LicenseDate(List<LicenseInfo> licenseInfos){

        LicenseTop5Dto licenseTop5Dto = new LicenseTop5Dto();
        List<LicenseResponseDto> licenseResponseDtos = new ArrayList<>();

        for(LicenseInfo licenseInfo : licenseInfos){
            List<LicenseDate> licenseDates = licenseDateRepository.findAllByLicenseInfo(licenseInfo);
            LicenseResponseDto licenseResponseDto = new LicenseResponseDto(licenseInfo.getCode(), licenseInfo.getName(), licenseDates);
            licenseResponseDtos.add(licenseResponseDto);
        }
        licenseTop5Dto.setData(licenseResponseDtos);

        return licenseTop5Dto;
    }

    /**
     * 페이지네이션 처리가 된 자격증 정보 목록을 리턴
     * @param page
     * @param size
     * @return
     */
    public Page<LicenseDate> findLicenses(int page, int size) {
        return licenseDateRepository.findAll(PageRequest.of(page-1, size, Sort.by("id").ascending()));
    }
}
