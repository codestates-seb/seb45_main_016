package com.codestates.server.domain.batch;

import com.codestates.server.domain.batch.mapper.CsvToCsvDtoMapper;
import com.codestates.server.domain.license.dto.CsvDto;
import com.codestates.server.domain.license.entity.License;
import com.codestates.server.domain.license.repository.LicenseRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.batch.item.ItemReader;
import org.springframework.batch.item.ItemWriter;
import org.springframework.batch.item.file.FlatFileItemReader;
import org.springframework.batch.item.file.mapping.DefaultLineMapper;
import org.springframework.batch.item.file.transform.DelimitedLineTokenizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/**
 * 스프링 배치 작업을 위한 클래스.
 * 1. job 등록
 * 2. step 등록
 */

@Slf4j
@Configuration
@RequiredArgsConstructor
public class BatchConfig {

    private final JobBuilderFactory jobBuilderFactory;
    private final StepBuilderFactory stepBuilderFactory;
    private final LicenseRepository licenseRepository;
    private final LicenseReader licenseReader;
    private final LicenseProcessor licenseProcessor;
    private final LicenseWriter licenseWriter;

    @Bean
    public Job job() throws IOException {
        return jobBuilderFactory.get("job")
                .start(step01())
                .next(step02())
                .build();
    }

    @Bean
    public Step step01(){
        return stepBuilderFactory.get("step01")
                //<rader에 넘길 타입, writer에 넘길 타입>
                .<CsvDto, CsvDto>chunk(1000)
                .reader(csvReader()) //csv파일 읽고 넘기는 로직
                .writer(items -> csvWriter(items).write(items)) //받은 데이터 DB에 저장 로직
                .build();
    }

    @Bean
    public Step step02() throws IOException {
        return stepBuilderFactory.get("step02")
                //<rader에 넘길 타입, writer에 넘길 타입>
                .<License, List<License>>chunk(1000)
                .reader(licenseReader) //DB에서 데이터 읽어오기
                .processor(licenseProcessor) //데이터값으로 API 호출해서 전달
                .writer(licenseWriter) //받은 데이터 DB에 저장 로직
                .build();
    }

    @Bean
    public FlatFileItemReader<CsvDto> csvReader(){
        FlatFileItemReader<CsvDto> itemReader = new FlatFileItemReader<>();
        itemReader.setResource(new ClassPathResource("/csv/license.csv"));

        //line mapper setting
        DefaultLineMapper<CsvDto> lineMapper = new DefaultLineMapper<>();
        lineMapper.setLineTokenizer(new DelimitedLineTokenizer());
        lineMapper.setFieldSetMapper(new CsvToCsvDtoMapper());

        itemReader.setLineMapper(lineMapper);
        itemReader.setLinesToSkip(0);

        return itemReader;
    }

    @Bean
    public ItemWriter<CsvDto> csvWriter(List<? extends CsvDto> items) {
        ItemWriter<CsvDto> itemWriter = new ItemWriter<CsvDto>() {
            @Override
            public void write(List<? extends CsvDto> items) throws Exception {
                List<License> licenseList = new ArrayList<>();

                items.forEach(getCsvDto -> {
                    License license = getCsvDto.toEntity();
                    licenseList.add(license);
                });
                licenseRepository.saveAll(licenseList);
            }
        };
        return itemWriter;
    }


}
