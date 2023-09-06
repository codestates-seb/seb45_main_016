package com.codestates.server.domain.bookmark.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/bookmark")
public class BookmarkController {
    @PostMapping()
    public String postBookmark(){

        return "post";
    }

    @DeleteMapping()
    public String deleteBookmark(){

        return "delete";
    }
}
