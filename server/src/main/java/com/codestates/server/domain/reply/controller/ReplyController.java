package com.codestates.server.domain.reply.controller;


import com.codestates.server.domain.reply.dto.ReplyPatchDto;
import com.codestates.server.domain.reply.dto.ReplyPostDto;
import com.codestates.server.domain.reply.dto.ReplyResponseDto;
import com.codestates.server.domain.reply.entity.Reply;
import com.codestates.server.domain.reply.mapper.ReplyMapper;
import com.codestates.server.domain.reply.service.ReplyService;
import com.codestates.server.global.uri.UriCreator;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;

@RestController
@RequestMapping("/answers/replies")
@RequiredArgsConstructor
public class ReplyController {
    private final ReplyService replyService;
    private final ReplyMapper replyMapper;

    @PostMapping("/create")
    public ResponseEntity<ReplyResponseDto> createReply(@Valid @RequestBody ReplyPostDto replyPostDto) {
        Reply createdReply = replyService.createReply(replyMapper.replyPostDtoToReply(replyPostDto));
        ReplyResponseDto responseDto = replyMapper.replyToReplyResponseDto(createdReply);

        // 현재 요청의 URI를 가져와서 생성된 리소스의 ID를 추가합니다.
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{replyId}")
                .buildAndExpand(responseDto.getReplyId())
                .toUri();

        return ResponseEntity.created(location).body(responseDto);
    }

    @PatchMapping("/{reply-id}")
    public ResponseEntity<ReplyResponseDto> updateReply(
            @PathVariable("reply-id") Long replyId,
            @Valid @RequestBody ReplyPatchDto replyPatchDto) {
        Reply replyToUpdate = replyMapper.replyPatchDtoToReply(replyPatchDto);
        Reply updatedReply = replyService.updateReply(replyId, replyToUpdate);
        ReplyResponseDto responseDto = replyMapper.replyToReplyResponseDto(updatedReply);
        return ResponseEntity.ok(responseDto);
    }

    @GetMapping("/{reply-id}")
    public ResponseEntity<ReplyResponseDto> getReply(@PathVariable("reply-id") Long replyId) {
        Reply reply = replyService.getReply(replyId);
        ReplyResponseDto responseDto = replyMapper.replyToReplyResponseDto(reply);
        return ResponseEntity.ok(responseDto);
    }

    @DeleteMapping("/{reply-id}/delete")
    public ResponseEntity<Void> deleteReply(@PathVariable("reply-id") Long replyId) {
        replyService.deleteReply(replyId);
        return ResponseEntity.noContent().build();
    }
}