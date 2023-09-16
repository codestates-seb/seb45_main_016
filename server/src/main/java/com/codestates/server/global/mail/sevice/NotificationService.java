package com.codestates.server.global.mail.sevice;

import com.codestates.server.domain.bookmark.entity.Bookmark;
import com.codestates.server.domain.license.licensedate.entity.LicenseDate;
import com.codestates.server.domain.license.licenseinfo.entity.LicenseInfo;
import com.codestates.server.domain.member.entity.Member;
import com.codestates.server.domain.member.repository.MemberRepository;
import lombok.AllArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@AllArgsConstructor
public class NotificationService {

    private final MemberRepository memberRepository;
    private final EmailService emailService;

    @Scheduled(cron = "0 0 12 * * ?")  // 매일 오후 12시에 실행
    public void sendNotificationForUpcomingEvent() throws MessagingException {
        List<Member> members = memberRepository.findAll();

        for (Member member : members) {
            List<Bookmark> bookmarks = member.getBookmarks();
            if (bookmarks != null && !bookmarks.isEmpty()) { // 회원 찾아서 북마크에 값 있으면 이메일 보내기
                for (Bookmark bookmark : bookmarks) {    // 북마크 여러개면 여러 개에서 하나 씩
                    LicenseInfo licenseInfo = bookmark.getLicenseInfo();
                    List<LicenseDate> licenseDates = licenseInfo.getLicenses();
                    for (LicenseDate licenseDate : licenseDates) {
                        // 필기 접수일 : 접수일은 접수마지막날로부터 한달전부터 알림시작
                        if (shouldNotify(licenseDate.getDocumentRegistrationEndDate())) {

                            String emailTo = member.getEmail();

                            String emailSubject
                                    = String.format("[STUDYGROUND] %s님이 북마크하신 %s %s 필기시험 접수 안내입니다.",
                                    member.getMemberId(), licenseDate.getDescription(), licenseInfo.getName());

                            Map<String, Object> variables = new HashMap<>();
                            variables.put("name", member.getName());
                            variables.put("description", licenseDate.getDescription());
                            variables.put("licenseName", licenseInfo.getName());
                            variables.put("docRegStartDate", licenseDate.getDocumentRegistrationStartDate());
                            variables.put("docRegEndDate", licenseDate.getDocumentRegistrationEndDate());
                            variables.put("docExamStartDate", licenseDate.getDocumentExamStartDate());
                            variables.put("docExamEndDate", licenseDate.getDocumentExamEndDate());

                            String templateName = "doc-registration-template";

                            emailService.sendDynamicEmail(emailTo, emailSubject, templateName, variables);
                        }

                        // 필기 시험일
                        if (shouldNotify(licenseDate.getDocumentExamStartDate())) {
                            String emailTo = member.getEmail();

                            String emailSubject
                                    = String.format("[STUDYGROUND] %s님이 북마크하신 %s %s 필기시험 날짜 안내입니다.",
                                    member.getMemberId(), licenseDate.getDescription(), licenseInfo.getName());

                            Map<String, Object> variables = new HashMap<>();
                            variables.put("name", member.getName());
                            variables.put("description", licenseDate.getDescription());
                            variables.put("licenseName", licenseInfo.getName());
                            variables.put("docExamStartDt", licenseDate.getDocumentExamStartDate());
                            variables.put("docExamEndDt", licenseDate.getDocumentExamEndDate());

                            String templateName = "doc-exam-template";

                            emailService.sendDynamicEmail(emailTo, emailSubject, templateName, variables);
                        }

                        // 필기 합격일
                        if (shouldNotify(licenseDate.getDocumentPassDate())) {
                            String emailTo = member.getEmail();

                            String emailSubject
                                    = String.format("[STUDYGROUND] %s님이 북마크하신 %s %s 필기시험 합격발표 안내입니다.",
                                    member.getMemberId(), licenseDate.getDescription(), licenseInfo.getName());

                            Map<String, Object> variables = new HashMap<>();
                            variables.put("name", member.getName());
                            variables.put("description", licenseDate.getDescription());
                            variables.put("licenseName", licenseInfo.getName());
                            variables.put("docPassDt", licenseDate.getDocumentPassDate());

                            String templateName = "doc-announcement-template";

                            emailService.sendDynamicEmail(emailTo, emailSubject, templateName, variables);
                        }

                        // 실기 접수일 : 필기와 동일하게 접수 마지막날로부터 한달 전~ 알림
                        if(shouldNotify(licenseDate.getPracticalRegistrationEndDate())) {
                            String emailTo = member.getEmail();

                            String emailSubject
                                    = String.format("[STUDYGROUND] %s님이 북마크하신 %s %s 실기시험 접수 안내입니다.",
                                    member.getMemberId(), licenseDate.getDescription(), licenseInfo.getName());

                            Map<String, Object> variables = new HashMap<>();
                            variables.put("name", member.getName());
                            variables.put("description", licenseDate.getDescription());
                            variables.put("licenseName", licenseInfo.getName());
                            variables.put("pracRegStartDt", licenseDate.getPracticalRegistrationStartDate());
                            variables.put("pracRegEndDt", licenseDate.getPracticalRegistrationEndDate());
                            variables.put("pracExamStartDt", licenseDate.getPracticalExamStartDate());
                            variables.put("pracExamEndDt", licenseDate.getPracticalExamEndDate());

                            String templateName = "prac-registration-template";

                            emailService.sendDynamicEmail(emailTo, emailSubject, templateName, variables);
                        }

                        // 실기 시험일
                        if (shouldNotify(licenseDate.getPracticalExamStartDate())) {
                            String emailTo = member.getEmail();

                            String emailSubject
                                    = String.format("[STUDYGROUND] %s님이 북마크하신 %s %s 실기시험 날짜 안내입니다.",
                                    member.getMemberId(), licenseDate.getDescription(), licenseInfo.getName());

                            Map<String, Object> variables = new HashMap<>();
                            variables.put("name", member.getName());
                            variables.put("description", licenseDate.getDescription());
                            variables.put("licenseName", licenseInfo.getName());
                            variables.put("pracExamStartDt", licenseDate.getPracticalExamStartDate());
                            variables.put("pracExamEndDt", licenseDate.getPracticalExamEndDate());

                            String templateName = "prac-exam-template";

                            emailService.sendDynamicEmail(emailTo, emailSubject, templateName, variables);
                        }

                        // 실기 합격일
                        if (shouldNotify(licenseDate.getPracticalPassDate())) {
                            String emailTo = member.getEmail();

                            String emailSubject
                                    = String.format("[STUDYGROUND] %s님이 북마크하신 %s %s 실기시험 합격발표 안내입니다.",
                                    member.getMemberId(), licenseDate.getDescription(), licenseInfo.getName());

                            Map<String, Object> variables = new HashMap<>();
                            variables.put("name", member.getName());
                            variables.put("description", licenseDate.getDescription());
                            variables.put("licenseName", licenseInfo.getName());
                            variables.put("pracPassDt", licenseDate.getPracticalPassDate());

                            String templateName = "prac-announcement-template";

                            emailService.sendDynamicEmail(emailTo, emailSubject, templateName, variables);
                        }
                    }
                }
            }
        }
    }

    // date - 정한 날짜 = true -> 알림 메세지 보내기
    private boolean shouldNotify(String date) {

        // 20230110 처럼 현재 자격증 시험이랑 똑같이 출력
        LocalDate today = LocalDate.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
        String formattedDate = today.format(formatter);

        // 20230110 형태로 들어오는 licenseDate LocalDate형태로 바꿔서 계산 -> 계산 오류 없게 하기 위해서
        LocalDate licenseDate = LocalDate.parse(date, formatter);

        LocalDate oneMonthBefore = licenseDate.minusMonths(1);  // 한 달 전 알림
        LocalDate twoWeeksBefore = licenseDate.minusWeeks(2);   // 이 주 전 알림
        LocalDate oneWeekBefore = licenseDate.minusWeeks(1);    // 일주일 전 알림
        LocalDate threeDaysBefore = licenseDate.minusDays(3);   // 삼일 전 알림
        LocalDate oneDayBefore = licenseDate.minusDays(1);  // 하루 전 알림

        if(today.equals(oneDayBefore)) return true;
        else if (today.equals(threeDaysBefore)) return true;
        else if (today.equals(oneWeekBefore)) return true;
        else if(today.equals(twoWeeksBefore)) return true;
        else if (today.equals(oneMonthBefore)) return true;

        return false;
    }


}
