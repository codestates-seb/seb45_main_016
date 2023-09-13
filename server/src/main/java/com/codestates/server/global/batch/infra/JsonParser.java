package com.codestates.server.global.batch.infra;
import com.codestates.server.domain.license.licensedate.entity.LicenseDate;
import com.codestates.server.domain.license.licenseinfo.entity.LicenseInfo;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.ArrayList;
import java.util.List;

public class JsonParser {

    public List<LicenseDate> StringToLicense(String json, LicenseInfo licenseInfo){

        ObjectMapper objectMapper = new ObjectMapper();
        List<LicenseDate> licenseDateList = new ArrayList<>();

        Long id = 1L;

        try {
            JsonNode jsonNode = objectMapper.readTree(String.valueOf(json));
            JsonNode bodyNode = jsonNode.get("body").get("items");
            String bodyJson = objectMapper.writeValueAsString(bodyNode);

            objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
            LicenseDate[] licens = objectMapper.readValue(bodyJson, LicenseDate[].class);

            try{

//                List<Integer> sequence = Arrays.stream(licenses).map(x->Integer.parseInt(x.getImplementationSequence())).collect(Collectors.toList());
//
//                for(int i: sequence){
//
//                    for(License license : licenses){
//
//                        if(Integer.parseInt(license.getImplementationSequence()) == i){
//                            license.setCode(code);
//                            license.setName(name);
//                        }
//                        license.setCode(code);
//                        license.setName(name);
//
//                        licenseList.add(license);
//                    }
//                }

                for(LicenseDate licenseDate : licens){

//                    license.setCode(code);
//                    license.setName(name);
                    licenseDate.setLicenseInfo(licenseInfo);

                    licenseDateList.add(licenseDate);

//                    System.out.println("code : " + license.getCode());
//                    System.out.println("name : " + license.getName());
                    System.out.println("id : " + licenseDate.getId());
                    System.out.println("Implementation Year: " + licenseDate.getImplYy());
                    System.out.println("Implementation Sequence: " + licenseDate.getImplementationSequence());
                    System.out.println("Qualification Code: " + licenseDate.getQualificationCode());
                    System.out.println("Qualification Name: " + licenseDate.getQualificationName());
                    System.out.println("Description: " + licenseDate.getDescription());
                    System.out.println("Document Registration Start Date: " + licenseDate.getDocumentRegistrationStartDate());
                    System.out.println("Document Registration End Date: " + licenseDate.getDocumentRegistrationEndDate());
                    System.out.println("Document Exam Start Date: " + licenseDate.getDocumentExamStartDate());
                    System.out.println("Document Exam End Date: " + licenseDate.getDocumentExamEndDate());
                    System.out.println("Document Pass Date: " + licenseDate.getDocumentPassDate());
                    System.out.println("Practical Registration Start Date: " + licenseDate.getPracticalRegistrationStartDate());
                    System.out.println("Practical Registration End Date: " + licenseDate.getPracticalRegistrationEndDate());
                    System.out.println("Practical Exam Start Date: " + licenseDate.getPracticalExamStartDate());
                    System.out.println("Practical Exam End Date: " + licenseDate.getPracticalExamEndDate());
                    System.out.println("Practical Pass Date: " + licenseDate.getPracticalPassDate());

                }

                return licenseDateList;

            }catch (Exception e){
                System.out.println(e.getMessage());
            }

        }catch (Exception e){
            return licenseDateList;
        }

        return licenseDateList;
    }
}
