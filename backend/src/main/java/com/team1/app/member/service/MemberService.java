package com.team1.app.member.service;

import java.lang.reflect.Member;
import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Service;

import com.team1.app.member.dao.MemberDao;
import com.team1.app.member.util.MemberUtil;
import com.team1.app.member.vo.MemberVo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberService {
	
	private final MemberDao dao;
	private final MemberUtil util;
	private final SqlSessionTemplate sst;
	
	//아이디 유효성 검사
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
	//회원가입
	public Map<String, String> join(MemberVo vo) {
		//결과맵
		Map<String,String> resultMap = new HashMap();
		resultMap.put("msg", "가입실패");
		resultMap.put("status","bad");
		
		
		if(util.checkIdLength(vo.getPhone())) {
			resultMap.put("msg","비밀번호는 9글자 이상 작성해야 합니다");
			return resultMap;
		}
		
		if(!util.matchIdParttern(vo.getPhone())) {
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
	// 로그인
	public Map<String, Object> login(MemberVo vo) {
		
		return null;
	}

}