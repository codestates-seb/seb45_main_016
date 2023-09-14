package com.codestates.server.global.batch.config;

import com.codestates.server.domain.license.licensedate.entity.LicenseDate;
import com.codestates.server.domain.license.licenseinfo.dto.CsvDto;
import com.codestates.server.domain.license.licensedate.repository.LicenseDateRepository;
import com.codestates.server.domain.license.licenseinfo.entity.LicenseInfo;
import com.codestates.server.domain.license.licenseinfo.repository.LicenseInfoRepository;
import com.codestates.server.global.batch.mapper.CsvToCsvDtoMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
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
 * 2. step01 등록 -> bean으로 작성
 * 3. step02 등록 -> 클래스로 구성
 *--------------------------------------------------
 * API 조회 횟수 제한있어서 이 클래스 전체 주석처리한상태로 push 하겠습니다.
 * 테스트 해보시려면 주석 제거하고 실행 시키시면 DB로 들어갑니다!
 */

@Slf4j
@Configuration
@RequiredArgsConstructor
public class BatchConfig {

    private final JobBuilderFactory jobBuilderFactory;
    private final StepBuilderFactory stepBuilderFactory;
    private final LicenseDateRepository licenseDateRepository;
    private final LicenseReader licenseReader;
    private final LicenseProcessor licenseProcessor;
    private final LicenseWriter licenseWriter;
    private final LicenseInfoRepository licenseInfoRepository;

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
                .<CsvDto, CsvDto>chunk(5000)
                .reader(csvReader()) //csv파일 읽고 넘기는 로직
                .writer(items -> csvWriter(items).write(items)) //받은 데이터 DB에 저장 로직
                .build();
    }

    @Bean
    public Step step02() {
        return stepBuilderFactory.get("step02")
                //<rader에 넘길 타입, writer에 넘길 타입>
                .<LicenseInfo, List<LicenseDate>>chunk(5000)
                .reader(licenseReader) //DB에서 데이터 읽어오기
                .processor(licenseProcessor) //데이터값으로 API 호출해서 전달
                .writer(licenseWriter) //받은 데이터 DB에 저장 로직
                .build();
    }

    @Bean
    public FlatFileItemReader<CsvDto> csvReader(){
        log.info("Csv Reader 실행");
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
                log.info("Csv Writer 실행");
                List<LicenseInfo> licenseInfos = new ArrayList<>();

                items.forEach(getCsvDto -> {
                    LicenseInfo licenseinfo = getCsvDto.toEntity();
                    licenseInfos.add(licenseinfo);
                });
                licenseInfoRepository.saveAll(licenseInfos);
            }
        };
        return itemWriter;
    }

}
