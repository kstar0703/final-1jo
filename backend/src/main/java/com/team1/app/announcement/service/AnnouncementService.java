package com.team1.app.announcement.service;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Service;

import com.team1.app.announcement.dao.AnnouncementDao;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AnnouncementService {
	
	private final AnnouncementDao dao;
	private final SqlSessionTemplate sst;
	
	//공지사항 작성(admin)이미지 첨부
	
	//공지사항 목록 조회
	
	//공지사항 상세조회
	
	//공지사항 수정(관리자)
		
	//게시글삭제 (관리자)
	
	//게시글 검색(제목,내용)
		

}
