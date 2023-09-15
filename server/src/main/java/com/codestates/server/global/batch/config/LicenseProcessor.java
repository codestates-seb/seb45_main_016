package com.codestates.server.global.batch.config;

import com.codestates.server.domain.license.licenseinfo.entity.LicenseInfo;
import com.codestates.server.global.batch.infra.JsonParser;
import com.codestates.server.global.batch.infra.LicenseApi;
import com.codestates.server.domain.license.licensedate.entity.LicenseDate;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.context.annotation.Configuration;

import java.util.ArrayList;
import java.util.List;

@Configuration
@RequiredArgsConstructor
@Slf4j
public class LicenseProcessor implements ItemProcessor<LicenseInfo, List<LicenseDate>>{

    @Override
    public List<LicenseDate> process(LicenseInfo item) throws Exception {
        log.info("license Processor 실행");
        List<LicenseDate> licenses = new ArrayList<>();

        if(item != null){
            String json = new LicenseApi().callApiToString(item);
            licenses = new JsonParser().StringToLicense(json, item);

            return licenses;
        }
        return licenses;
    }
}
