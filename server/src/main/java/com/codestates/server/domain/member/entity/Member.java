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

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false, unique = true)
    private String name; // 닉네임

    @Column(nullable = false, unique = true)
    private String phone;

    private String password;

    private String profileImage;

    private String provider;

//    좋아요 리스트에는 자격증 이름, 날짜 다 갖고 있어야 함(날짜는 잘라서 줄 것)
//    private List<Like> likeList;

//    private List<Board> boardList;

//    public List<MemberBoardInfo> getMemberBoardInfo() {}

    // 멤버 당 하나의 권한을 가지기 때문에 즉시 로딩 괜찮음 (즉시로딩 N : 1은 괜찮으나 1:N은 안됨)
    // 사용자 등록 시 사용자의 권한 등록을 위해 권한 테이블 생성
    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

    // ✨ v5,v6
//    @Builder
//    public Member(Long memberId, String nickname, String email, String password, String profileImage, String provider, List<String> roles) {
//        this.memberId = memberId;
//        this.nickname = nickname;
//        this.email = email;
//        this.password = password;
//        this.profileImage = profileImage;
//        this.roles = roles;
//        this.provider = provider;
//    }

}
