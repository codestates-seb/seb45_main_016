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
	private final MemberRepository memberRepository;

	public Answer createAnswer(Answer answer, Long boardId, Long memberId) {

		Optional<Member> member = memberRepository.findById(memberId);
		Member getMember = member.orElseThrow(() -> new RuntimeException("🚨 회원 정보를 찾을 수 없습니다. 🚨"));
		// 🔴 로그인 파트 완료되면 로그인한 사용자 정보 가지고 오는걸로 수정해야함.
		Board board = boardService.findBoard(boardId);
		answer.setBoard(board);
		answer.setMember(getMember);
		answerRepository.save(answer);
		return answer;
	}

	public Answer updateAnswer(Answer answer, long boardId, long memberId) {
		Board board = boardService.findBoard(boardId);
		Answer existingAnswer = findAnswerById(answer.getAnswerId());

		if(existingAnswer != null) {

			if(existingAnswer.getMember().getMemberId().equals(memberId)) {
				existingAnswer.setContent(answer.getContent());
				answerRepository.save(existingAnswer);
				return existingAnswer;
			} else throw new RuntimeException("본인이 작성한 댓글만 수정﹒삭제가 가능합니다.");
		}

		throw new EntityNotFoundException("답변이 확인되지 않습니다.");
	}

	public List<Answer> findByBoardId(long boardId){
		return answerRepository.findByBoardId(boardId);
	}

	public void deleteAnswer(long boardId, long answerId, long memberId) {
		Answer existingAnswer = findAnswerById(answerId);


		if (existingAnswer != null) {
			if (existingAnswer.getBoard().getBoardId() == boardId && existingAnswer.getMember().getMemberId() == memberId) {
				answerRepository.deleteById(answerId);
			} else {
				throw new RuntimeException("에러발생");
		}
	}else {
			throw new RuntimeException("answer가 없습니다.");
		}
}


	public Answer findAnswerById(long answerId) {
		return answerRepository.findById(answerId).orElse(null);
	}

}
