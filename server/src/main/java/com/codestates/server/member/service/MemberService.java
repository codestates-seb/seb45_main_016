package com.codestates.server.member.service;

import com.codestates.server.member.entity.Member;
import com.codestates.server.member.repository.MemberRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class MemberService {

    // JpaRepository를 상속받은 memberReposiory
    private final MemberRepository memberRepository;

    /**
     * 회원 가입 로직
     * 존재하는 회원인지 확인한다.
     *
     * @param member
     * @return
     */
    public Member createMember(Member member){

        // 가입된 이메일인지 확인
        verifiyExistMember(member.getEmail());

        // 예외 발생 안 시키면 저장
        Member savedMember = memberRepository.save(member);

        return savedMember;
    }

    public Member updateMember(Member member){

        // 없는 회원이면 예외 발생
        Member getMember = getVerifiedMember(member.getMemberId());

        Optional.ofNullable(member.getNickname())
                .ifPresent(nickname -> getMember.setNickname(member.getNickname()));
        Optional.ofNullable(member.getPassword())
                .ifPresent(password -> getMember.setPassword(member.getPassword()));
        Optional.ofNullable(member.getProfileImage())
                .ifPresent(image -> getMember.setProfileImage(member.getProfileImage()));

        return memberRepository.save(getMember);
    }

    // member 사용자 정보 가지고 오는 메서드
    public Member gerMember(Long memberId) {
        Member member = getVerifiedMember(memberId);

        return member;
    }

    // member 전체 정보 가지고 오는 메서드로 pagination
    public Page<Member> getMembers(int page, int size) {
        return memberRepository.findAll(PageRequest.of(page, size,
                Sort.by("userId").descending()));
    }

    // member 삭제하는 deleteMember 메서드
    public void deleteMember(Long memberId) {
        Member getMember = getVerifiedMember(memberId);

        memberRepository.delete(getMember);
    }

    /**
     * 등록된 회원인지 확인 (로그인 안 했으면 사용 불가)
     *
     * @param memberId
     * @return
     */
    private Member getVerifiedMember(Long memberId) {

        Optional<Member> member = memberRepository.findById(memberId);

        // 회원이 아니면 예외 발생
        Member getMember = member.orElseThrow(() -> new RuntimeException("🚨 회원 정보를 찾을 수 없습니다. 🚨"));

        return getMember;
    }


    /**
     * 이미 가입한 회원인지 확인하는 메서드
     * 만약 가입 되어있으면 예외 던지기
     * @param email
     */
    private void verifiyExistMember(String email) {

        Optional<Member> optionalMember = memberRepository.findByEmail(email);

        // 예외 추가 후 수정
        if(optionalMember.isPresent()) throw new RuntimeException("🚨 이미 있는 회원입니다. 🚨");

    }

}
