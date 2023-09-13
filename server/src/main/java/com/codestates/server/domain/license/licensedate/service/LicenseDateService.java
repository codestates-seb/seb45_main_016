package com.codestates.server.domain.license.licensedate.service;

import com.codestates.server.domain.license.licensedate.entity.LicenseDate;
import com.codestates.server.domain.license.licensedate.repository.LicenseDateRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LicenseDateService {

    private final LicenseDateRepository licenseDateRepository;

    public List<LicenseDate> findLicense(){
//
        List<LicenseDate> licenseDate = licenseDateRepository.findAll();
//        if(license.isEmpty()){
//            throw new RuntimeException("암것도없어"); //에러처리필요. 에러코드 생성해줘야해여
//        }
        return licenseDate;
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
