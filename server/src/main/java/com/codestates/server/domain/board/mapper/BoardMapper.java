package com.codestates.server.domain.board.mapper;

import java.util.ArrayList;
import java.util.List;

import com.codestates.server.domain.answer.dto.AnswerBoardResponseDto;
import com.codestates.server.domain.answer.entity.Answer;
import com.codestates.server.domain.board.dto.BoardPageResponse;
import com.codestates.server.domain.comment.dto.CommentAnswerDto;
import com.codestates.server.domain.comment.entity.Comment;
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

	default List<BoardPageResponse> boardToBoardPageResponseDto(List<Board> board) {
		if (board == null) {
			return null;
		}

		List<BoardPageResponse> boardPageResponses = new ArrayList<>();

		for(Board item : board) {

			BoardPageResponse boardPageResponse = new BoardPageResponse();

			boardPageResponse.setBoardId(item.getBoardId());
			boardPageResponse.setTitle(item.getTitle());
			boardPageResponse.setViews(item.getViews());
			boardPageResponse.setContent(item.getContent());
			boardPageResponse.setModifiedAt(item.getModifiedAt());

			MemberBoardResponseDto memberBoardResponseDto = new MemberBoardResponseDto(item.getMember().getMemberId(),
					item.getMember().getEmail(),
					item.getMember().getName(),
					item.getMember().getProfileImage());

			boardPageResponse.setBoardCreator(memberBoardResponseDto);
			boardPageResponses.add(boardPageResponse);
		}
		return boardPageResponses;
	}

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

		//board작성자를 mapping
		MemberBoardResponseDto memberBoardResponseDto = new MemberBoardResponseDto(board.getMember().getMemberId(),
				board.getMember().getEmail(),
				board.getMember().getName(),
				board.getMember().getProfileImage());

		boardResponseDto.setBoardCreator(memberBoardResponseDto);

		List<AnswerBoardResponseDto> answerBoardResponseDtos = getAnswerBoardResponseDtos(board);

		boardResponseDto.setAnswers(answerBoardResponseDtos);

		return boardResponseDto;
	}

	private static List<AnswerBoardResponseDto> getAnswerBoardResponseDtos(Board board) {
		List<AnswerBoardResponseDto> answerBoardResponseDtos = new ArrayList<>();


		for(Answer answer : board.getAnswers()){
			List<CommentAnswerDto> commentAnswerDtos = new ArrayList<>();
			for(Comment comment : answer.getComments()){
				if(answer.getAnswerId().equals(comment.getAnswer().getAnswerId())) {
					CommentAnswerDto commentAnswerDto = new CommentAnswerDto(comment.getId(),
							comment.getContent(),
							new MemberBoardResponseDto(comment.getMember().getMemberId(),
									comment.getMember().getEmail(),
									comment.getMember().getName(),
									comment.getMember().getProfileImage()));

					commentAnswerDtos.add(commentAnswerDto);
				}
			}

			AnswerBoardResponseDto answerBoardResponseDto = new AnswerBoardResponseDto(answer.getAnswerId(),
					answer.getContent(),
					answer.getModifiedAt(),
					new MemberBoardResponseDto(answer.getMember().getMemberId(),
							answer.getMember().getEmail(),
							answer.getMember().getName(),
							answer.getMember().getProfileImage()),
					commentAnswerDtos
			);

			answerBoardResponseDtos.add(answerBoardResponseDto);
		}
		return answerBoardResponseDtos;
	}

	List<BoardResponseDto> boardsToBoardResponseDto(List<Board> boards);
}
