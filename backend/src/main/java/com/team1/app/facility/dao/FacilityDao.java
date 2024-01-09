package com.team1.app.facility.dao;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import com.team1.app.facility.vo.FacilityHistoryVo;
import com.team1.app.facility.vo.FacilityVo;

@Repository
public class FacilityDao {

	//커뮤니티시설 목록조회
	public List<FacilityVo> list(SqlSessionTemplate sst) {
		return sst.selectList("FacilityMapper.list");
	}

	//커뮤니티시설 상세정보조회
	public FacilityVo detail(SqlSessionTemplate sst, FacilityVo vo) {
		return sst.selectOne("FacilityMapper.detail", vo);
	}
	
	//예약내역조회 (사용자)
	public List<FacilityHistoryVo> listByHistory(SqlSessionTemplate sst, FacilityHistoryVo vo) {
		return sst.selectList("FacilityMapper.listByHistory", vo);
	}
	
	//기간으로 예약내역조회 (사용자)기간으로 예약내역조회 (사용자)
	public List<FacilityHistoryVo> listByHistoryAndPeriod(SqlSessionTemplate sst, FacilityHistoryVo vo) {
		return sst.selectList("FacilityMapper.listByHistoryAndPeriod", vo);
	}

	//예약추가(회원번호, 이용일)
	public int apply(SqlSessionTemplate sst, FacilityHistoryVo vo) {
		return sst.insert("FacilityMapper.insertHistory", vo);
	}

	//예약취소(신청번호)
	public int cancel(SqlSessionTemplate sst, FacilityHistoryVo vo) {
		return sst.update("FacilityMapper.cancelHistory", vo);
	}

	//커뮤니티시설 목록조회(+상세조회) (관리자)
	public List<FacilityVo> listForAdmin(SqlSessionTemplate sst) {
		return sst.selectList("FacilityMapper.listForAdmin");
	}

	//커뮤니티시설 등록 (관리자)
	public int insert(SqlSessionTemplate sst, FacilityVo vo) {
		return sst.insert("FacilityMapper.insert", vo);
	}

	//커뮤니티시설 수정 (관리자)
	public int edit(SqlSessionTemplate sst, FacilityVo vo) {
		return sst.update("FacilityMapper.edit", vo);
	}

	//커뮤니티시설 삭제 (관리자)
	public int delete(SqlSessionTemplate sst, FacilityVo vo) {
		return sst.update("FacilityMapper.delete", vo);
	}



}
