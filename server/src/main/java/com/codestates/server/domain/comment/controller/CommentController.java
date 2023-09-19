package com.codestates.server.domain.comment.controller;

import com.codestates.server.domain.answer.entity.Answer;
import com.codestates.server.domain.answer.service.AnswerService;
import com.codestates.server.domain.comment.dto.CommentPatchDto;
import com.codestates.server.domain.comment.dto.CommentPostDto;
import com.codestates.server.domain.comment.entity.Comment;
import com.codestates.server.domain.comment.mapper.CommentMapper;
import com.codestates.server.domain.comment.service.CommentService;
import com.codestates.server.domain.member.entity.Member;
import com.codestates.server.domain.member.service.MemberService;
import com.codestates.server.global.uri.UriCreator;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.util.Map;

@RestController
@RequestMapping("/answers/{answer-id}/comments")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;
    private final MemberService memberService;
    private final AnswerService answerService;
    private final CommentMapper commentMapper;

    @PostMapping("/create")
    public ResponseEntity<URI> createComment(@Valid @RequestBody CommentPostDto commentPostDto,
                                             @PathVariable("answer-id") Long answerId) {

        Answer answer = answerService.findAnswerById(answerId);
        //회원 검증 진행함
        Member member = memberService.findMember(commentPostDto.getMemberId());

        commentPostDto.setMember(member);
        commentPostDto.setAnswer(answer);

        Comment comment = commentService.createComment(commentMapper.commentPostDtoToComment(commentPostDto));
        Long boardId = answer.getBoard().getBoardId();

        URI location = UriCreator.createUri("/boards",boardId);

        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/{comment-id}")
    public ResponseEntity updateComment(@PathVariable("comment-id") Long commentId,
                                        @PathVariable("answer-id") Long answerId,
                                        @Valid @RequestBody CommentPatchDto commentPatchDto) {

        Answer answer = answerService.findAnswerById(answerId);
        Member member = memberService.verifyAuthorizedUser(commentPatchDto.getMemberId());

        commentPatchDto.setMember(member);
        commentPatchDto.setAnswer(answer);

        Comment comment = commentMapper.commentPatchDtoToComment(commentPatchDto);
        comment.setId(commentId);
        commentService.updateComment(comment);

        return ResponseEntity.accepted().build();
    }


    @DeleteMapping("/{comment-id}")
    public ResponseEntity<Void> deleteReply(@PathVariable("comment-id") Long commentId,
                                            @PathVariable("answer-id") Long answerId) {

        Long memberId = memberService.getLoginMemberId();

        commentService.deleteComment(commentId, answerId, memberId);

        return ResponseEntity.noContent().build();
    }
}
