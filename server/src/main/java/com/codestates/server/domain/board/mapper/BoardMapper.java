package com.codestates.server.domain.board.mapper;

import java.util.List;

import com.codestates.server.domain.member.dto.MemberBoardResponseDto;
import com.codestates.server.domain.member.dto.MemberResponseDto;
import org.mapstruct.Mapper;

import com.codestates.server.domain.board.dto.BoardPatchDto;
import com.codestates.server.domain.board.dto.BoardPostDto;
import com.codestates.server.domain.board.dto.BoardResponseDto;
import com.codestates.server.domain.board.entity.Board;
import com.codestates.server.domain.member.entity.Member;

@Mapper(componentModel = "spring")
public interface BoardMapper {

	default Board boardPostDtoToBoard(BoardPostDto boardPostDto) {
		if (boardPostDto == null) {
			return null;
		}

		Board board = new Board();
		Member member = new Member();

		member.setMemberId(boardPostDto.getMemberId());

		board.setMember(member);
		board.setTitle(boardPostDto.getTitle());
		board.setContent(boardPostDto.getContent());
		board.setViews((long)boardPostDto.getViews());

		return board;
	}

	Board boardPatchDtoToBoard(BoardPatchDto boardPatchDto);

	default BoardResponseDto boardToBoardResponseDto(Board board) {
		if (board == null) {
			return null;
		}

		BoardResponseDto boardResponseDto = new BoardResponseDto();

		boardResponseDto.setBoardId(board.getBoardId());
		boardResponseDto.setTitle(board.getTitle());
		boardResponseDto.setContent(board.getContent());
		boardResponseDto.setViews(board.getViews());
		boardResponseDto.setModifiedAt(board.getModifiedAt());

		MemberBoardResponseDto memberBoardResponseDto = new MemberBoardResponseDto(board.getMember().getMemberId(),
				board.getMember().getEmail(),
				board.getMember().getName(),
				board.getMember().getProfileImage());

		boardResponseDto.setBoardCreater(memberBoardResponseDto);

		return boardResponseDto;
	}

	List<BoardResponseDto> boardsToBoardResponseDto(List<Board> boards);
}
