package com.team1.app.facilitynotice.service;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Service;

import com.team1.app.facilitynotice.dao.FacilityNoticeDao;
import com.team1.app.facilitynotice.vo.FacilityNoticeVo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FacilityNoticeService {

	private final FacilityNoticeDao dao;
	private final SqlSessionTemplate sst;
	
	//커뮤니티공지 목록조회
	public List<FacilityNoticeVo> list(FacilityNoticeVo vo) {
		return dao.list(sst, vo);
	}

	//커뮤니티공지 상세조회
	public FacilityNoticeVo detail(FacilityNoticeVo vo) {
		return dao.detail(sst, vo);
	}

	//커뮤니티공지 목록조회 (관리자)
	public List<FacilityNoticeVo> listByAdmin() {
		return dao.listByAdmin(sst);
	}

	//커뮤니티공지 상세조회 (관리자)
	public FacilityNoticeVo detailByAdmin(FacilityNoticeVo vo) {
		return dao.detailByAdmin(sst, vo);
	}

	//커뮤니티공지 등록
	public int insert(FacilityNoticeVo vo) {
		return dao.insert(sst, vo);
	}

	//커뮤니티공지 수정
	public int edit(FacilityNoticeVo vo) {
		return dao.edit(sst, vo);
	}

	//커뮤니티공지 삭제
	public int delete(FacilityNoticeVo vo) {
		return dao.delete(sst, vo);
	}

}
