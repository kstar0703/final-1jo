package com.team1.app.member.dao;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import com.team1.app.member.vo.MemberVo;

@Repository
public class MemberDao {

	
	// 아이디 유효성 확인
	public int validateId(MemberVo vo, SqlSessionTemplate sst) {
		
		return sst.selectOne("MemberMapper.validateId",vo);
	}

	//회원가입
	public int join(SqlSessionTemplate sst, MemberVo vo) {
		return 0;
	}
	
	

}
