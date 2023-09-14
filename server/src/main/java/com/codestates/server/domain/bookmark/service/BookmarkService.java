package com.codestates.server.domain.bookmark.service;

import com.codestates.server.domain.bookmark.entity.Bookmark;
import com.codestates.server.domain.bookmark.repository.BookmarkRepository;
import com.codestates.server.domain.license.licenseinfo.entity.LicenseInfo;
import com.codestates.server.domain.license.licenseinfo.repository.LicenseInfoRepository;
import com.codestates.server.domain.member.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BookmarkService {

    private final BookmarkRepository bookmarkRepository;
    private final LicenseInfoRepository licenseInfoRepository;

    public void saveBookmark(Member member, LicenseInfo licenseInfo){

        Bookmark bookmark = Bookmark.builder()
                .licenseInfo(licenseInfo)
                .member(member)
                .build();

        licenseInfo.setMarkCount(licenseInfo.getMarkCount()+1);

        if(bookmarkRepository.existsBookmarkByLicenseInfoAndMember(licenseInfo, member)){ //존재하면 리턴함.
            return;
        }else {
            licenseInfoRepository.save(licenseInfo);
            bookmarkRepository.save(bookmark);
        }
    }


    public void cancelBookmark(Member member, LicenseInfo licenseInfo){

        Bookmark bookmark = bookmarkRepository.findBookmarkByLicenseInfoAndMember(licenseInfo, member);
        licenseInfo.setMarkCount(licenseInfo.getMarkCount()-1);

        licenseInfoRepository.save(licenseInfo);
        bookmarkRepository.delete(bookmark);
    }

    public boolean existsBookmarkByLicenseInfoAndMember(LicenseInfo licenseInfo,Member member){

        boolean bool = bookmarkRepository.existsBookmarkByLicenseInfoAndMember(licenseInfo, member);

        return bool;
    }
}
