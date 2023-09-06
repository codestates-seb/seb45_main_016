package com.codestates.server.global.batch.mapper;

import com.codestates.server.domain.license.dto.CsvDto;
import org.springframework.batch.item.file.mapping.FieldSetMapper;
import org.springframework.batch.item.file.transform.FieldSet;
import org.springframework.validation.BindException;

/**
 * Csv를 CSVDTO로 매핑시키는 Mapper
 */
public class CsvToCsvDtoMapper implements FieldSetMapper<CsvDto> {
    @Override
    public CsvDto mapFieldSet(FieldSet fieldSet) throws BindException {

        if(fieldSet == null){
            return null;
        }

        CsvDto csvDto = new CsvDto();
        csvDto.setCode(fieldSet.readLong(0)); //csv의 index 0번을 code로 매핑
        csvDto.setName(fieldSet.readString(1)); //csv의 index 1번을 code로 매핑

        return csvDto;
    }
}
