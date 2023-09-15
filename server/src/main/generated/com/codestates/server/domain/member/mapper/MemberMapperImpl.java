package com.codestates.server.domain.member.mapper;

import com.codestates.server.domain.member.dto.MemberBoardResponseDto;
import com.codestates.server.domain.member.dto.MemberImagePatchDto;
import com.codestates.server.domain.member.dto.MemberPatchDto;
import com.codestates.server.domain.member.dto.MemberPostDto;
import com.codestates.server.domain.member.dto.MemberResponseDto;
import com.codestates.server.domain.member.entity.Member;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-09-15T19:16:01+0900",
    comments = "version: 1.4.2.Final, compiler: javac, environment: Java 11.0.20 (Azul Systems, Inc.)"
)
@Component
public class MemberMapperImpl implements MemberMapper {

    @Override
    public Member memberPostDtoToMember(MemberPostDto memberPostDto) {
        if ( memberPostDto == null ) {
            return null;
        }

        Member member = new Member();

        member.setEmail( memberPostDto.getEmail() );
        member.setName( memberPostDto.getName() );
        member.setPhone( memberPostDto.getPhone() );
        member.setPassword( memberPostDto.getPassword() );

        return member;
    }

    @Override
    public Member memberPatchDtoToMember(MemberPatchDto memberPatchDto) {
        if ( memberPatchDto == null ) {
            return null;
        }

        Member member = new Member();

        member.setMemberId( memberPatchDto.getMemberId() );
        member.setName( memberPatchDto.getName() );
        member.setPhone( memberPatchDto.getPhone() );
        member.setPassword( memberPatchDto.getPassword() );
        member.setProfileImage( memberPatchDto.getProfileImage() );

        return member;
    }

    @Override
    public Member memberImagePatchDtoToMember(MemberImagePatchDto memberImagePatchDto) {
        if ( memberImagePatchDto == null ) {
            return null;
        }

        Member member = new Member();

        member.setProfileImage( memberImagePatchDto.getProfileImage() );

        return member;
    }

    @Override
    public MemberResponseDto memberToMemberResponseDto(Member member) {
        if ( member == null ) {
            return null;
        }

        String memberId = null;
        String email = null;
        String name = null;
        String phone = null;
        String profileImage = null;

        if ( member.getMemberId() != null ) {
            memberId = String.valueOf( member.getMemberId() );
        }
        email = member.getEmail();
        name = member.getName();
        phone = member.getPhone();
        profileImage = member.getProfileImage();

        MemberResponseDto memberResponseDto = new MemberResponseDto( memberId, email, name, phone, profileImage );

        return memberResponseDto;
    }

    @Override
    public List<MemberResponseDto> membersTomemberResponseDto(List<Member> members) {
        if ( members == null ) {
            return null;
        }

        List<MemberResponseDto> list = new ArrayList<MemberResponseDto>( members.size() );
        for ( Member member : members ) {
            list.add( memberToMemberResponseDto( member ) );
        }

        return list;
    }

    @Override
    public MemberBoardResponseDto memberToMemberBoardResponseDto(Member member) {
        if ( member == null ) {
            return null;
        }

        Long memberId = null;
        String email = null;
        String name = null;
        String profileImage = null;

        memberId = member.getMemberId();
        email = member.getEmail();
        name = member.getName();
        profileImage = member.getProfileImage();

        MemberBoardResponseDto memberBoardResponseDto = new MemberBoardResponseDto( memberId, email, name, profileImage );

        return memberBoardResponseDto;
    }
}
