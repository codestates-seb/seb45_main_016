package com.codestates.server.global.batch.infra;
import com.codestates.server.domain.license.licensedate.entity.License;
import com.codestates.server.domain.license.licenseinfo.entity.LicenseInfo;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.ArrayList;
import java.util.List;

public class JsonParser {

    public List<License> StringToLicense(String json, LicenseInfo licenseInfo){

        ObjectMapper objectMapper = new ObjectMapper();
        List<License> licenseList = new ArrayList<>();

        Long id = 1L;

        try {
            JsonNode jsonNode = objectMapper.readTree(String.valueOf(json));
            JsonNode bodyNode = jsonNode.get("body").get("items");
            String bodyJson = objectMapper.writeValueAsString(bodyNode);

            objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
            License[] licenses = objectMapper.readValue(bodyJson, License[].class);

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

                for(License license : licenses){

//                    license.setCode(code);
//                    license.setName(name);
                    license.setLicenseInfo(licenseInfo);

                    licenseList.add(license);

//                    System.out.println("code : " + license.getCode());
//                    System.out.println("name : " + license.getName());
                    System.out.println("id : " + license.getId());
                    System.out.println("Implementation Year: " + license.getImplYy());
                    System.out.println("Implementation Sequence: " + license.getImplementationSequence());
                    System.out.println("Qualification Code: " + license.getQualificationCode());
                    System.out.println("Qualification Name: " + license.getQualificationName());
                    System.out.println("Description: " + license.getDescription());
                    System.out.println("Document Registration Start Date: " + license.getDocumentRegistrationStartDate());
                    System.out.println("Document Registration End Date: " + license.getDocumentRegistrationEndDate());
                    System.out.println("Document Exam Start Date: " + license.getDocumentExamStartDate());
                    System.out.println("Document Exam End Date: " + license.getDocumentExamEndDate());
                    System.out.println("Document Pass Date: " + license.getDocumentPassDate());
                    System.out.println("Practical Registration Start Date: " + license.getPracticalRegistrationStartDate());
                    System.out.println("Practical Registration End Date: " + license.getPracticalRegistrationEndDate());
                    System.out.println("Practical Exam Start Date: " + license.getPracticalExamStartDate());
                    System.out.println("Practical Exam End Date: " + license.getPracticalExamEndDate());
                    System.out.println("Practical Pass Date: " + license.getPracticalPassDate());

                }

                return licenseList;

            }catch (Exception e){
                System.out.println(e.getMessage());
            }

        }catch (Exception e){
            return licenseList;
        }

        return licenseList;
    }
}
