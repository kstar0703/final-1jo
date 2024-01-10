package com.team1.app.announcement.dao;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import com.team1.app.announcement.vo.AnnouncementVo;

@Repository
public class AnnouncementDao {

	//공지사항 작성(admin)이미지 첨부
	public int write(SqlSessionTemplate sst, AnnouncementVo vo) {
		return sst.insert("Announcement.write",vo);
	}
	
	
	//공지사항 목록 조회 
	
	//공지사항 상세조회
	
	//공지사항 수정(관리자)
		
	//게시글삭제 (관리자)
	
	//게시글 검색(제목,내용)
	

}
