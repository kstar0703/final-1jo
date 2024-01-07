package com.team1.app.facility.service;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Service;

import com.team1.app.facility.dao.FacilityDao;
import com.team1.app.facility.vo.FacilityHistoryVo;
import com.team1.app.facility.vo.FacilityVo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FacilityService {

	private final FacilityDao dao;
	private final SqlSessionTemplate sst;
	
	//커뮤니티시설 목록조회
	public List<FacilityVo> list() {
		return dao.list(sst);
	}

	//커뮤니티시설 상세정보조회
	public FacilityVo detail(FacilityVo vo) {
		return dao.detail(sst, vo);
	}
	
	//예약내역조회 (사용자)
	public List<FacilityHistoryVo> listByHistory(FacilityHistoryVo vo) {
		//TODO 기간조회 - 화면에 따라 수정할 것 
		return dao.listByHistory(sst, vo);
	}

	//예약추가(회원번호, 이용일)
	public int apply(FacilityHistoryVo vo) {
		return dao.apply(sst, vo);
	}

	//예약취소(신청번호)
	public int cancel(FacilityHistoryVo vo) {
		return dao.cancel(sst, vo);
	}

	//커뮤니티시설 목록조회(+상세조회) (관리자)
	public List<FacilityVo> listForAdmin() {
		return dao.listForAdmin(sst);
	}

	//커뮤니티시설 등록 (관리자)
	public int insert(FacilityVo vo) {
		return dao.insert(sst, vo);
	}

	//커뮤니티시설 수정 (관리자)
	public int edit(FacilityVo vo) {
		return dao.edit(sst, vo);
	}

	//커뮤니티시설 삭제 (관리자)
	public int delete(FacilityVo vo) {
		return dao.delete(sst, vo);
	}



}
