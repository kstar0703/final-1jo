package com.team1.app.managementfee.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.team1.app.managementfee.service.ManagementFeeService;
import com.team1.app.managementfee.vo.ManagementFeeVo;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("management")
@RequiredArgsConstructor
public class ManagementFeeController {

	private final ManagementFeeService service;
	
	//세대별 관리비 조회(세대정보, 기간)
	@PostMapping("list")
	public Map<String, Object> listByUnitAndPeriod(@RequestBody ManagementFeeVo vo){
		System.out.println("요청들어온" + vo);
		List<ManagementFeeVo> managementVoList =  service.listByUnitAndPeriod(vo);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("managementVoList", managementVoList);
		return map;
	}
	
	//전체 관리비 조회 (관리자)
	@GetMapping("admin/list")
	public Map<String, Object> list(){
		List<ManagementFeeVo> managementVoList =  service.list();
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("managementVoList", managementVoList);
		return map;
	}
}
