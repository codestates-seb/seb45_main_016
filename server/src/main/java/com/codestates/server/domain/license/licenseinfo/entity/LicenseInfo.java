package com.codestates.server.domain.license.licenseinfo.entity;

import com.codestates.server.domain.license.licensedate.entity.License;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LicenseInfo {

    @Id
    private Long code;

    @Column
    private String name;

    @OneToMany(mappedBy = "id")
    private List<License> licenses;

}
