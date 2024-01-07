package com.team1.app.facilitynotice.dao;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import com.team1.app.facilitynotice.vo.FacilityNoticeVo;

@Repository
public class FacilityNoticeDao {

	//커뮤니티공지 목록조회
	public List<FacilityNoticeVo> list(SqlSessionTemplate sst) {
		return sst.selectList("FacilityNoticeMapper.list");
	}

	//커뮤니티공지 상세조회
	public FacilityNoticeVo detail(SqlSessionTemplate sst, FacilityNoticeVo vo) {
		return sst.selectOne("FacilityNoticeMapper.detail", vo);
	}

	//커뮤니티공지 목록조회 (관리자)
	public List<FacilityNoticeVo> listByAdmin(SqlSessionTemplate sst) {
		return sst.selectList("FacilityNoticeMapper.listByAdmin");
	}

	//커뮤니티공지 상세조회 (관리자)
	public FacilityNoticeVo detailByAdmin(SqlSessionTemplate sst, FacilityNoticeVo vo) {
		return sst.selectOne("FacilityNoticeMapper.detailByAdmin", vo);
	}

	//커뮤니티공지 등록
	public int insert(SqlSessionTemplate sst, FacilityNoticeVo vo) {
		return sst.insert("FacilityNoticeMapper.insert", vo);
	}

	//커뮤니티공지 수정
	public int edit(SqlSessionTemplate sst, FacilityNoticeVo vo) {
		return sst.update("FacilityNoticeMapper.edit", vo);
	}

	//커뮤니티공지 삭제
	public int delete(SqlSessionTemplate sst, FacilityNoticeVo vo) {
		return sst.update("FacilityNoticeMapper.delete", vo);
	}

}
