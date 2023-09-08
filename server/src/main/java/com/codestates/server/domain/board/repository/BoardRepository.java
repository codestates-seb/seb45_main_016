package com.codestates.server.domain.board.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.codestates.server.domain.board.entity.Board;

public interface BoardRepository extends JpaRepository<Board, Long> {
}
