package com.codestates.server.domain.board.service;

import java.util.List;
import java.util.Optional;

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

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class BoardService {

	private final BoardRepository boardRepository;
	private final MemberRepository memberRepository;
	private final MemberService memberService;

	public Page<Board> findBoards(int page){
		int size = 6;
		Page<Board> boardPage = boardRepository.findAll(PageRequest.of(page - 1, size));
		return boardPage;
	}

	public Board createBoard(Board board, Long memberId) {
		// 권한 인증 security 구성 필요함.

		// ✨(솔이님 첨삭) -> 저장된 멤버인지 확인하고 아니면 에러 발생 메서드 추가
		Optional<Member> member = memberRepository.findById(memberId);
		Member getMember = member.orElseThrow(() -> new RuntimeException("🚨 회원 정보를 찾을 수 없습니다. 🚨"));

		board.setMember(getMember);
		board.setViews(0L);
		return boardRepository.save(board);

	}

	public Board updateBoard(Board board, Long memberId) {

		Board findedBoard = boardRepository.findById(board.getBoardId())
			.orElseThrow(RuntimeException::new);

		long savedMemberId = findedBoard.getMember().getMemberId();

		if(memberId.equals(savedMemberId)) {
			findedBoard.setTitle(board.getTitle());
			findedBoard.setContent(board.getContent());
			BeanUtils.copyProperties(findedBoard,board,"board-id");
			return boardRepository.save(board);
		} else {
			throw new RuntimeException();
		}
	}

	public Board findBoard(Long boardsId) {
		Board board = boardRepository.findById(boardsId)
			.orElseThrow(RuntimeException::new);

		// ✨(솔이님 첨삭) 멤버 이미지 가지고와서 set
		Member member = board.getMember();
		member.getName();
		member.getEmail();
		member.getProfileImage();

		board.setMember(member);

		viewCountUp(board);
		boardRepository.save(board);

		return board;
	}

	public List<Board> findAllBoards() {
		return boardRepository.findAll();
	}


	// ✨(솔이님 첨삭) 메서드 전체 변경
	public void deleteBoard(Long boardId, Long memberId) {
		Board findBoard = boardRepository.findById(boardId)
				.orElseThrow(RuntimeException::new);

		long savedMemberId = findBoard.getMember().getMemberId();

		if(memberId.equals(savedMemberId)) {
			boardRepository.delete(findBoard);
		} else {
			throw new RuntimeException();
		}
	}

	private static void viewCountUp(Board board) {
		Long view = board.getViews();
		board.setViews(++view);
	}

}
