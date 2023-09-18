package com.codestates.server.global.mail.event;

import com.codestates.server.domain.member.entity.Member;
import org.springframework.context.ApplicationEvent;

/**
 * 회원가입 이벤트
 */
public class MemberRegistrationEvent extends ApplicationEvent {

    private Member member;

    public MemberRegistrationEvent(Member member) {
        super(member);
        this.member = member;
    }

    public Member getMember() {
        return member;
    }

}
