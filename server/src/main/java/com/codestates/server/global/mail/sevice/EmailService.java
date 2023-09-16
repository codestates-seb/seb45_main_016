package com.codestates.server.global.mail.sevice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.util.Map;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private TemplateEngine templateEngine;

    @Async
    public void sendDynamicEmail(String to,
                                 String subject,
                                 String templateName,
                                 Map<String, Object> variables) throws MessagingException {

        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);

        helper.setTo(to);   // 보낼 사람
        helper.setSubject(subject); // 제목

        Context context = new Context();
        context.setVariables(variables);    // 이메일에 전달할 데이터

        String html = templateEngine.process(templateName, context);  // template 이름 작성
        helper.setText(html, true);

        mailSender.send(mimeMessage);
    }
}
