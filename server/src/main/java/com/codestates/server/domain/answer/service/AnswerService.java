package com.codestates.server.domain.answer.service;


import java.util.List;
import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import com.codestates.server.domain.answer.entity.Answer;
import com.codestates.server.domain.answer.repository.AnswerRepository;
import com.codestates.server.domain.board.entity.Board;
import com.codestates.server.domain.board.repository.BoardRepository;
import com.codestates.server.domain.board.service.BoardService;
import com.codestates.server.domain.member.entity.Member;
import com.codestates.server.domain.member.repository.MemberRepository;
import com.codestates.server.domain.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import com.codestates.server.domain.answer.dto.AnswerResponseDto;

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

		Board board = boardRepository.findById(boardId).orElseThrow(() -> new RuntimeException("board가 없습니다."));
		answer.setBoard(board);
		answer.setMember(getMember);
		answerRepository.save(answer);
		return answer;
	}

	public Answer updateAnswer(Answer answer, long boardId, long memberId) {

		// 로그인한 회원 객체랑 현재 회원 아이디랑 비교해서 확인
		Member getMember = memberService.verifyAuthorizedUser(memberId);

		Board board = boardService.findBoard(boardId);
		Answer existingAnswer = findAnswerById(answer.getAnswerId());

		if(existingAnswer != null) {
			existingAnswer.setContent(answer.getContent());
			answerRepository.save(existingAnswer);

			return existingAnswer;
		} else throw new EntityNotFoundException("답변이 확인되지 않습니다.");
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
			} else throw new RuntimeException("게시글이 존재하지 않습니다");
		} throw new RuntimeException("answer가 없습니다.");
}

	public Answer findAnswerById(long answerId) {
		return answerRepository.findById(answerId).orElse(null);
	}

}
