package com.codestates.server.global.quartzscheduler.web;


import com.codestates.server.global.quartzscheduler.payload.EmailRequest;
import com.codestates.server.global.quartzscheduler.payload.EmailResponse;
import com.codestates.server.global.quartzscheduler.quartz.Job.EmailJob;
import lombok.extern.slf4j.Slf4j;
import org.quartz.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.scheduler.Scheduler;

import javax.validation.Valid;
import java.time.ZonedDateTime;
import java.util.Date;
import java.util.UUID;

@RestController
@Slf4j
public class EmailSchedulerController {

    @Autowired
    private Scheduler scheduler;

    // JobDetail 객체를 생성하는 메서드
    @PostMapping("/schedule/email")
    public ResponseEntity<EmailResponse> scheduleEmail(@Valid @RequestBody EmailRequest emailRequest) {

        try {

            ZonedDateTime dateTime = ZonedDateTime.of(emailRequest.getDateTime(), emailRequest.getTimeZone());
            if(dateTime.isBefore(ZonedDateTime.now())) {
                EmailResponse emailResponse
                        = new EmailResponse(false, "dateTime must be after current time.");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(emailResponse);
            }

            JobDetail jobDetail = buildJobDetail(emailRequest);
            Trigger trigger = buildTrigger(jobDetail, dateTime);

            scheduler.scheduleJob(jobDetail, trigger);

            EmailResponse emailResponse
                    = new EmailResponse(true, jobDetail.getKey().getName(), jobDetail.getKey().getGroup(),
                    "Email Scheduled Successfully!");
            return ResponseEntity.ok(emailResponse);

        } catch (SchedulerException se) {
            log.error("Error while scheduling email: ", se);
            EmailResponse emailResponse
                    = new EmailResponse(false, "Error while scheduling email. Please try again later!");

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(emailResponse);
        }
    }

    @GetMapping("/get")
    public ResponseEntity<String> getApiTest() {
        return ResponseEntity.ok("GET API Test Successfully!");
    }
    private JobDetail buildJobDetail(EmailRequest scheduleEmailRequest) {
        // Quartz Job에 전달할 데이터 담기 (이메일, 제목, 본문 작성)
        JobDataMap jobDataMap = new JobDataMap();

        jobDataMap.put("email", scheduleEmailRequest.getEmail());
        jobDataMap.put("subject", scheduleEmailRequest.getSubject());
        jobDataMap.put("body", scheduleEmailRequest.getBody());

        // Job 객체 building
        return JobBuilder.newJob(EmailJob.class)
                .withIdentity(UUID.randomUUID().toString(), "email-jobs")
                .withDescription("Send Email Job")
                .usingJobData(jobDataMap)
                .storeDurably()
                .build();
    }

    // Trigger 객체 생성
    private Trigger buildTrigger(JobDetail jobDetail, ZonedDateTime startAt) {
        return TriggerBuilder.newTrigger()
                .forJob(jobDetail)
                .withIdentity(jobDetail.getKey().getName(), "email-triggers")
                .withDescription("Send Email Trigger")
                .startAt(Date.from(startAt.toInstant()))
                .withSchedule(SimpleScheduleBuilder.simpleSchedule().withMisfireHandlingInstructionFireNow())
                .build();

    }
}