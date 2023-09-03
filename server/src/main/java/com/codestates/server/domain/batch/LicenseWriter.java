package com.codestates.server.domain.batch;

import com.codestates.server.domain.license.entity.License;
import com.codestates.server.domain.license.repository.LicenseRepository;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.batch.item.ItemWriter;
import org.springframework.batch.item.database.JpaItemWriter;
import org.springframework.context.annotation.Configuration;

import java.util.ArrayList;
import java.util.List;

@Configuration
@RequiredArgsConstructor
public class LicenseWriter implements ItemWriter<License> {

    private final LicenseRepository licenseRepository;

    @Override
    public void write(List<? extends License> items) throws Exception {

        items.forEach(x -> System.out.println(x));
        licenseRepository.saveAll(items);
    }
}