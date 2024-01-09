package com.team1.app.announcement.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.team1.app.announcement.service.AnnouncementService;

import lombok.RequiredArgsConstructor;

//공지사항
@RequestMapping("/announcement")
@RestController
@RequiredArgsConstructor
public class AnnouncementController {
	
	private final AnnouncementService service;
	
	//공지사항 작성(admin)이미지 첨부
	
	//공지사항 목록 조회
	
	//공지사항 상세조회
	
	//공지사항 수정(관리자)
		
	//게시글삭제 (관리자)
	
	//게시글 검색(제목,내용)
	
	
	

}
