package com.codestates.server.domain.bookmark.repository;

import com.codestates.server.domain.bookmark.entity.Bookmark;
import com.codestates.server.domain.license.licenseinfo.entity.LicenseInfo;
import com.codestates.server.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {

    public boolean existsBookmarkByLicenseInfoAndMember(LicenseInfo licenseInfo, Member member);

    public Bookmark findBookmarkByLicenseInfoAndMember(LicenseInfo licenseInfo, Member member);

}
