package com.codestates.server.domain.comment.service;

import com.codestates.server.domain.comment.entity.Comment;
import com.codestates.server.domain.comment.repository.CommentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;

    public Comment createComment(Comment comment) {
        return commentRepository.save(comment);
    }


    public void updateComment(Comment comment) {

        Comment existComment = findCommentById(comment.getId());

        if(existComment != null){
            Comment updatedComment = commentRepository.save(comment);

        }else {
            throw new RuntimeException("comment가 없습니다.");
        }
    }


    public void deleteComment(long commentId, long answerId, long memberId) {

        Comment existingComment = findCommentById(commentId);

        if (existingComment != null) {
            if (existingComment.getAnswer().getAnswerId() == answerId && existingComment.getMember().getMemberId() == memberId) {
                commentRepository.deleteById(commentId);
            } else {
                throw new RuntimeException("에러발생");
            }
        }else {
            throw new RuntimeException("comment가 없습니다.");
        }
    }


    public Comment findCommentById(long commentId) {
        return commentRepository.findById(commentId).orElseThrow(()->new RuntimeException("없습니다."));
    }

}
