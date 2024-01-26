package com.team1.app.manager.Service;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Service;

import com.team1.app.announcement.dao.AnnouncementDao;
import com.team1.app.announcement.vo.AnnouncementVo;
import com.team1.app.board.dao.BoardDao;
import com.team1.app.board.vo.BoardVo;
import com.team1.app.complaint.dao.ComplaintDao;
import com.team1.app.complaint.vo.ComplaintVo;
import com.team1.app.manager.dao.ManagerDao;
import com.team1.app.manager.vo.ManagerVo;
import com.team1.app.member.vo.MemberVo;
import com.team1.app.parking.dao.ParkingDao;
import com.team1.app.parking.vo.ParkingVo;
import com.team1.app.util.vo.PageVo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ManagerService {
	
	private final SqlSessionTemplate sst;
	private final ManagerDao dao;
	private final ComplaintDao daoCompl;
	private final AnnouncementDao daoAnnoun;
	private final BoardDao daoBoard;
	private final ParkingDao daoParking;

	// 로그인
	public ManagerVo login(ManagerVo vo) {
		return dao.login(vo,sst);
	}

	//회원 검색
	public List<MemberVo> findMember(MemberVo vo, PageVo pvo) {

		return dao.findMember(vo,sst,pvo);
	}
	//회원 수락
	public int acceptMember(MemberVo vo) {
		
		return dao.acceptMember(vo,sst);
	}

	//회원수락 취소
	public int cancelacceptMember(MemberVo vo) {
		
		return dao.cancelacceptMember(vo,sst);
	}
	
	// 회원조회 카운트
	public int count(MemberVo vo) {
		return dao.count(vo,sst);
	}
	//관리자 조회
	public List<ManagerVo> managerSelect() {
		return dao.managerSelect(sst);
	}

	//관리자 메인 페이지 기능
	
	public List<ComplaintVo> statuseSelect() {
		return daoCompl.statuseSelect(sst);
	}

	public List<MemberVo> permissionSelect() {
		return dao.permissionSelect(sst);
	}

	public List<AnnouncementVo> topSelect() {
		return daoAnnoun.topSelect(sst);
	}

	public List<BoardVo> topHitSelect() {
		return daoBoard.topHitSelect(sst);
	}

	public List<ParkingVo> todayParking() {
		return daoParking.todayParking(sst);
	}
	
	

	
	
	

}
