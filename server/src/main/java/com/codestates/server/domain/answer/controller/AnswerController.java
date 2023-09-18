package com.codestates.server.domain.answer.controller;

import java.net.URI;
import java.util.Map;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

import com.codestates.server.domain.answer.dto.AnswerPatchDto;
import com.codestates.server.domain.answer.dto.AnswerPostDto;
import com.codestates.server.domain.answer.entity.Answer;
import com.codestates.server.domain.answer.mapper.AnswerMapper;
import com.codestates.server.domain.answer.service.AnswerService;
import com.codestates.server.global.uri.UriCreator;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/boards/{board-id}/answers")
@RequiredArgsConstructor
@Slf4j
public class AnswerController {

	private final AnswerService answerService;
	private final AnswerMapper mapper;

	@PostMapping
	public ResponseEntity<URI> createAnswer(@Valid @RequestBody AnswerPostDto answerPostDto,
												 @PathVariable("board-id") Long boardId) {

		Answer answer = answerService.createAnswer(mapper.answerPostDtoToAnswer(answerPostDto), boardId, answerPostDto.getMemberId());

		URI location = UriCreator.createUri("/boards/",boardId); // hae02y: 보드로 이동 됩니다.
			return ResponseEntity.created(location).build();
	}

	@PatchMapping("/{answer-id}")
	public ResponseEntity updateAnswer(
		@PathVariable("answer-id") @Positive long answerId,
		@PathVariable("board-id") @Positive long boardId,
		@RequestBody @Valid AnswerPatchDto answerPatchDto) {

		answerPatchDto.setAnswerId(answerId);

		Long memberId = answerPatchDto.getMemberId();
		answerService.updateAnswer(
			mapper.answerPatchDtoToAnswer(answerPatchDto), boardId, memberId);

		return ResponseEntity.accepted().build();
	}

	@DeleteMapping("/{answer-id}")
	public ResponseEntity deleteAnswer(
		@PathVariable("answer-id") @Positive Long answerId,
		@PathVariable("board-id") @Positive Long boardId,
		@RequestBody Map<String, Long> data) {

		Long memberId = data.get("memberId");
		answerService.deleteAnswer(boardId, answerId, memberId);

		return ResponseEntity.noContent().build();
	}
}
