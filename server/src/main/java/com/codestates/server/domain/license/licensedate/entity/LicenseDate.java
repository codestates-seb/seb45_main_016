package com.codestates.server.domain.license.licensedate.entity;

import com.codestates.server.domain.license.licenseinfo.entity.LicenseInfo;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LicenseDate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonProperty("implYy")
    @Column(nullable = true)
    private String implYy;

    @JsonProperty("implSeq")
    @Column(nullable = true)
    private String implementationSequence;

    @JsonProperty("qualgbCd")
    @Column(nullable = true)
    private String qualificationCode;

    @JsonProperty("qualgbNm")
    @Column(nullable = true)
    private String qualificationName;

    @JsonProperty("description")
    @Column(nullable = true)
    private String description;

    @JsonProperty("docRegStartDt")
    @Column(nullable = true)
    private String documentRegistrationStartDate;

    @JsonProperty("docRegEndDt")
    @Column(nullable = true)
    private String documentRegistrationEndDate;

    @JsonProperty("docExamStartDt")
    @Column(nullable = true)
    private String documentExamStartDate;

    @JsonProperty("docExamEndDt")
    @Column(nullable = true)
    private String documentExamEndDate;

    @JsonProperty("docPassDt")
    @Column(nullable = true)
    private String documentPassDate;

    @JsonProperty("pracRegStartDt")
    @Column(nullable = true)
    private String practicalRegistrationStartDate;

    @JsonProperty("pracRegEndDt")
    @Column(nullable = true)
    private String practicalRegistrationEndDate;

    @JsonProperty("pracExamStartDt")
    @Column(nullable = true)
    private String practicalExamStartDate;

    @JsonProperty("pracExamEndDt")
    @Column(nullable = true)
    private String practicalExamEndDate;

    @JsonProperty("pracPassDt")
    @Column(nullable = true)
    private String practicalPassDate;

    @ManyToOne(cascade = CascadeType.ALL)
    private LicenseInfo licenseInfo;
}
