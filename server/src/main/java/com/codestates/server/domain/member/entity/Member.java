package com.codestates.server.domain.member.entity;

import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;


@Getter
@Setter
@RequiredArgsConstructor
@Entity
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

    private String email;

    private String name; // 닉네임

    private String phone;

    private String password;

    private String profileImage;


//    좋아요 리스트에는 자격증 이름, 날짜 다 갖고 있어야 함(날짜는 잘라서 줄 것)
//    private List<Like> likeList;

//    private List<Board> boardList;

//    public List<MemberBoardInfo> getMemberBoardInfo() {}

    // 멤버 당 하나의 권한을 가지기 때문에 즉시 로딩 괜찮음 (즉시로딩 N : 1은 괜찮으나 1:N은 안됨)
    // 사용자 등록 시 사용자의 권한 등록을 위해 권한 테이블 생성
    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();



}
