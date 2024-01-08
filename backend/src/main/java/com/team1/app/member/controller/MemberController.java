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

import com.team1.app.manager.Service.ManagerService;
import com.team1.app.member.service.MemberService;
import com.team1.app.member.vo.MemberVo;

import lombok.RequiredArgsConstructor;
import oracle.jdbc.proxy.annotation.Post;

@RequestMapping("/member")
@RestController
@RequiredArgsConstructor

//status good bad 실패
public class MemberController {
	
	private final MemberService service;
	
	/**
	 * 
	 * @param 아이디
	 * @return
	 */
		@PostMapping("/validateId")
		public  Map< String, String> validateId( MemberVo vo ){
			
			return service.validateId(vo);
		}
	
	//회원가입 
	@PostMapping("/join")
	public Map<String, String> join(MemberVo vo){
		
		return service.join(vo);
	}
	
	/**
	 * 
	 * @param 로그인 정보
	 * @return 
	 */
	@PostMapping("/login")
	public Map<String, Object> login(MemberVo vo) {
		
		return service.login(vo); 
	}
	
	/**
	 * 
	 * @param 변경할 정보
	 * @param 현재 비밀번호
	 * @return 
	 */
	@PostMapping("/changInfo")
	public  Map<String, Object> changeInfo(MemberVo vo, String currentPwd ){
		
		return service.changeInfo(vo,currentPwd);
	}
	/**
	 * 
	 * @param memberVo
	 * @param currentPwd
	 * @return 
	 */
	@PostMapping("/delete")
	public Map<String, Object> delete(MemberVo vo, String currentPwd) {
		
		return service.delete(vo,currentPwd);
	}
	
	
	
	
	


}
