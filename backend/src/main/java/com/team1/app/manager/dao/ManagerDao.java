package com.team1.app.manager.dao;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import com.team1.app.manager.vo.ManagerVo;
import com.team1.app.member.vo.MemberVo;

@Repository
public class ManagerDao {
	// 로그인
	public ManagerVo login(ManagerVo vo, SqlSessionTemplate sst) {
		return sst.selectOne("ManagerMapper.login",vo);
	}
	
	// 회원검색
	public List<MemberVo> findMember(MemberVo vo, SqlSessionTemplate sst) {	
	
		
		
		return sst.selectList("MemberMapper.findMember",vo);
	}

	// 회원수락
	public int acceptMember(MemberVo vo, SqlSessionTemplate sst) {
		return sst.update("MemberMapper.acceptMember",vo);
	}

	public int cancelacceptMember(MemberVo vo, SqlSessionTemplate sst) {
		// TODO Auto-generated method stub
		return sst.update("MemberMapper.cancelacceptMember",vo);
	}
	
	
	
	

	

}
