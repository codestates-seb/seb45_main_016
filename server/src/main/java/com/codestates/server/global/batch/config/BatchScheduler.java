package com.codestates.server.global.batch.config;

import com.codestates.server.global.batch.config.BatchConfig;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.JobParameter;
import org.springframework.batch.core.JobParameters;
import org.springframework.batch.core.JobParametersInvalidException;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.batch.core.repository.JobExecutionAlreadyRunningException;
import org.springframework.batch.core.repository.JobInstanceAlreadyCompleteException;
import org.springframework.batch.core.repository.JobRestartException;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@Component
@RequiredArgsConstructor
public class BatchScheduler {

    private final JobLauncher jobLauncher;
    private final BatchConfig batchConfig;

    @Scheduled(cron = "0 5 * * * *") //job에 스케줄러 적용..
    public void doJob(){
        Map<String, JobParameter> conf = new HashMap<>();
        conf.put("time", new JobParameter(System.currentTimeMillis()));
        JobParameters jobParameter = new JobParameters(conf);

        try {
            jobLauncher.run(batchConfig.job(), jobParameter);
        } catch (JobInstanceAlreadyCompleteException | JobRestartException | IOException |
                 JobParametersInvalidException | JobExecutionAlreadyRunningException e) {
            throw new RuntimeException(e);
        }
    }

}
