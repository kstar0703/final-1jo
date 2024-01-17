package com.team1.app.member.dao;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import com.team1.app.member.vo.MemberVo;
import com.team1.app.unit.vo.UnitVo;

@Repository
public class MemberDao {

	
	// 아이디 유효성 확인
	public int validateId(MemberVo vo, SqlSessionTemplate sst) {
		
		return sst.selectOne("MemberMapper.validateId",vo);
	}

	//회원가입
	public int join(SqlSessionTemplate sst, MemberVo vo) {
		return sst.insert("MemberMapper.join",vo);
	}

	//로그인
	public MemberVo login(SqlSessionTemplate sst, MemberVo vo) {
		return sst.selectOne("MemberMapper.login",vo);
	}

	//정보 수정
	public int changeInfo(SqlSessionTemplate sst, MemberVo vo) {
		return sst.update("MemberMapper.changeInfo",vo);
	}

	//회원 탈퇴
	public int delete(SqlSessionTemplate sst, MemberVo vo) {
		return sst.update("MemberMapper.delete",vo);
	}

	//유닛 조회 
	public List<UnitVo> selectUnit(SqlSessionTemplate sst, UnitVo vo) {
		return sst.selectList("MemberMapper.selectUnit",vo);
	}

	// 정보 변경후 업데이트
	public MemberVo localStoargeMember(SqlSessionTemplate sst, MemberVo vo) {
		// TODO Auto-generated method stub
		return sst.selectOne("MemberMapper.localStoargeMember",vo);
	}
	
	
	

}
