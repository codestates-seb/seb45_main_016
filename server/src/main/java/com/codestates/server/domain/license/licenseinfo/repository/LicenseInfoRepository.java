package com.codestates.server.domain.license.licenseinfo.repository;

import com.codestates.server.domain.license.licenseinfo.entity.LicenseInfo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LicenseInfoRepository extends JpaRepository<LicenseInfo,Long> {

    /**
     * 이름으로 LicenseInfo 조회
     * @param name
     * @return
     */
    public LicenseInfo findByName(String name);

    /**
     * 북마크수 기준으로 상위 5개를 뽑아낸다.
     * @return
     */
    public List<LicenseInfo> findTop5ByOrderByMarkCountDesc();

    public List<LicenseInfo> findByNameContaining(String keyword);

}
