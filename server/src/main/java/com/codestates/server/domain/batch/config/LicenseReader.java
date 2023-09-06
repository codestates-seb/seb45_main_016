package com.codestates.server.domain.batch.config;

import com.codestates.server.domain.batch.mapper.LicenseToLicenseDtoMapper;
import com.codestates.server.domain.license.dto.LicenseDto;
import com.codestates.server.domain.license.entity.License;
import com.codestates.server.domain.license.repository.LicenseRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.item.ItemReader;
import org.springframework.batch.item.NonTransientResourceException;
import org.springframework.batch.item.ParseException;
import org.springframework.batch.item.UnexpectedInputException;
import org.springframework.batch.item.file.FlatFileItemReader;
import org.springframework.batch.item.support.ListItemReader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.Iterator;
import java.util.List;
import java.util.stream.Collectors;

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
