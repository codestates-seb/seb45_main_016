package com.codestates.server.domain.bookmark.service;

import com.codestates.server.domain.bookmark.entity.Bookmark;
import com.codestates.server.domain.bookmark.repository.BookmarkRepository;
import com.codestates.server.domain.license.licenseinfo.entity.LicenseInfo;
import com.codestates.server.domain.license.licenseinfo.repository.LicenseInfoRepository;
import com.codestates.server.domain.member.entity.Member;
import com.codestates.server.global.exception.BusinessLogicException;
import com.codestates.server.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.InvalidDataAccessApiUsageException;
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

        if(bookmarkRepository.existsBookmarkByLicenseInfoAndMember(licenseInfo, member)){
            throw new BusinessLogicException(ExceptionCode.BOOKMARK_EXISTS); //bookmark가 존재하면 에러 발생
        }else {
            licenseInfoRepository.save(licenseInfo);
            bookmarkRepository.save(bookmark);
        }
    }


    public void cancelBookmark(Member member, LicenseInfo licenseInfo){

        try {
            Bookmark bookmark = bookmarkRepository.findBookmarkByLicenseInfoAndMember(licenseInfo, member);
            licenseInfo.setMarkCount(licenseInfo.getMarkCount()-1);

            licenseInfoRepository.save(licenseInfo);
            bookmarkRepository.delete(bookmark);

        } catch (InvalidDataAccessApiUsageException e){
            throw new BusinessLogicException(ExceptionCode.BOOKMARK_NOT_FOUND);
        }

    }

    public boolean existsBookmarkByLicenseInfoAndMember(LicenseInfo licenseInfo,Member member){

        try{
            return bookmarkRepository.existsBookmarkByLicenseInfoAndMember(licenseInfo, member);

        }catch (RuntimeException e){  // true/false return 이라 필요 없음.
            throw new BusinessLogicException(ExceptionCode.BOOKMARK_NOT_FOUND);
        }
    }
}
