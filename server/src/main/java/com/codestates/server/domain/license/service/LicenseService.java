package com.codestates.server.domain.license.service;

import com.codestates.server.domain.license.entity.License;
import com.codestates.server.domain.license.repository.LicenseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LicenseService {

    private final LicenseRepository licenseRepository;

    public List<License> findLicense(String name){

        List<License> license = licenseRepository.findAllByName(name);
        if(license.isEmpty()){
            throw new RuntimeException("암것도없어"); //에러처리필요. 에러코드 생성해줘야해여
        }
        return license;
    }

    /**
     * 페이지네이션 처리가 된 자격증 정보 목록을 리턴
     * @param page
     * @param size
     * @return
     */
    public Page<License> findLicenses(int page, int size) {
        return licenseRepository.findAll(PageRequest.of(page-1, size, Sort.by("id").ascending()));
    }
}
