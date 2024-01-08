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
		
		if(util.checkLength(vo.getPhone())) {
			resultMap.put("msg","길이가 너무 짧습니다.");
			return resultMap;
		}
		
		if(util.matchParttern(vo.getPhone())) {
			resultMap.put("msg","전화번호 형식이 아닙니다.");
			return resultMap;
		}
		
		if(dao.validateId(vo,sst) !=1) {
			resultMap.put("msg","가입 가능한 전화번호 입니다.");
		}
		
		return resultMap;
		
	}
	//로그인 
	public Map<String, Object> join(MemberVo vo) {
	
		
		
		return null;
	}

}