package com.codestates.server.domain.license.repository;

import com.codestates.server.domain.license.entity.License;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LicenseRepository extends JpaRepository<License, Long> {
    //필요한부분 구현 필요.
}
