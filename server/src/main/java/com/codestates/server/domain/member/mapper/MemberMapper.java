package com.codestates.server.domain.member.mapper;

import com.codestates.server.domain.member.dto.MemberLoginResponseDto;
import com.codestates.server.domain.member.dto.MemberPatchDto;
import com.codestates.server.domain.member.dto.MemberPostDto;
import com.codestates.server.domain.member.dto.MemberResponseDto;
import com.codestates.server.domain.member.entity.Member;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface MemberMapper {

    Member memberPostDtoToMember(MemberPostDto memberPostDto);

    Member memberPatchDtoToMember(MemberPatchDto memberPatchDto);

    MemberResponseDto memberToMemberResponseDto(Member member);

    MemberLoginResponseDto memberToMemberLoginResponseDto(Member member);

    List<MemberResponseDto> membersTomemberResponseDto(List<Member> members);

}
