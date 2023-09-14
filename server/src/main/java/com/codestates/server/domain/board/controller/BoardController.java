package com.codestates.server.domain.board.controller;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.codestates.server.domain.answer.service.AnswerService;
import com.codestates.server.domain.board.dto.*;
import com.codestates.server.domain.board.entity.Board;

import com.codestates.server.global.dto.MultiResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.codestates.server.domain.board.mapper.BoardMapper;
import com.codestates.server.domain.board.service.BoardService;
import com.codestates.server.global.uri.UriCreator;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/boards")
@Slf4j
@RequiredArgsConstructor
@CrossOrigin(origins = "", allowedHeaders = "")
public class BoardController {

	private final BoardService boardService;
	private final AnswerService answerService;
	private final BoardMapper mapper;

	// 게시글 등록
	@PostMapping("/create")
	public ResponseEntity postBoard(@RequestBody BoardPostDto boardPostDto) {
		Long memberId = boardPostDto.getMemberId();
		Board board = boardService.createBoard(mapper.boardPostDtoToBoard(boardPostDto), memberId);
		URI location = UriCreator.createUri("/boards", board.getBoardId());

		return ResponseEntity.created(location).build();
	}

	//게시글 수정
	@PatchMapping("/edit/{board-id}")
    public ResponseEntity patchBoard(@PathVariable("board-id") Long boardId,
                              	     @RequestBody BoardPatchDto boardPatchDto) {
        boardPatchDto.setBoardId(boardId);
        Long userId = boardPatchDto.getMemberId();
        Board board = mapper.boardPatchDtoToBoard(boardPatchDto);
        boardService.updateBoard(board, userId);

        return ResponseEntity.accepted().build();
    }

	//게시글 조회
	@GetMapping("/{board-id}")
	public ResponseEntity getBoard(@PathVariable("board-id") Long boardId) {
		Board board = boardService.findBoard(boardId);
		BoardResponseDto response = mapper.boardToBoardResponseDto(board);

		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	//게시글 목록 조회(페이지네이션)
	@GetMapping
	public ResponseEntity getBoards(@RequestParam int page){

		Page<Board> pageBoards = boardService.findBoards(page);
		List<Board> boards = pageBoards.getContent();

		List<BoardPageResponse> boardPageResponses = mapper.boardToBoardPageResponseDto(boards);

		return new ResponseEntity<>(
				new MultiResponseDto<>(boardPageResponses, pageBoards), HttpStatus.OK);
	}


	//게시글 삭제
	@DeleteMapping("/delete/{board-id}")
	public ResponseEntity<?> deleteBoard(@PathVariable("board-id") Long boardId,
		 							     @RequestBody Map<String, Long> data) {
		Long memberId = data.get("memberId");
		boardService.deleteBoard(boardId, memberId);

		return new ResponseEntity(HttpStatus.NO_CONTENT);
	}

}
