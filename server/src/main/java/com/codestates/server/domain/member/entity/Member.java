package com.codestates.server.domain.member.entity;

import com.codestates.server.domain.answer.entity.Answer;
import com.codestates.server.domain.board.entity.Board;
import com.codestates.server.domain.bookmark.entity.Bookmark;
import com.codestates.server.domain.comment.entity.Comment;
import com.fasterxml.jackson.annotation.JsonIgnore;
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

    // 멤버 당 하나의 권한을 가지기 때문에 즉시 로딩 괜찮음 (즉시로딩 N : 1은 괜찮으나 1:N은 안됨)
    // 사용자 등록 시 사용자의 권한 등록을 위해 권한 테이블 생성
    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<Board> boards;

    @JsonIgnore
    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<Answer> answers;

    @JsonIgnore
    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<Comment> comments;

    @JsonIgnore
    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<Bookmark> Bookmarks;

}
