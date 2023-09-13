package com.codestates.server.global.batch.config;

import com.codestates.server.domain.license.licensedate.entity.LicenseDate;
import com.codestates.server.domain.license.licensedate.repository.LicenseDateRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.item.ItemWriter;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Slf4j
@Configuration
@RequiredArgsConstructor
public class LicenseWriter implements ItemWriter<List<LicenseDate>> {

    private final LicenseDateRepository licenseDateRepository;

    @Override
    public void write(List<? extends List<LicenseDate>> items) throws Exception {
        log.info("licenseWriter실행");
        System.out.println("items:" +items);
        licenseDateRepository.deleteAll();

        for(List<LicenseDate> item : items){
            licenseDateRepository.saveAll(item);
        }
    }
}