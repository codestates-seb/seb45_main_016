package com.codestates.server.global.mail.sevice;

import com.codestates.server.domain.member.entity.Member;
import com.codestates.server.global.mail.event.MemberRegistrationEvent;
import lombok.AllArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import java.util.HashMap;
import java.util.Map;

/**
 * 회원가입 시 회원에게 보내는 이메일을 다루는 이벤트 리스너
 */
@Service
@AllArgsConstructor
public class MemberRegistrationService {

    private final EmailService emailService;


    @EventListener
    public void handleMemberRegistrationEvent(MemberRegistrationEvent event) throws MessagingException {

        Member member = event.getMember();

        String emailTo = member.getEmail();

        String emailSubject
                = String.format("[STUDYGROUND] %s님! 스터디 그라운드 가입을 환영합니다.", member.getName());

        Map<String, Object> variables = new HashMap<>();
        variables.put("name", member.getName());

        String templateName = "welcome-template";

        emailService.sendDynamicEmail(emailTo, emailSubject, templateName, variables);

    }
}
