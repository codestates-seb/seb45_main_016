package com.codestates.server.domain.bookmark.entity;

import com.codestates.server.domain.license.licensedate.entity.LicenseDate;
import com.codestates.server.domain.license.licenseinfo.entity.LicenseInfo;
import com.codestates.server.domain.member.entity.Member;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Bookmark {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    private LicenseInfo licenseInfo;

    @ManyToOne
    @JoinColumn(name = "member_id")
    @JsonIgnore
    private Member member;
}
