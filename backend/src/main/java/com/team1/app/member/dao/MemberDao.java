package com.team1.app.member.dao;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import com.team1.app.member.vo.MemberVo;

@Repository
public class MemberDao {

	public int validateId(MemberVo vo, SqlSessionTemplate sst) {
		
		return sst.selectOne("MemberMapper.validateId",vo);
	}
	
	

}
