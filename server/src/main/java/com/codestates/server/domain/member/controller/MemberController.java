package com.codestates.server.domain.member.controller;

import com.codestates.server.domain.member.dto.MemberPatchDto;
import com.codestates.server.domain.member.dto.MemberPostDto;
import com.codestates.server.domain.member.dto.MemberResponseDto;
import com.codestates.server.domain.member.entity.Member;
import com.codestates.server.domain.member.mapper.MemberMapper;
import com.codestates.server.global.dto.MultiResponseDto;
import com.codestates.server.domain.member.service.MemberService;
import com.codestates.server.global.uri.UriCreator;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.io.IOException;
import java.net.URI;
import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/members")
@Validated
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class MemberController {

    private final MemberMapper mapper;
    private final MemberService memberService;


    @PostMapping("/signup")
    public ResponseEntity postMember(@Valid
                                     @RequestBody MemberPostDto memberPostDto) {

        Member member = mapper.memberPostDtoToMember(memberPostDto);
        Member createdMember = memberService.createMember(member);

        // 생성된 회원의 ID를 사용해서 회원 생성 위치 URI 생성
        URI location = UriCreator.createUri("/members/signup", member.getMemberId());

        // post는 URI로 넘겨주는 것이 일반적이다.
        ResponseEntity response = ResponseEntity.created(location).build();

//        return new ResponseEntity(createdMember, HttpStatus.CREATED);
        return response;
    }


    @PatchMapping("/mypage/edit/{member-id}")
    public ResponseEntity patchMember(@PathVariable("member-id") @Positive Long memberId,
                                      @RequestBody MemberPatchDto memberPatchDto) {

        memberPatchDto.setMemberId(memberId);

        Member member = memberService.updateMember(mapper.memberPatchDtoToMember(memberPatchDto));
        MemberResponseDto response = mapper.memberToMemberResponseDto(member);

        return new ResponseEntity(response, HttpStatus.OK);
    }

    @PatchMapping("/mypage/image/upload/{member-id}")
    public ResponseEntity uploadImage(@PathVariable("member-id") @Positive Long memberId,
                                      @RequestParam("file") MultipartFile file) {
//                                      ,@RequestParam("x") int x,
//                                      @RequestParam("y") int y,
//                                      @RequestParam("width") int width,
//                                      @RequestParam("height") int height ) throws IOException {

        // 사용자가 마우스로 조절하는 x, y, width, height 값
        String imagePath = memberService.uploadImage(memberId, file);
//        String imagePath = memberService.uploadImage(memberId, file, x, y, width, height);

        URI location = UriCreator.createUri("/members/mypage/edit", memberId);

        // 이미지 업로드 되면서 body에 수정된 이미지 URI 전송
        ResponseEntity response = ResponseEntity.created(location).body(imagePath);

        return response;
    }

    @DeleteMapping("/mypage/image/delete/{member-id}")
    public ResponseEntity deleteImage(@PathVariable("member-id") @Positive Long memberId) {

        String defaultImage = memberService.deleteProfileImage(memberId);

        URI location = UriCreator.createUri("/members/mypage/edit", memberId);

        // 기본 이미지로 다시 업로드 되면서 body에 수정된 이미지 URI 전송
        ResponseEntity response = ResponseEntity.created(location).body(defaultImage);

        return response;
    }

    @GetMapping("/mypage/{member-id}")
    public ResponseEntity getMember(@PathVariable("member-id") @Positive Long memberId) {

        Member member = memberService.getMember(memberId);
        MemberResponseDto response = mapper.memberToMemberResponseDto(member);

        return new ResponseEntity(response, HttpStatus.OK);
    }

    @GetMapping("/info")
    public ResponseEntity getMembers(@Positive @RequestParam int page,
                                     @Positive @RequestParam int size) {

        // 0부터 시작되기 때문에 page-1 한다.
        Page<Member> memberPage = memberService.getMembers(page-1, size);
        List<Member> members = memberPage.getContent();

        return new ResponseEntity(new MultiResponseDto(mapper.membersTomemberResponseDto(members), memberPage), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{member-id}")
    public ResponseEntity deleteMember(@PathVariable("member-id") @Positive Long memberId) {

        memberService.deleteMember(memberId);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
