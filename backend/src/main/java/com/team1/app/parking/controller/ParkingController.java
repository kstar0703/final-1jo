package com.team1.app.parking.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.team1.app.parking.service.ParkingService;
import com.team1.app.parking.vo.ParkingVo;

import lombok.RequiredArgsConstructor;

//차량 등록

@RequestMapping("parking")
@RestController
@RequiredArgsConstructor

public class ParkingController {
		
	private final ParkingService service;
	
	//예약할 차 등록
	@PostMapping("register")
	public Map<String, String> register(ParkingVo vo){
		Map<String, String>  resultMap = new HashMap();
		
		return resultMap;
	}
	
	//입차 등록
	
	//출차 등록 
	
	//예약 변경
	
	//예약 취소
	
	//예약 리스트
	
	//예약 상세정보 
}
