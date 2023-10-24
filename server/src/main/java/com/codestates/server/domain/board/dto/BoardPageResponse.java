package com.codestates.server.domain.board.dto;

import com.codestates.server.domain.member.dto.MemberBoardResponseDto;
import com.codestates.server.domain.member.entity.Member;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BoardPageResponse {

    private Long boardId;

    private String title;

    private String content;

    private Long views;

    private LocalDateTime modifiedAt;

    private MemberBoardResponseDto boardCreator;

}
