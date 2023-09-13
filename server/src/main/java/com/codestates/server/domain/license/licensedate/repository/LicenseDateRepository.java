package com.codestates.server.domain.license.licensedate.repository;

import com.codestates.server.domain.license.licensedate.entity.LicenseDate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LicenseDateRepository extends JpaRepository<LicenseDate, Long> {
    //필요한부분 구현 필요.
//    public List<License> findAllByName(String name);

}
