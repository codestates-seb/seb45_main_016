//package com.codestates.server.global.mail.email;
//
//import lombok.AllArgsConstructor;
//import org.springframework.mail.MailSendException;
//import org.springframework.mail.javamail.JavaMailSender;
//import org.springframework.stereotype.Service;
//
///**
// * 이메일 전송 담당 서비스
// */
//@Service
//@AllArgsConstructor
//public class EmailSender {
//
//    private final JavaMailSender mailSender;
//    private final EmailSedable emailSedable;
//
//    public void sendEmail(String[] to, String subject, String message) throws MailSendException, InterruptedException {
//        emailSedable.send(to, subject, message);
//    }
//}
