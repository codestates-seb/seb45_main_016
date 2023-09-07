package com.codestates.server.global.batch.config;

import com.codestates.server.domain.license.entity.License;
import com.codestates.server.domain.license.repository.LicenseRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.item.ItemReader;
import org.springframework.context.annotation.Configuration;

import java.util.Iterator;

@Slf4j
@Configuration
@RequiredArgsConstructor
public class LicenseReader implements ItemReader<License> {

    private final LicenseRepository licenseRepository;

    private Iterator<License> licenseIterator;

    @Override
    public License read() {
        if (licenseIterator == null) {
            licenseIterator = licenseRepository.findAll().iterator();
        }

        return licenseIterator.hasNext() ? licenseIterator.next() : null;
    }
}
