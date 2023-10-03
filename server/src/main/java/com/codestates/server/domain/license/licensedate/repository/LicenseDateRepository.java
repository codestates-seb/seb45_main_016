package com.codestates.server.domain.license.licensedate.repository;

import com.codestates.server.domain.license.licensedate.entity.LicenseDate;
import com.codestates.server.domain.license.licenseinfo.entity.LicenseInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LicenseDateRepository extends JpaRepository<LicenseDate, Long> {
    //필요한부분 구현 필요.
//    public List<License> findAllByName(String name);

    /**
     * licenseInfo로 조회
     * @param licenseInfo
     * @return
     */
    public List<LicenseDate> findAllByLicenseInfo(LicenseInfo licenseInfo);
}
