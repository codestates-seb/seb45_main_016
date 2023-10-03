package com.codestates.server.domain.answer.mapper;

import java.util.List;

import org.mapstruct.Mapper;

import com.codestates.server.domain.answer.dto.AnswerPatchDto;
import com.codestates.server.domain.answer.dto.AnswerPostDto;
import com.codestates.server.domain.answer.dto.AnswerResponseDto;
import com.codestates.server.domain.answer.entity.Answer;

@Mapper(componentModel = "spring")
public interface AnswerMapper {

	default Answer answerPostDtoToAnswer(AnswerPostDto answerPostDto) {
		if (answerPostDto == null) {
			return null;
		} else {
			Answer answer = new Answer();
			answer.setContent(answerPostDto.getContent());
			return answer;
		}
	}

	Answer answerPatchDtoToAnswer(AnswerPatchDto answerPatchDto);

	default AnswerResponseDto answerToAnswerResponseDto(Answer answer) {
		if (answer == null) {
			return null;
		} else {
			AnswerResponseDto answerResponseDto = new AnswerResponseDto();
			answerResponseDto.setMemberId(answer.getMember().getMemberId());
			answerResponseDto.setAnswerId(answer.getAnswerId());
			answerResponseDto.setContent(answer.getContent());
			return answerResponseDto;
		}
	}

	List<AnswerResponseDto> answerListToAnswerResponseDto(List<Answer> answer);
}
