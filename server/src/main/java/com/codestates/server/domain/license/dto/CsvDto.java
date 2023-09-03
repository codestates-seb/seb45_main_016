package com.codestates.server.domain.license.dto;

import com.codestates.server.domain.license.entity.License;
import lombok.Data;

@Data
public class CsvDto {
    private Long code;
    private String name;

    /**
     * License 엔티티 반환 시키기 (to entity)
     * @return License
     */
    public License toEntity(){
        return License.builder()
                .code(this.code)
                .name(this.name)
                .build();
    }
}
