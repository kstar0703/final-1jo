package com.team1.app.parking.service;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Service;

import com.team1.app.member.service.MemberService;
import com.team1.app.parking.dao.ParkingDao;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ParkingService {
	
		private final ParkingDao dao;
		private final SqlSessionTemplate sst;
	
		//예약할 차 등록
		
		//입차 등록
		
		//출차 등록 
		
		//예약 변경
		
		//예약 취소
		
		//예약 리스트
		
		//예약 상세정보 

}
