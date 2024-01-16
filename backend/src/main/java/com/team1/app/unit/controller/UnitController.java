package com.team1.app.unit.controller;

import java.util.Map;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.team1.app.unit.service.UnitService;
import com.team1.app.unit.vo.UnitVo;

import lombok.RequiredArgsConstructor;

@RequestMapping("/unit")
@RestController
@RequiredArgsConstructor
public class UnitController {

	private final UnitService service;
	
	
	@PostMapping("/info")
	public Map<String, Object> info(@RequestBody UnitVo vo){
		
		
		return service.info(vo); 
	}
	
		
	
	
}
