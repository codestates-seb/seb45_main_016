//package com.codestates.server.global.mail.email;
//
//import com.codestates.server.domain.member.entity.Member;
//import lombok.AllArgsConstructor;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.mail.javamail.JavaMailSender;
//import org.springframework.mail.javamail.MimeMessageHelper;
//import org.springframework.stereotype.Service;
//import org.thymeleaf.TemplateEngine;
//import org.thymeleaf.context.Context;
//
//import javax.mail.MessagingException;
//import javax.mail.internet.MimeMessage;
//
//@Service
//public class CertificateRegEmailSendable implements EmailSedable {
//
//    private JavaMailSender mailSender;
//
//    @Autowired
//    private TemplateEngine templateEngine;
//    private Member member;
//
//
//    @Override
//    public void send(String[] to, String subject, String message) {
//        try {
//            MimeMessage mimeMessage = mailSender.createMimeMessage();
//            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);
//            helper.setTo(to);
//            helper.setSubject(subject);
//
//            Context context = new Context();
//            context.setVariable("name", member.getName());
//
//
//            String html = templateEngine.process("email-template", context);
//
//            helper.setText(html, true);
//
//            mailSender.send(mimeMessage);
//        } catch (MessagingException e) {
//            // 이메일 전송 실패시 처리 로직
//            e.printStackTrace();
//        }
//    }
//}
