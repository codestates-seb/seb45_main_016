package com.codestates.server.domain.board.mapper;

import com.codestates.server.domain.board.dto.BoardPatchDto;
import com.codestates.server.domain.board.dto.BoardResponseDto;
import com.codestates.server.domain.board.entity.Board;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
<<<<<<< HEAD
    date = "2023-09-18T21:29:29+0900",
    comments = "version: 1.4.2.Final, compiler: javac, environment: Java 11.0.18 (Azul Systems, Inc.)"
=======
    date = "2023-09-15T19:16:01+0900",
    comments = "version: 1.4.2.Final, compiler: javac, environment: Java 11.0.20 (Azul Systems, Inc.)"
>>>>>>> e1949d482e29e3fe5307888b1a11c6e1676cc237
)
@Component
public class BoardMapperImpl implements BoardMapper {

    @Override
    public Board boardPatchDtoToBoard(BoardPatchDto boardPatchDto) {
        if ( boardPatchDto == null ) {
            return null;
        }

        Board board = new Board();

        board.setBoardId( boardPatchDto.getBoardId() );
        board.setTitle( boardPatchDto.getTitle() );
        board.setContent( boardPatchDto.getContent() );

        return board;
    }

    @Override
    public List<BoardResponseDto> boardsToBoardResponseDto(List<Board> boards) {
        if ( boards == null ) {
            return null;
        }

        List<BoardResponseDto> list = new ArrayList<BoardResponseDto>( boards.size() );
        for ( Board board : boards ) {
            list.add( boardToBoardResponseDto( board ) );
        }

        return list;
    }
}
