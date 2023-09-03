package com.codestates.server.domain.batch;

import com.codestates.server.domain.batch.mapper.LicenseToLicenseDtoMapper;
import com.codestates.server.domain.license.dto.LicenseDto;
import com.codestates.server.domain.license.entity.License;
import com.codestates.server.domain.license.repository.LicenseRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.item.ItemReader;
import org.springframework.batch.item.file.FlatFileItemReader;
import org.springframework.batch.item.support.ListItemReader;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Configuration
@RequiredArgsConstructor
public class LicenseReader {

    private final LicenseRepository licenseRepository;

    @Bean
    public ListItemReader<License> itemRead() throws IOException {

        LicenseDto licenseDto = new LicenseDto();
        List<License> licenses = licenseRepository.findAll();


        List<String> jsonList = licenses.stream().map(x -> {
            try {
                return new LicenseApi().callApiToString(x.getCode());
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }).collect(Collectors.toList());

        List<License> licenseList = jsonList.stream().map(x -> {
            try {
                return new JsonParser().StringToLicense(x);
            } catch (JsonProcessingException e) {
                throw new RuntimeException(e);
            }
        }).collect(Collectors.toList());

        licenseList.forEach(x -> System.out.println("요기야" + x));

        ListItemReader<License> listItemReader = new ListItemReader<>(licenseList);

        return listItemReader;
    }
}
