package com.codestates.server.domain.batch.config;

import com.codestates.server.domain.batch.infra.JsonParser;
import com.codestates.server.domain.batch.infra.LicenseApi;
import com.codestates.server.domain.license.entity.License;
import lombok.RequiredArgsConstructor;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.context.annotation.Configuration;

import java.util.ArrayList;
import java.util.List;

@Configuration
@RequiredArgsConstructor
public class LicenseProcessor implements ItemProcessor<License, List<License>>{

    @Override
    public List<License> process(License item) throws Exception {

        List<License> licenses = new ArrayList<>();

        if(item != null){
            String json = new LicenseApi().callApiToString(item.getCode());
            licenses = new JsonParser().StringToLicense(json, item.getCode(), item.getName());

            return licenses;
        }
        return licenses;
    }
}
