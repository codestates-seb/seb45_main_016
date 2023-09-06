package com.codestates.server.domain.board.mapper;

import java.util.List;

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
//		board.setMemberNickname(boardPostDto.getMemberNickname());
//		board.setMemberEmail(board.getMemberEmail());
		board.setTitle(boardPostDto.getTitle());
		board.setContent(boardPostDto.getContent());
		board.setViews((long)boardPostDto.getViews());
		board.setVideoLink(boardPostDto.getVideoLink());
		board.setBookLink(boardPostDto.getBookLink());

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

		// ModifiedAt() 구성해야함.

		return boardResponseDto;
	}

	List<BoardResponseDto> boardsToBoardResponseDto(List<Board> boards);
}
