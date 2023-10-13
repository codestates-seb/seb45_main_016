package com.codestates.server.global.batch.infra;
import com.codestates.server.domain.license.licensedate.entity.LicenseDate;
import com.codestates.server.domain.license.licenseinfo.entity.LicenseInfo;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;

import java.util.ArrayList;
import java.util.List;

@Slf4j
public class JsonParser {

    public List<LicenseDate> StringToLicense(String json, LicenseInfo licenseInfo){

        ObjectMapper objectMapper = new ObjectMapper();
        List<LicenseDate> licenseDateList = new ArrayList<>();

        try {
            JsonNode jsonNode = objectMapper.readTree(String.valueOf(json));
            JsonNode bodyNode = jsonNode.get("body").get("items");
            String bodyJson = objectMapper.writeValueAsString(bodyNode);

            objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
            LicenseDate[] licens = objectMapper.readValue(bodyJson, LicenseDate[].class);

            try{
                for(LicenseDate licenseDate : licens){

                    licenseDate.setLicenseInfo(licenseInfo);
                    licenseDateList.add(licenseDate);
                    log.info("작성 완료 : {}", licenseInfo.getCode());
                }

                return licenseDateList;

            }catch (Exception e){
                log.info("json parser 작성 실패 : {}", e.getMessage());
            }

        }catch (Exception e){
            log.info("json parser 작성 실패 : {}", e.getMessage());
            return licenseDateList;
        }

        return licenseDateList;
    }
}
