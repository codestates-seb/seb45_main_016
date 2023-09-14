package com.codestates.server.domain.reply.service;

import com.codestates.server.domain.reply.dto.ReplyPatchDto;
import com.codestates.server.domain.reply.entity.Reply;
import com.codestates.server.domain.reply.repository.ReplyRepository;
import com.codestates.server.global.exception.BusinessLogicException;
import org.springframework.stereotype.Service;
import com.codestates.server.global.exception.ExceptionCode;

import java.util.List;
import java.util.Optional;

@Service
public class ReplyService {
    private final ReplyRepository replyRepository;

    public ReplyService(ReplyRepository replyRepository) {
        this.replyRepository = replyRepository;
    }

    public Reply createReply(Reply reply) {
        return replyRepository.save(reply);
    }

    public Reply updateReply(Long replyId, Reply replyPatchDto) {
        Reply foundReply = findVerifiedReply(replyId);
        Optional.ofNullable(replyPatchDto.getContent())
                .ifPresent(content -> foundReply.setContent(content));
        // 업데이트된 엔티티를 저장합니다.
        return replyRepository.save(foundReply);
    }

    public Reply getReply(Long replyId) {
        return findVerifiedReply(replyId);
    }

    public List<Reply> findReplies() {
        return replyRepository.findAll();
    }

    public void deleteReply(Long replyId) {
        Reply foundReply = findVerifiedReply(replyId);
        replyRepository.delete(foundReply);
    }

    private Reply findVerifiedReply(Long replyId) {
        Optional<Reply> foundReply = replyRepository.findById(replyId);
        return foundReply.orElseThrow(() -> new BusinessLogicException(ExceptionCode.REPLY_NOT_FOUND));
    }
}