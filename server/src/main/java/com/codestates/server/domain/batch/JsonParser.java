package com.codestates.server.domain.batch;

import com.codestates.server.domain.license.dto.LicenseDto;
import com.codestates.server.domain.license.entity.License;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

public class JsonParser {

    public License StringToLicense(String json) throws JsonProcessingException {

        ObjectMapper objectMapper = new ObjectMapper();

        JsonNode jsonNode = objectMapper.readTree(String.valueOf(json));
        System.out.println("jsonNode = " + jsonNode.toString());

        JsonNode bodyNode = jsonNode.get("body").get("items");
        String bodyJson = objectMapper.writeValueAsString(bodyNode);
        System.out.println(bodyJson);

        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        License[] licenses = objectMapper.readValue(bodyJson, License[].class);

        License license = licenses[0];

        System.out.println("code : " + license.getCode());
        System.out.println("name : " + license.getName());
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

        return license;
    }
}
