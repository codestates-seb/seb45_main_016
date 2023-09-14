package com.codestates.server.global.batch.config;

import com.codestates.server.domain.license.licensedate.repository.LicenseDateRepository;
import com.codestates.server.domain.license.licenseinfo.entity.LicenseInfo;
import com.codestates.server.domain.license.licenseinfo.repository.LicenseInfoRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.item.ItemReader;
import org.springframework.context.annotation.Configuration;

import java.util.Iterator;

@Slf4j
@Configuration
@RequiredArgsConstructor
public class LicenseReader implements ItemReader<LicenseInfo> {

    private final LicenseDateRepository licenseDateRepository;
    private final LicenseInfoRepository licenseInfoRepository;

    private Iterator<LicenseInfo> licenseIterator;

    @Override
    public LicenseInfo read() {
        if (licenseIterator == null) {
            licenseIterator = licenseInfoRepository.findAll().iterator();
        }

        return licenseIterator.hasNext() ? licenseIterator.next() : null;
    }
}
