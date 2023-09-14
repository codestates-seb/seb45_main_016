package com.codestates.server.domain.license.service;

import com.codestates.server.domain.license.licensedate.dto.LicenseDto;
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

    public LicenseInfo findLicenseInfoByCode(Long code){
        LicenseInfo licenseInfo = licenseInfoRepository.findById(code).orElseThrow();

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

    public List<LicenseInfo> findTop5LicenseInfoList(){
        List<LicenseInfo> licenseInfos = licenseInfoRepository.findTop5ByOrderByMarkCountDesc();
        return licenseInfos;
    }

    public LicenseDto findLicenseDateList(List<LicenseInfo> licenseInfos){

        LicenseDto licenseDto = new LicenseDto();
        List<LicenseResponseDto> licenseResponseDtos = new ArrayList<>();

        for(LicenseInfo licenseInfo : licenseInfos){
            List<LicenseDate> licenseDates = licenseDateRepository.findAllByLicenseInfo(licenseInfo);
            LicenseResponseDto licenseResponseDto = new LicenseResponseDto(licenseInfo.getCode(), licenseInfo.getName(), licenseDates);
            licenseResponseDtos.add(licenseResponseDto);
        }
        licenseDto.setData(licenseResponseDtos);

        return licenseDto;
    }

/**
 * 이렇게 페이지네이션하는건 적용 불가능
 * @param page
 * @param size
 */
//    public Page<LicenseDate> findLicenses(int page, int size) {
//        return licenseDateRepository.findAll(PageRequest.of(page-1, size, Sort.by("id").ascending()));
//    }

    /**
     * 페이지네이션 처리가 된 자격증 정보 목록을 리턴
     * @param page , size는 9로 고정
     * @return
     */
    public Page<LicenseInfo> findLicenses(int page){
        int size = 9;
        Page<LicenseInfo> licenseInfoPage = licenseInfoRepository.findAll(PageRequest.of(page - 1, size, Sort.by("name").ascending()));

        return licenseInfoPage;
    }
}
