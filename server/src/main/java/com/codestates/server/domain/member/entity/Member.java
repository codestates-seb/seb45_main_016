package com.codestates.server.domain.member.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false, unique = true)
    private String nickname; // 닉네임

    @Column(nullable = false)
    private String password;

    private String profileImage;

//    좋아요 리스트에는 자격증 이름, 날짜 다 갖고 있어야 함(날짜는 잘라서 줄 것)
//    private List<Like> likeList;

//    private List<Board> boardList;

//    public List<MemberBoardInfo> getMemberBoardInfo() {}


}
