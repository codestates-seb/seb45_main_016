package com.codestates.server.domain.answer.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.codestates.server.domain.answer.entity.Answer;

import java.util.List;

public interface AnswerRepository extends JpaRepository<Answer, Long> {

	@Query(value = "SELECT * FROM Answer WHERE boardId = :boardId", nativeQuery = true)
	List<Answer> findByBoardId(@Param("boardId") long boardId);
}
