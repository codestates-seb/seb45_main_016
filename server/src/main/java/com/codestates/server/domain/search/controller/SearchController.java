package com.codestates.server.domain.search.controller;

import com.codestates.server.domain.board.dto.BoardLicenseDto;
import com.codestates.server.domain.board.dto.BoardPageResponse;
import com.codestates.server.domain.board.entity.Board;
import com.codestates.server.domain.board.mapper.BoardMapper;
import com.codestates.server.domain.board.service.BoardService;
import com.codestates.server.domain.license.licensedate.dto.LicenseDto;
import com.codestates.server.domain.license.licenseinfo.entity.LicenseInfo;
import com.codestates.server.domain.license.service.LicenseService;
import com.codestates.server.domain.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/search")
@RequiredArgsConstructor
public class SearchController {

    private final LicenseService licenseService;
    private final BoardService boardService;
    private final BoardMapper boardMapper;
    private final MemberService memberService;


    @GetMapping("/top5")
    public ResponseEntity<BoardLicenseDto> getSearchTop5(){
        List<LicenseInfo> top5LicenseInfo = licenseService.findTop5LicenseInfoList(); //5개의 licenseInfo를 뽑아온다.
        Long memberId = memberService.getLoginMemberId(); //현재 로그인된 유저의 memberId를 받아온다.

        LicenseDto top5License = licenseService.findLicenseDateList(top5LicenseInfo,
                memberId); //licenseDate를 리스트로 받아온다.

        List<Board> top5Boards = boardService.findTop5Boards(); //5개의 board를 받아온다.
        List<BoardPageResponse> top5BoardPage = boardMapper.boardToBoardPageResponseDto(top5Boards); //5개의 board를 boardPageResponse 리스트로 받아온다.

        BoardLicenseDto boardLicenseDto = new BoardLicenseDto(top5License,top5BoardPage); //5개의 정보와 보드리스트를 매핑시킨다.

        return new ResponseEntity<>(boardLicenseDto, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<BoardLicenseDto> getSearchKeyword(@RequestParam String keyword){

        Long loginMemberId = memberService.getLoginMemberId();

        List<LicenseInfo> licenseInfosByKeyword = licenseService.findLicenseInfosByKeyword(keyword);
        LicenseDto LicenseByKeyword = licenseService.findLicenseDateList(licenseInfosByKeyword, loginMemberId);

        List<Board> boardsByKeyword = boardService.findBoardsByKeyword(keyword);
        List<BoardPageResponse> boardPageResponses = boardMapper.boardToBoardPageResponseDto(boardsByKeyword);

        BoardLicenseDto boardLicenseByKeywordDto = new BoardLicenseDto(LicenseByKeyword,boardPageResponses);

        return new ResponseEntity<>(boardLicenseByKeywordDto,HttpStatus.OK);
    }
}
