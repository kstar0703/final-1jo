package com.team1.app.parking.service;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Service;

import com.team1.app.member.service.MemberService;
import com.team1.app.parking.dao.ParkingDao;
import com.team1.app.parking.vo.ParkingVo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ParkingService {
	
		private final ParkingDao dao;
		private final SqlSessionTemplate sst;


		//예약할 차 등록
		public int register(ParkingVo vo) {
			
			return dao.register(sst,vo);
		}

		//입차 등록
		public int arrival(ParkingVo vo) {
			return dao.arrival(sst,vo);
		}
		
		//출차 등록 
		public int departure(ParkingVo vo)  {
			int result = dao.departure(sst,vo);
			if(result !=1) {
				throw new IllegalArgumentException("출차 등록 실패");
			}
			//출차시간 업데이트
			int unitUpdateresult =dao.subtractUnitTime(sst,vo);
			
			if(unitUpdateresult !=1) { throw new IllegalArgumentException("출차 등록 실패");}
			else {return unitUpdateresult;}
			
		}
		
		//예약 변경
		public int change(ParkingVo vo) {
			return dao.change(sst,vo);	
				
		}

		//예약 취소
		public int cancel(ParkingVo vo) {
			return dao.cancel(sst,vo);
		}
		
		//예약 리스트
		public List<ParkingVo> list(ParkingVo vo) {
			return dao.list(sst,vo);
		}
		//예약 상세 정보
		public ParkingVo detail(ParkingVo vo) {
			return dao.detail(sst, vo);
		}

		//예약 복구
		public int recovery(ParkingVo vo) {
			
			return dao.recovery(sst,vo);
		}
}
	
		
	
		
	
		
	
		
		
		
		
		


