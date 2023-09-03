package com.codestates.server.domain.batch;

import com.codestates.server.domain.license.entity.License;
import com.codestates.server.domain.license.repository.LicenseRepository;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.item.ItemWriter;
import org.springframework.batch.item.database.JpaItemWriter;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Configuration
@RequiredArgsConstructor
public class LicenseWriter implements ItemWriter<License> {

    private final LicenseRepository licenseRepository;

    @Override
    public void write(List<? extends License> items) throws Exception {

        log.info("licenseWriter실행");
        System.out.println("items:" +items);
        licenseRepository.deleteAll();
        licenseRepository.saveAll(items);
    }
}