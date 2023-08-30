package com.codestates.server.member.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Member {

    private Long memberId;

    private String email;

    private String nickname; // 닉네임

    private String password;

    private String profileImage;

//    좋아요 리스트에는 자격증 이름, 날짜 다 갖고 있어야 함(날짜는 잘라서 줄 것)
//    private List<Like> likeList;

//    private List<Board> boardList;

//    public List<MemberBoardInfo> getMemberBoardInfo() {}


}
