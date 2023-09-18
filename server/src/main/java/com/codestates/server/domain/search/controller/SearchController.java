package com.codestates.server.domain.search.controller;

import com.codestates.server.domain.board.dto.BoardLicenseDto;
import com.codestates.server.domain.board.dto.BoardPageResponse;
import com.codestates.server.domain.board.entity.Board;
import com.codestates.server.domain.board.mapper.BoardMapper;
import com.codestates.server.domain.board.service.BoardService;
import com.codestates.server.domain.license.licensedate.dto.LicenseDto;
import com.codestates.server.domain.license.licenseinfo.entity.LicenseInfo;
import com.codestates.server.domain.license.service.LicenseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/search")
@RequiredArgsConstructor
public class SearchController {

    private final LicenseService licenseService;
    private final BoardService boardService;
    private final BoardMapper boardMapper;

    @GetMapping("/top5")
    public ResponseEntity<BoardLicenseDto> getSearchTop5(@RequestBody(required = false) Optional<Map<String,Long>> body){
        List<LicenseInfo> top5LicenseInfo = licenseService.findTop5LicenseInfoList();
        LicenseDto top5License = licenseService.findLicenseDateList(top5LicenseInfo,
                body.isPresent() ? body.get().get("memberId") : 0L);

        List<Board> top5Boards = boardService.findTop5Boards();
        List<BoardPageResponse> top5BoardPage = boardMapper.boardToBoardPageResponseDto(top5Boards);

        BoardLicenseDto boardLicenseDto = new BoardLicenseDto(top5License,top5BoardPage);

        return new ResponseEntity<>(boardLicenseDto, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<BoardLicenseDto> getSearchKeyword(@RequestParam String keyword,
                                                            @RequestBody(required = false) Optional<Map<String,Long>> body){
        List<LicenseInfo> licenseInfosByKeyword = licenseService.findLicenseInfosByKeyword(keyword);
        LicenseDto LicenseByKeyword = licenseService.findLicenseDateList(licenseInfosByKeyword,
                body.isPresent() ? body.get().get("memberId") : 0L);

        List<Board> boardsByKeyword = boardService.findBoardsByKeyword(keyword);
        List<BoardPageResponse> boardPageResponses = boardMapper.boardToBoardPageResponseDto(boardsByKeyword);

        BoardLicenseDto boardLicenseByKeywordDto = new BoardLicenseDto(LicenseByKeyword,boardPageResponses);

        return new ResponseEntity<>(boardLicenseByKeywordDto,HttpStatus.OK);
    }
}
