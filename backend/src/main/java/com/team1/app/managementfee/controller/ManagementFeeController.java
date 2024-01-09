package com.team1.app.managementfee.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
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
	@GetMapping("list")
	public List<ManagementFeeVo> listByUnitAndPeriod(@RequestBody ManagementFeeVo vo){
		return service.listByUnitAndPeriod(vo);
	}
	
	//전체 관리비 조회 (관리자)
	@GetMapping("admin/list")
	public List<ManagementFeeVo> list(){
		return service.list();
	}
}
