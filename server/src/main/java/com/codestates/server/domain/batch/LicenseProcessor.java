package com.codestates.server.domain.batch;

import com.codestates.server.domain.license.entity.License;
import lombok.RequiredArgsConstructor;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.context.annotation.Configuration;

@Configuration
@RequiredArgsConstructor
public class LicenseProcessor implements ItemProcessor<License, License>{

    @Override
    public License process(License item) throws Exception {
        if(item != null){
            String json = new LicenseApi().callApiToString(item.getCode());
            License license = new JsonParser().StringToLicense(json, item.getCode(), item.getName());

            return license;
        }
        return item;
    }
}
