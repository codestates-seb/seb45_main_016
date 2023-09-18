package com.codestates.server.domain.answer.service;


import java.util.List;

import javax.persistence.EntityNotFoundException;

import com.codestates.server.domain.answer.entity.Answer;
import com.codestates.server.domain.answer.repository.AnswerRepository;
import com.codestates.server.domain.board.entity.Board;
import com.codestates.server.domain.board.repository.BoardRepository;
import com.codestates.server.domain.board.service.BoardService;
import com.codestates.server.domain.member.entity.Member;
import com.codestates.server.domain.member.service.MemberService;
import com.codestates.server.global.exception.BusinessLogicException;
import com.codestates.server.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AnswerService {

	private final AnswerRepository answerRepository;
	private final BoardService boardService;
	private final BoardRepository boardRepository;
	private final MemberService memberService;

	public Answer createAnswer(Answer answer, Long boardId, Long memberId) {
		// 가입된 회원인지 검증하기
		Member getMember = memberService.getVerifiedMember(memberId);

		Board board = boardRepository.findById(boardId).orElseThrow(() -> new BusinessLogicException(ExceptionCode.BOARD_NOT_FOUND));
		answer.setBoard(board);
		answer.setMember(getMember);
		answerRepository.save(answer);
		return answer;
	}

	public Answer updateAnswer(Answer answer, long boardId, long memberId) {

		// 로그인한 회원 객체랑 현재 회원 아이디랑 비교해서 확인
		memberService.verifyAuthorizedUser(memberId);

		Board board = boardService.findBoard(boardId);
		Answer existingAnswer = findAnswerById(answer.getAnswerId());

		if(existingAnswer != null) {
			existingAnswer.setContent(answer.getContent());
			answerRepository.save(existingAnswer);

			return existingAnswer;
		} else throw new BusinessLogicException(ExceptionCode.ANSWER_NOT_FOUND);
	}

	public List<Answer> findByBoardId(long boardId){
		return answerRepository.findByBoardId(boardId);
	}

	public void deleteAnswer(long boardId, long answerId, long memberId) {

		memberService.verifyAuthorizedUser(memberId);

		Answer existingAnswer = findAnswerById(answerId);

		if(existingAnswer != null) {
			if(existingAnswer.getBoard().getBoardId() == boardId) {
				answerRepository.deleteById(answerId);
			} else throw new BusinessLogicException(ExceptionCode.BOARD_NOT_FOUND);
		} throw new BusinessLogicException(ExceptionCode.ANSWER_NOT_FOUND);
}

	public Answer findAnswerById(long answerId) {
		return answerRepository.findById(answerId).orElse(null);
	}

}
