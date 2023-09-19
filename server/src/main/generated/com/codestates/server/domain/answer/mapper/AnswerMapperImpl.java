package com.codestates.server.domain.answer.mapper;

import com.codestates.server.domain.answer.dto.AnswerPatchDto;
import com.codestates.server.domain.answer.dto.AnswerResponseDto;
import com.codestates.server.domain.answer.entity.Answer;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-09-18T22:15:21+0900",
    comments = "version: 1.4.2.Final, compiler: javac, environment: Java 11.0.18 (Azul Systems, Inc.)"
)
@Component
public class AnswerMapperImpl implements AnswerMapper {

    @Override
    public Answer answerPatchDtoToAnswer(AnswerPatchDto answerPatchDto) {
        if ( answerPatchDto == null ) {
            return null;
        }

        Answer answer = new Answer();

        answer.setAnswerId( answerPatchDto.getAnswerId() );
        answer.setContent( answerPatchDto.getContent() );

        return answer;
    }

    @Override
    public List<AnswerResponseDto> answerListToAnswerResponseDto(List<Answer> answer) {
        if ( answer == null ) {
            return null;
        }

        List<AnswerResponseDto> list = new ArrayList<AnswerResponseDto>( answer.size() );
        for ( Answer answer1 : answer ) {
            list.add( answerToAnswerResponseDto( answer1 ) );
        }

        return list;
    }
}
