package com.codestates.server.domain.license.licensedate.repository;

import com.codestates.server.domain.license.licensedate.entity.License;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LicenseRepository extends JpaRepository<License, Long> {
    //필요한부분 구현 필요.
//    public List<License> findAllByName(String name);

}
