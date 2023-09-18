package com.codestates.server.domain.board.service;

import java.util.List;

import com.codestates.server.global.exception.BusinessLogicException;
import com.codestates.server.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.transaction.annotation.Transactional;

import org.springframework.stereotype.Service;

import com.codestates.server.domain.board.entity.Board;
import com.codestates.server.domain.board.repository.BoardRepository;
import com.codestates.server.domain.member.entity.Member;
import com.codestates.server.domain.member.repository.MemberRepository;
import com.codestates.server.domain.member.service.MemberService;

@Service
@Transactional
@RequiredArgsConstructor
public class BoardService {

	private final BoardRepository boardRepository;
	private final MemberRepository memberRepository;
	private final MemberService memberService;

	public List<Board> findTop5Boards(){
		List<Board> top6ByOrderByBoardIdDesc = boardRepository.findTop6ByOrderByBoardIdDesc();

		return top6ByOrderByBoardIdDesc;
	}

	public Board createBoard(Board board, Long memberId) {
		// 회원인지 확인
		Member getMember = memberService.getVerifiedMember(memberId);

		board.setMember(getMember);
		board.setViews(0L);
		return boardRepository.save(board);

	}

	public Board updateBoard(Board board, Long memberId) {
		// 회원아이디랑 로그인된 객체 정보랑 동일한지 확인
		memberService.verifyAuthorizedUser(memberId);

		Board findedBoard = boardRepository.findById(board.getBoardId())
			.orElseThrow(() -> new BusinessLogicException(ExceptionCode.BOARD_NOT_FOUND));

		findedBoard.setTitle(board.getTitle());
		findedBoard.setContent(board.getContent());
		BeanUtils.copyProperties(findedBoard,board,"board-id");

		return boardRepository.save(board);
	}

	public Board findBoard(Long boardsId) {

		Board board = boardRepository.findById(boardsId)
			.orElseThrow(() -> new BusinessLogicException(ExceptionCode.BOARD_NOT_FOUND));

		Member member = board.getMember();
		member.getName();
		member.getEmail();
		member.getProfileImage();

		board.setMember(member);

		viewCountUp(board);
		boardRepository.save(board);

		return board;
	}

	public void getBoard(Long boardId) {
		boardRepository.findById(boardId).orElseThrow(() -> new BusinessLogicException(ExceptionCode.BOARD_NOT_FOUND));

	}

	/**
	 * 페이지 전체 조회
	 * @param page : 조회할 페이지
	 * @return
	 */
	public Page<Board> findBoards(int page){
		int size = 6;
		Page<Board> boardPage = boardRepository.findAll(PageRequest.of(page - 1, size));
		return boardPage;
	}

	public List<Board> findAllBoards() {
		return boardRepository.findAll();
	}

	public void deleteBoard(Long boardId, Long memberId) {
		// 회원아이디랑 로그인된 객체 정보랑 동일한지 확인
		memberService.verifyAuthorizedUser(memberId);

		Board findBoard = boardRepository.findById(boardId)
				.orElseThrow(() -> new BusinessLogicException(ExceptionCode.BOARD_NOT_FOUND));

		boardRepository.delete(findBoard);

	}

	private static void viewCountUp(Board board) {
		Long view = board.getViews();
		board.setViews(++view);
	}

	public List<Board> findBoardsByKeyword(String keyword) {
		List<Board> byTitleContaining = boardRepository.findByTitleContaining(keyword);

		return byTitleContaining;
	}
}
