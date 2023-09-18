package com.codestates.server.domain.license.licenseinfo.entity;

import com.codestates.server.domain.bookmark.entity.Bookmark;
import com.codestates.server.domain.license.licensedate.entity.LicenseDate;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

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

//    @ColumnDefault("0") //default 값을 0으로 준다. 하지만 이 엔티티에서 실제 값의 주입은 batchConfig에서 일어난다.
    @Column
    private Long markCount;

    @OneToMany(mappedBy = "licenseInfo")
    private List<LicenseDate> licenses;

}
