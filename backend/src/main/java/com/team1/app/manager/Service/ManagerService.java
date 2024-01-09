package com.team1.app.manager.Service;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Service;

import com.team1.app.manager.dao.ManagerDao;
import com.team1.app.manager.vo.ManagerVo;
import com.team1.app.member.service.MemberService;
import com.team1.app.member.vo.MemberVo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ManagerService {
	
	private final SqlSessionTemplate sst;
	private final ManagerDao dao;

	// 로그인
	public ManagerVo login(ManagerVo vo) {
		return dao.login(vo,sst);
	}

	//회원 검색
	public List<MemberVo> findMember(MemberVo vo) {

		return dao.findMember(vo,sst);
	}
	//회원 수락
	public int acceptMember(MemberVo vo) {
		return dao.acceptMember(vo,sst);
	}
	
	

	
	
	

}
