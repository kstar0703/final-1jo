package com.team1.app.member.dao;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import com.team1.app.member.vo.DashBoardDto;
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

	//이메일중복검사
	public int emailCheck(SqlSessionTemplate sst, Map<String, String> map) {
	
		return sst.selectOne("MemberMapper.emailCheck",map);
	}

	// 유닛검색 카운트
	public List<MemberVo> countUnit(SqlSessionTemplate sst, MemberVo vo) {
		
		return sst.selectList("MemberMapper.countUnit",vo);
	}

	public int isEmailInUse(SqlSessionTemplate sst, MemberVo vo) {
		return sst.selectOne("MemberMapper.isEmailInUse",vo);
	}

	public int updateTempPwd(SqlSessionTemplate sst, MemberVo vo) {
		return sst.update("MemberMapper.updateTempPwd",vo);
	}

	//이름 얻기
	public String getName(MemberVo vo,SqlSessionTemplate sst) {
		return sst.selectOne("MemberMapper.getName",vo);
	}

	public DashBoardDto dashBoardDto(MemberVo vo, SqlSessionTemplate sst) {
		return sst.selectOne("MemberMapper.dashBoard",vo);
	}
	
	
	

}
