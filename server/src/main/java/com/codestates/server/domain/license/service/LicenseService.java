package com.codestates.server.domain.license.service;

import com.codestates.server.domain.license.entity.License;
import com.codestates.server.domain.license.repository.LicenseRepository;
import lombok.RequiredArgsConstructor;
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


}
