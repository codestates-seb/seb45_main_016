package com.codestates.server.domain.member.service;

import com.codestates.server.domain.member.entity.AuthUserUtils;
import com.codestates.server.domain.member.entity.Member;
import com.codestates.server.domain.member.repository.MemberRepository;
import com.codestates.server.domain.member.s3.S3UploadService;
import com.codestates.server.global.exception.BusinessLogicException;
import com.codestates.server.global.exception.ExceptionCode;
import com.codestates.server.global.security.auth.utils.CustomAuthorityUtils;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class MemberService {

    // JpaRepository를 상속받은 memberReposiory
    private final MemberRepository memberRepository;

    // 비밀번호 암호화
    private final PasswordEncoder passwordEncoder;
    // 사용자 권한 설정
    private final CustomAuthorityUtils customAuthorityUtils;
    private final S3UploadService s3UploadService;
    private static final String DEFAULT_IMAGE = "http://bit.ly/46a2mSp";
    private static final String MEMBER_IMAGE_PROCESS_TYPE = "profile-image";



    /**
     * 회원 가입 로직
     * 존재하는 회원인지 확인한다.
     *
     * @param member
     * @return
     */
    public Member createMember(Member member){

        // 가입된 이메일인지 확인
        verifiyExistedMember(member.getEmail());

        // 비밀번호 암호화
        String encrpytedPassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encrpytedPassword);

        // 이메일로 사용자 역할 DB에 저장
        List<String> roles = customAuthorityUtils.createRoles(member.getEmail());
        member.setRoles(roles);

        if(member.getProfileImage() == null) {
            member.setProfileImage(DEFAULT_IMAGE);
        } else {
            member.setProfileImage(member.getProfileImage());
        }

        // 예외 발생 안 시키면 저장
        Member savedMember = memberRepository.save(member);

        return savedMember;
    }

    public Member updateMember(Member member){

        // 없는 회원이면 예외 발생
        Member getMember = getVerifiedMember(member.getMemberId());

        // 로그인한 MemberId랑 업데이트 하려는 마이페이지의 memberId랑 다르면 예외 발생
        if(!getLoginMember().getMemberId().equals(getMember.getMemberId()))
            throw new BusinessLogicException(ExceptionCode.UNAUTHORIZED_USER);

        Optional.ofNullable(member.getName())
                .ifPresent(nickname -> getMember.setName(member.getName()));
        Optional.ofNullable(member.getPassword())
                .ifPresent(password -> getMember.setPassword(member.getPassword()));
        Optional.ofNullable(member.getProfileImage())
                .ifPresent(image -> getMember.setProfileImage(member.getProfileImage()));

        return memberRepository.save(getMember);
    }

    public String uploadImage(Long memberId, MultipartFile file) {
        // 회원 검증 하기
        Member member = getVerifiedMember(memberId);
        // 현재 프로필 이미지 가지고 오기
        String presentProfileImage = member.getProfileImage();
        // 만약에 현재 파일이 있으면 현재 파일 삭제
        if (presentProfileImage != null && presentProfileImage.equals(DEFAULT_IMAGE)) {
            s3UploadService.deleteImageFromS3(presentProfileImage, MEMBER_IMAGE_PROCESS_TYPE);
        }
        // profileImage 새로운 imgae로 upload 하기
        String newProfileImage = null;
        // 새로운 파일 업로드 하는 메서드 (파일, x좌표, y좌표, 가로, 세로)
        newProfileImage = s3UploadService.uploadProfileImage(file, MEMBER_IMAGE_PROCESS_TYPE);
        // 회원 profileImage에 set 하고 save
        member.setProfileImage(newProfileImage);
        // 새로운 이미지 URL을 멤버 객체에 설정
        member.setProfileImage(newProfileImage);
        // 회원 정보 업데이트
        memberRepository.save(member);

        return newProfileImage;
    }

    public String deleteProfileImage(Long memberId) {
        // 회원 검증 하기
        Member member = getVerifiedMember(memberId);

        // 현재 프로필 이미지 URL을 가져옵니다.
        String currentProfileImage = member.getProfileImage();

        // S3에서 현재 이미지 삭제
        if (currentProfileImage != null && !currentProfileImage.equals(DEFAULT_IMAGE)) {
            s3UploadService.deleteImageFromS3(currentProfileImage, MEMBER_IMAGE_PROCESS_TYPE);
        }

        // DB에서 프로필 이미지 URL 기본 설정
        member.setProfileImage(DEFAULT_IMAGE);
        memberRepository.save(member);

        return DEFAULT_IMAGE;
    }

    // member 사용자 정보 가지고 오는 메서드
    public Member getMember(Long memberId) {
        Member member = getVerifiedMember(memberId);

        return member;
    }

    // member 전체 정보 가지고 오는 메서드로 pagination
    public Page<Member> getMembers(int page, int size) {
        return memberRepository.findAll(PageRequest.of(page, size,
                Sort.by("memberId").descending()));
    }

    // member 삭제하는 deleteMember 메서드
    public void deleteMember(Long memberId) {
        Member getMember = getVerifiedMember(memberId);

        // 만약 로그인 한 사용자랑 회원 삭제 하려는 회원이랑 memberId 다르면 예외 던지기
        if(!getLoginMember().getMemberId().equals(getMember.getMemberId()))
            throw new BusinessLogicException(ExceptionCode.UNAUTHORIZED_USER);

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
        Member getMember =
                member.orElseThrow(() -> new BusinessLogicException(ExceptionCode.USER_NOT_FOUND));

        return getMember;
    }


    /**
     * 이미 가입한 회원인지 확인하는 메서드
     * 만약 가입 되어있으면 예외 던지기
     * @param email
     */
    private void verifiyExistedMember(String email) {

        Optional<Member> optionalMember = memberRepository.findByEmail(email);

        if(optionalMember.isPresent())
            throw new BusinessLogicException(ExceptionCode.USER_EXISTS);

    }

    /**
     * 로그인한 Member를 가지고 오는 메서드
     * @return
     */
    public Member getLoginMember() {
        return memberRepository.findByEmail(AuthUserUtils.getAuthUser().getName())
                .orElseThrow(()-> new BusinessLogicException(ExceptionCode.USER_NOT_FOUND));
    }

}
