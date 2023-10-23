package com.codestates.server.domain.member.dto;

import com.codestates.server.domain.board.entity.Board;
import com.codestates.server.domain.bookmark.entity.Bookmark;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

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

    private String name;

    private String phone;

    private String password;

    private String profileImage;

    private List<Bookmark> Bookmarks;

    private List<Board> boards;

    private List<String> roles;
}
