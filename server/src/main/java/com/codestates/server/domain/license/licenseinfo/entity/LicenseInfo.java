package com.codestates.server.domain.license.licenseinfo.entity;

import com.codestates.server.domain.bookmark.entity.Bookmark;
import com.codestates.server.domain.license.licensedate.entity.LicenseDate;
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

    @Column
    private Long markCount;

    @OneToOne
    @JoinColumn(name = "BOOKMARK_id")
    private Bookmark bookmark;

    @OneToMany(mappedBy = "id")
    private List<LicenseDate> licenses;

}
