package com.codestates.server.domain.license.repository;

import com.codestates.server.domain.license.entity.Bookmark;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {
}
