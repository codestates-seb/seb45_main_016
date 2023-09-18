package com.codestates.server.domain.comment.service;

import com.codestates.server.domain.comment.entity.Comment;
import com.codestates.server.domain.comment.repository.CommentRepository;
import com.codestates.server.domain.member.entity.Member;
import com.codestates.server.domain.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final MemberService memberService;

    /**
     * comment 등록
     * @param comment
     * @return
     */
    public Comment createComment(Comment comment) {

        return commentRepository.save(comment);
    }

    /**
     * comment 수정
     * @param comment
     * @return
     */
    public void updateComment(Comment comment) {

        Comment existComment = findCommentById(comment.getId());

        if(existComment != null){
            Comment updatedComment = commentRepository.save(comment);

        }else {
            throw new RuntimeException("comment가 없습니다.");
        }
    }

    /**
     * comment 삭제
     * @param commentId
     * @param answerId
     * @param memberId
     */
    public void deleteComment(long commentId, long answerId, long memberId) {

        memberService.verifyAuthorizedUser(memberId);

        Comment existingComment = findCommentById(commentId);

        if (existingComment != null) {
            if (existingComment.getAnswer().getAnswerId() == answerId ) {
                commentRepository.deleteById(commentId);
            } else {
                throw new RuntimeException("에러발생");
            }
        }else {
            throw new RuntimeException("comment가 없습니다.");
        }
    }

    /**
     * commentId를 통해서 commentRepo에서 존재하는지 검색을 한다.
     * @param commentId
     * @return
     */
    public Comment findCommentById(long commentId) {
        return commentRepository.findById(commentId).orElseThrow(()->new RuntimeException("없습니다."));
    }

}
