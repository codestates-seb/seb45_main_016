package com.codestates.server.domain.reply.mapper;

import com.codestates.server.domain.reply.dto.ReplyPatchDto;
import com.codestates.server.domain.reply.dto.ReplyPostDto;
import com.codestates.server.domain.reply.dto.ReplyResponseDto;
import com.codestates.server.domain.reply.entity.Reply;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper(componentModel = "spring")
public interface ReplyMapper {
    @Mappings({
            @Mapping(source = "id", target = "replyId"),
    })
    ReplyResponseDto replyToReplyResponseDto(Reply reply);

    Reply replyPostDtoToReply(ReplyPostDto replyPostDto);

    Reply replyPatchDtoToReply(ReplyPatchDto replyPatchDto);
}