package com.codestates.server.member.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/members")
@Validated
public class MemberController {


    @PostMapping("/signup")
    public ResponseEntity postMember() {


        return new ResponseEntity(HttpStatus.CREATED);
    }

    @PatchMapping("/mypage/edit/{member-id}")
    public ResponseEntity patchMember(@PathVariable("member-id") Long memberId) {


        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping("/mypage/{member-id}")
    public ResponseEntity getMember(@PathVariable("member-id") Long memberId) {


        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping()
    public ResponseEntity getMembers() {

        return new ResponseEntity(HttpStatus.OK);
    }

    @DeleteMapping("/{member-id}")
    public ResponseEntity deleteMember(@PathVariable("member-id") Long memberId) {

        return new ResponseEntity(HttpStatus.NO_CONTENT);

    }
}
