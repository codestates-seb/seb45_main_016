package com.codestates.server.domain.comment.mapper;

import com.codestates.server.domain.comment.dto.CommentPatchDto;
import com.codestates.server.domain.comment.dto.CommentPostDto;
import com.codestates.server.domain.comment.entity.Comment;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CommentMapper {

        default Comment commentPostDtoToComment(CommentPostDto commentPostDto){

                if (commentPostDto == null) {
                        return null;
                } else {
                        Comment comment = Comment.builder()
                                .content(commentPostDto.getContent())
                                .member(commentPostDto.getMember())
                                .answer(commentPostDto.getAnswer())
                                .build();
                        return comment;
                }
        }

        default Comment commentPatchDtoToComment(CommentPatchDto commentPatchDto){

                if (commentPatchDto == null) {
                        return null;
                } else {
                        Comment comment = Comment.builder()
                                .content(commentPatchDto.getContent())
                                .member(commentPatchDto.getMember())
                                .answer(commentPatchDto.getAnswer())
                                .build();
                        return comment;
                }
        }

}
