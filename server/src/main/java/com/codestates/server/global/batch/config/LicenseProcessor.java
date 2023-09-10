package com.codestates.server.global.batch.config;

import com.codestates.server.domain.license.licenseinfo.entity.LicenseInfo;
import com.codestates.server.global.batch.infra.JsonParser;
import com.codestates.server.global.batch.infra.LicenseApi;
import com.codestates.server.domain.license.licensedate.entity.License;
import lombok.RequiredArgsConstructor;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.context.annotation.Configuration;

import java.util.ArrayList;
import java.util.List;

@Configuration
@RequiredArgsConstructor
public class LicenseProcessor implements ItemProcessor<LicenseInfo, List<License>>{

    @Override
    public List<License> process(LicenseInfo item) throws Exception {

        List<License> licenses = new ArrayList<>();

        if(item != null){
            String json = new LicenseApi().callApiToString(item);
            licenses = new JsonParser().StringToLicense(json, item);

            return licenses;
        }
        return licenses;
    }
}
