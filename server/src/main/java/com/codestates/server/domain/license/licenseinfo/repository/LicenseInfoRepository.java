package com.codestates.server.domain.license.licenseinfo.repository;

import com.codestates.server.domain.license.licensedate.repository.LicenseRepository;
import com.codestates.server.domain.license.licenseinfo.entity.LicenseInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LicenseInfoRepository extends JpaRepository<LicenseInfo,Long> {
    //구현필요
}
