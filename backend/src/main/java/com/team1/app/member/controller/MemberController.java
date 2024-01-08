package com.team1.app.member.controller;

import java.lang.reflect.Member;
import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.team1.app.member.service.MemberService;
import com.team1.app.member.vo.MemberVo;

import lombok.RequiredArgsConstructor;
import oracle.jdbc.proxy.annotation.Post;

@RequestMapping("member")
@RestController
@RequiredArgsConstructor
@ResponseBody
@CrossOrigin("*")

//status good bab 실패 
public class MemberController {
	
	
	private final MemberService service;
	
	
	//아이디 유효성 검사
	//msg 성공 
	
		@PostMapping("/validateId")
		public  Map< String, String> validateId( MemberVo vo ){
			
			return service.validateId(vo);
		}
	
	//회원가입 
	@PostMapping("/join")
	public Map<String, String> join(MemberVo vo){
		
		return service.join(vo);
	}
	
	//로그인 데이터
	@PostMapping("/login")
	public Map<String, Object> login(@RequestBody MemberVo vo) {
		
		return service.login(vo); 
	}
	
	// 정보수정
	@PostMapping("/changInfo")
	public  Map<String, Object> changeInfo(@RequestBody MemberVo vo,@RequestBody String currentPwd ){
		
		return null;
	}
	
	
	
	
	


}
