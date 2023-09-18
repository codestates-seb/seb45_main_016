package com.codestates.server.domain.board.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.codestates.server.domain.board.entity.Board;

public interface BoardRepository extends JpaRepository<Board, Long> {

	@Query(value = "SELECT * FROM board WHERE memberId = :memberId", nativeQuery = true)
	List<Board> findAllByMemberId(long memberId);

	List<Board> findTop6ByOrderByBoardIdDesc();

	List<Board> findByTitleContaining(String keyword);
}
