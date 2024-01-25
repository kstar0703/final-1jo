package com.team1.app.member.service;

import java.lang.reflect.Member;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.team1.app.member.dao.MemberDao;
import com.team1.app.member.util.MemberUtil;
import com.team1.app.member.vo.MemberVo;
import com.team1.app.unit.vo.UnitVo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberService {
	
	private final MemberDao dao;
	private final MemberUtil util;
	private final SqlSessionTemplate sst;
	
	/**
	 * 아이디 유효성 검사
	 * @param 
	 * @return msg ,status 
	 */
	public Map<String, String> validateId(MemberVo vo) {
		
		// 결과맵 
		Map<String, String> resultMap = new HashMap();
		resultMap.put("msg", "가입 불가능한 전화번호 입니다.");
		resultMap.put("status","bad");
		
		if(util.checkPhoneLength(vo.getPhone())) {
			resultMap.put("msg","길이가 너무 짧습니다.");
			return resultMap;
		}
		
		if(!util.matchPhoneParttern(vo.getPhone())) {
			resultMap.put("msg","전화번호 형식이 아닙니다.");
			return resultMap;
		}
		
		if(dao.validateId(vo,sst) !=1) {
			resultMap.put("msg","가입 가능한 전화번호 입니다.");
			resultMap.put("status","good");
		}
		
		
		return resultMap;
		
	}
	/**
	 * 회원가입
	 * @param 
	 * @return msg ,status 
	 */
	public Map<String, String> join(MemberVo vo) {
		//결과맵
		Map<String,String> resultMap = new HashMap();
		resultMap.put("msg", "가입실패");
		resultMap.put("status","bad");
		
		
		if(util.checkIdLength(vo.getPhone())) {
			resultMap.put("msg","비밀번호는 9글자 이상 작성해야 합니다");
			return resultMap;
		}
		
		if(!util.matchIdParttern(vo.getPwd())) {
			resultMap.put("msg","특수문자,대문자,소문자가 하나 이상씩 들어가야 합니다");
			return resultMap;
		}
		
		int result = dao.join(sst,vo);
		
		if(result ==1) {
			resultMap.put("msg","회원 가입 성공");
			resultMap.put("status","good");
		}
		
		return resultMap;
	}
	/**
	 * 로그인
	 * @param 
	 * @return loginMember ,status , msg
	 */
	public Map<String, Object> login(MemberVo vo) {
		
	
		//결과맵
		Map<String,Object> resultMap = new HashMap();
		resultMap.put("msg", "아이디 또는 패스워드가 잘못되었습니다");
		resultMap.put("status","bad");

		
		MemberVo loginMember =  dao.login(sst,vo);
		
		System.out.println(loginMember);
		
		if(loginMember ==null) {
			return resultMap;
		}
		
	
		if(loginMember.getPermissionYn().equals("N")) {
			resultMap.put("msg", "허용받지 않은 계정입니다.");
		}else {
			resultMap.put("msg", "로그인 성공");
			resultMap.put("status","good");
			resultMap.put("loginMember",loginMember);
		}
		
	
		return resultMap;
	}
	/**
	 * 정보 변경
	 * @param 
	 * @return loginMember ,status , msg
	 */
	public Map<String, Object> changeInfo(MemberVo vo) {

		// 결과맵 
		Map<String, Object> resultMap = new HashMap();
		resultMap.put("msg", "정보 변경 실패");
		resultMap.put("status","bad");
				
		
		// 패스워드 확인로직
		if(vo.getPwd() !=null) {
			
			if(util.checkIdLength(vo.getPwd())) {
				resultMap.put("msg","비밀번호는 9글자 이상 작성해야 합니다");
				return resultMap;
			}
			
			
			if(!util.matchIdParttern(vo.getPwd())) {
				resultMap.put("msg","특수문자,대문자,소문자가 하나 이상씩 들어가야 합니다");
				return resultMap;
			}
		}
		
		int result = dao.changeInfo(sst,vo);
		
		if(result == 1) {
			resultMap.put("msg", "정보 변경 성공");
			resultMap.put("status","good");
			MemberVo loginMember = dao.login(sst, vo);
		}
			
		return resultMap;
	}
	public Map<String, Object> delete(MemberVo vo) {
		
		// 결과맵 
		Map<String, Object> resultMap = new HashMap();
		resultMap.put("msg", "회원탈퇴 실패");
		resultMap.put("status","bad");
		
		
		//전화번호 앞에 1로 변경
		vo.setPhone("1" + vo.getPhone().substring(1));
		
		int result = dao.delete(sst,vo);
		
		if(result == 1) {
			resultMap.put("msg", "회원 탈퇴 성공");
			resultMap.put("status","good");
		}
		
		return resultMap;
	}
	
	// 유닛 조회
	public Map<String, Object> selectUnit(UnitVo vo) {
		
		// 결과맵 
		Map<String, Object> resultMap = new HashMap();
		resultMap.put("msg", "조회 데이터 없음");
		resultMap.put("status","bad");
		resultMap.put("UnitVo", "검색결과없음");
		
		List<UnitVo> unitVo = dao.selectUnit(sst,vo);
		
		if(unitVo != null) {	
		resultMap.put("msg", "조회 성공");
		resultMap.put("status","good");
		resultMap.put("UnitVo", unitVo);
		}
		return resultMap;
		
	}
	// 비번 변경
	public Map<String, Object> changePwd(MemberVo vo) {
		
		// 결과맵 
		Map<String, Object> resultMap = new HashMap();
		resultMap.put("msg", "조회 데이터 없음");
		resultMap.put("status","bad");
		System.out.println(vo);
		
		
		MemberVo loginMember =null;
		if(dao.changeInfo(sst,vo)!=0) {
		 loginMember = localStoargeMember(vo);
		 resultMap.put("msg", "비밀번호 변경 성공!");
		resultMap.put("status","good");
		 
		}
		resultMap.put("loginMember",loginMember);
		
		System.out.println(resultMap);

		
		
	
		return resultMap;
	}
	
	// 로그인 정보 최신화용
	public MemberVo localStoargeMember(MemberVo vo) {
		
		MemberVo loginMember = dao.localStoargeMember(sst,vo);
		
		return loginMember;
	}
	// 이메일 중복검사
	public Map<String, String> emailCheck(Map<String, String> map) {
		Map<String, String> resultMap = new HashMap<String, String>();

		resultMap.put("status","good");
		
		int result = dao.emailCheck(sst,map);
		
		if(result>0) {
			resultMap.put("status","bad");
		}
		
		return resultMap;
	}
	
	
	
	

}