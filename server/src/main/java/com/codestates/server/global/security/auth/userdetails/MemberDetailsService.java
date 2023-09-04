package com.codestates.server.global.security.auth.userdetails;

import com.codestates.server.domain.member.entity.Member;
import com.codestates.server.domain.member.repository.MemberRepository;
import com.codestates.server.global.security.auth.utils.CustomAuthorityUtils;
import lombok.AllArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.Collection;
import java.util.Optional;

/**
 * UserDetailsService를 상속받는 MemberDetailsService
 * UserDetails 에 위임하여 userdetail정보를 받아옴
 */
@Component
@AllArgsConstructor
public class MemberDetailsService implements UserDetailsService {

    private final MemberRepository memberRepository;
    private final CustomAuthorityUtils authorityUtils;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        // 사용자 이메일로 회원 정보 조회
        Optional<Member> optionalMember = memberRepository.findByEmail(username);
        // 없으면 예외처리 🚨
        Member getMember = optionalMember.orElseThrow(
                () -> new RuntimeException("🚨 회원 정보를 찾을 수 없습니다. 🚨"));
        // MemberDetails 객체를 생성하여 회원 정보 UserDetails로 포장
        return new MemberDetails(getMember);

    }

    // MemberDetails 클래스는 Member 엔티티를 UserDetails로 변환
    private class MemberDetails extends Member implements UserDetails {
        MemberDetails(Member member) {
                setMemberId(member.getMemberId());
                setNickname(member.getNickname());
                setEmail(member.getEmail());
                setPassword(member.getPassword());
                setPhone(member.getPhone());
                setRoles(member.getRoles());
        }

        // 권한 정보
        @Override
        public Collection<? extends GrantedAuthority> getAuthorities() {
            return authorityUtils.createAuthorities(this.getRoles());
        }

        // 이메일 반환
        @Override
        public String getUsername() {
            return getEmail();
        }

        // 계정이 만료되지 않았음 -> true
        @Override
        public boolean isAccountNonExpired() {
            return true;
        }

        // 계정이 잠기지 않았음(활성화) -> true
        @Override
        public boolean isAccountNonLocked() {
            return true;
        }

        // credential이 만료되지 않음 -> true
        @Override
        public boolean isCredentialsNonExpired() {
            return true;
        }

        // 계정 활성화 -> true
        @Override
        public boolean isEnabled() {
            return true;
        }
    }
}
