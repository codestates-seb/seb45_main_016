package com.codestates.server.domain.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

/**
 * 마이페이지에서 보여질 요소들
 *
 */
@Getter
@Setter
@AllArgsConstructor
public class MemberResponseDto {

    private String memberId;

    private String email;

    private String nickname;

    private String phone;

    private String profileImage;

//    private List<Like> likeList;
//    private List<Board> boards;

}
