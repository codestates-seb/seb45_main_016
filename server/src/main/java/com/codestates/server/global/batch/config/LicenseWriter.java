package com.codestates.server.global.batch.config;

import com.codestates.server.domain.license.licensedate.entity.License;
import com.codestates.server.domain.license.licensedate.repository.LicenseRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.item.ItemWriter;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Slf4j
@Configuration
@RequiredArgsConstructor
public class LicenseWriter implements ItemWriter<List<License>> {

    private final LicenseRepository licenseRepository;

    @Override
    public void write(List<? extends List<License>> items) throws Exception {
        log.info("licenseWriter실행");
        System.out.println("items:" +items);
        licenseRepository.deleteAll();

        for(List<License> item : items){
            licenseRepository.saveAll(item);
        }
    }
}