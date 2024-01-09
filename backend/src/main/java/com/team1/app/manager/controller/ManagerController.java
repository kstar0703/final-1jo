package com.team1.app.manager.controller;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.team1.app.manager.Service.ManagerService;
import com.team1.app.manager.vo.ManagerVo;
import com.team1.app.member.vo.MemberVo;

import lombok.RequiredArgsConstructor;

@RequestMapping("/admin")
@RestController
@RequiredArgsConstructor

//status good bad 실패
public class ManagerController {
	
	private final  ManagerService service; 
	
	/**
	 * 
	 * @param vo(로그인 정보)
	 * @return 로그인정보
	 */
	@PostMapping("login")
	public Map<String,Object> login(ManagerVo vo){
		
		Map<String,Object> resultMap = new HashMap();
		resultMap.put("msg", "로그인실패");
		
		ManagerVo loginManger = service.login(vo);
		
		if(loginManger !=null) {
		resultMap.put("loginManger",loginManger);
		}
		
		return resultMap;
	}
	
	/**
	 * 가입 승인용 조회
	 * @param vo (검색어,승인여부)
	 * @return 회원 리스트
	 */
	@GetMapping("findMember")
	public List<MemberVo> findMember(MemberVo vo){
		 return service.findMember(vo);
	}
	/**
	 * 
	 * @param vo 회원번호
	 * @return 성공 결과 
	 */
	@PostMapping("acceptMember")
	public Map<String,String> acceptMember(MemberVo vo){
		
		Map<String,String> resultMap = new HashMap();
		resultMap.put("msg","실패");
		int result = service.acceptMember(vo); 
			
		if(result ==1) {
			resultMap.put("msg","성공");
		}
		
		return resultMap;
	}
	
	
	
	
	
	
	

}
