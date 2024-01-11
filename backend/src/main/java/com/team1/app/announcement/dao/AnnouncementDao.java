package com.team1.app.announcement.dao;

import java.util.List;

import org.apache.ibatis.session.RowBounds;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import com.team1.app.announcement.vo.AnnouncementVo;
import com.team1.app.util.vo.PageVo;

@Repository
public class AnnouncementDao {

	//공지사항 작성(admin)이미지 첨부
	public int write(SqlSessionTemplate sst, AnnouncementVo vo) {
		
		
		return sst.insert("Announcement.write",vo);
	}
	//공지사항 목록 조회
	public List<AnnouncementVo> list(SqlSessionTemplate sst, AnnouncementVo vo,PageVo pageVo) {
		
		int limit = pageVo.getBoardLimit();
		int offset = (pageVo.getCurrentPage()-1) * pageVo.getBoardLimit();
		RowBounds rowBounds = new RowBounds(offset,limit);
		
		return sst.selectList("Announcement.list",vo,rowBounds);
	}
	//공지사항 상세조회
	public List<AnnouncementVo> detail(SqlSessionTemplate sst, AnnouncementVo vo) {
		
		return sst.selectList("Announcement.detail",vo);
	}
	//공지 사항 삭제
	public int delete(SqlSessionTemplate sst, AnnouncementVo vo) {
		return sst.update("Announcement.delete",vo);
	}
	
	//공지 사항 파일삭제
	public int deleteFile(SqlSessionTemplate sst, AnnouncementVo vo) {
		return sst.update("Announcement.deleteFile",vo);
	}
	//공지사항 수정(관리자)
	public int change(AnnouncementVo vo, SqlSessionTemplate sst) {
		return sst.update("Announcement.change",vo);
	}
	public int changeImg(AnnouncementVo vo, SqlSessionTemplate sst) {
		return sst.insert("Announcement.changeImg",vo);
		}
	


	
		
	
	
	

}
