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
public class LicenseNotificationService {

    private final MemberRepository memberRepository;
    private final EmailService emailService;

    @Scheduled(cron = "0 0 15 * * ?")   // 매일 오후 세시에 스케줄러 실행
    public void sendNotificationForUpcomigEvent() throws MessagingException {
        List<Member> members = memberRepository.findAll();
        for (Member member : members) {
            handleMemberNotification(member);
        }
    }

    private void handleMemberNotification(Member member) throws MessagingException {
        List<Bookmark> bookmarkList = member.getBookmarks();
        if(bookmarkList != null && !bookmarkList.isEmpty()) { // 회원 찾아서 북마크에 값 있으면 이메일 보내기
            for(Bookmark bookmark : bookmarkList) { // 북마크 여러개면 여러 개에서 하나 씩
                handleBookmarkNotifications(bookmark, member);
            }
        }
    }

    private void handleBookmarkNotifications(Bookmark bookmark, Member member) throws MessagingException {
        LicenseInfo licenseInfo = bookmark.getLicenseInfo();     // 북마크에서 자격증 정보 출력
        List<LicenseDate> licenseDateList = licenseInfo.getLicenses();  // 자격증 정보에서 자격증 날짜 가지고 오기
        for(LicenseDate licenseDate : licenseDateList) {
            checkAndNotification(member, licenseDate);
        }
    }

    /**
     * 알림 종류별로 널짜 확인해서 구분하고 메일 보내기
     * @param member
     * @param licenseDate
     * @throws MessagingException
     */
    private void checkAndNotification(Member member, LicenseDate licenseDate ) throws MessagingException {

        // 필기 접수일 : 접수일은 접수마지막날로부터 한달전부터 알림시작
        if (shouldNotify(licenseDate.getDocumentRegistrationEndDate())) {

            Map<String, Object> variables = getTemplateVariables(member, licenseDate);
            variables.put("docRegStartDate", licenseDate.getDocumentRegistrationStartDate());
            variables.put("docRegEndDate", licenseDate.getDocumentRegistrationEndDate());
            variables.put("docExamStartDate", licenseDate.getDocumentExamStartDate());
            variables.put("docExamEndDate", licenseDate.getDocumentExamEndDate());

            sendEmail(member, licenseDate, "doc-registration-template", "필기시험 접수", variables);
        }

        // 필기 시험일
        if (shouldNotify(licenseDate.getDocumentExamStartDate())) {

            Map<String, Object> variables = getTemplateVariables(member, licenseDate);
            variables.put("docExamStartDt", licenseDate.getDocumentExamStartDate());
            variables.put("docExamEndDt", licenseDate.getDocumentExamEndDate());

            sendEmail(member, licenseDate, "doc-exam-template", "필기시험일", variables);
        }

        // 필기 합격일
        if (shouldNotify(licenseDate.getDocumentPassDate())) {

            Map<String, Object> variables = getTemplateVariables(member, licenseDate);
            variables.put("docPassDt", licenseDate.getDocumentPassDate());

            sendEmail(member, licenseDate, "doc-announcement-template", "필기시험 합격발표", variables);
        }

        // 실기 접수일 : 필기와 동일하게 접수 마지막날로부터 한달 전~ 알림
        if(shouldNotify(licenseDate.getPracticalRegistrationEndDate())) {

            Map<String, Object> variables = getTemplateVariables(member, licenseDate);
            variables.put("pracRegStartDt", licenseDate.getPracticalRegistrationStartDate());
            variables.put("pracRegEndDt", licenseDate.getPracticalRegistrationEndDate());
            variables.put("pracExamStartDt", licenseDate.getPracticalExamStartDate());
            variables.put("pracExamEndDt", licenseDate.getPracticalExamEndDate());

            sendEmail(member, licenseDate, "prac-registration-template", "실기시험 접수", variables);
        }

        // 실기 시험일
        if (shouldNotify(licenseDate.getPracticalExamStartDate())) {

            Map<String, Object> variables = getTemplateVariables(member, licenseDate);
            variables.put("pracExamStartDt", licenseDate.getPracticalExamStartDate());
            variables.put("pracExamEndDt", licenseDate.getPracticalExamEndDate());

            sendEmail(member, licenseDate, "prac-exam-template", "실기시험일", variables);
        }

        // 실기 합격일
        if(shouldNotify(licenseDate.getPracticalPassDate())) {
            Map<String, Object> variables = getTemplateVariables(member, licenseDate);
            variables.put("pracPassDt", licenseDate.getPracticalPassDate());

            sendEmail(member, licenseDate, "prac-announcement-template", "실기시험 합격발표", variables);
        }
    }

    private void sendEmail(Member member,
                           LicenseDate licenseDate,
                           String templateName,
                           String typeOfNotification,
                           Map<String, Object> extraVariables) throws MessagingException {

        String emailTo = member.getEmail();

        String emailSubject = getEmailSubject(member, licenseDate, typeOfNotification);

        Map<String, Object> variables = getTemplateVariables(member, licenseDate);
        // 각각 다른 추가적인 변수값 넣기
        variables.putAll(extraVariables);

        emailService.sendDynamicEmail(emailTo, emailSubject, templateName, variables);
    }

    private String getEmailSubject(Member member, LicenseDate licenseDate, String typeOfNotification) {
        return String.format("[STUDYGROUND] %s님이 북마크하신 %s %s %s 안내입니다.",
                member.getMemberId(), licenseDate.getDescription(), licenseDate.getLicenseInfo().getName(), typeOfNotification);
    }

    private Map<String, Object> getTemplateVariables(Member member, LicenseDate licenseDate) {

        Map<String, Object> variables = new HashMap<>();
        variables.put("new", member.getName());
        variables.put("description", licenseDate.getDescription());
        variables.put("licenseName", licenseDate.getLicenseInfo().getName());

        return variables;
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
