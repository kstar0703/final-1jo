package com.team1.app.parking.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
	
	/**
	 * 
	 * @param unitNo(유닛번호),carNO(차량번호),purpose(방문목적)
	 * @return 성공결과
	 */
	@PostMapping("register")
	public Map<String, String> register(@RequestBody ParkingVo vo ){
		Map<String, String>  resultMap = new HashMap();
		resultMap.put("status", "bad");
		resultMap.put("msg", "예약 실패");
		int result = service.register(vo);
		
		if(result ==1) {
			resultMap.put("status", "good");
			resultMap.put("msg", "예약 성공");
		}
		
		
		return resultMap;
	}
	
	/**
	 * 
	 * @param parkingNo
	 * @return 결과 
	 */
	@PostMapping("arrival")
	public Map<String, String> arrival(@RequestBody String parkingNo){
		Map<String, String>  resultMap = new HashMap();
		resultMap.put("status", "bad");
		resultMap.put("msg", "실패");
		int result = service.arrival(parkingNo);
		
		if(result ==1) {
			resultMap.put("status", "good");
			resultMap.put("msg", "성공");
		}
		
		return resultMap;
	}
	/**
	 * @param ParkingVo (parkingNo,unitNo)
	 * @return 결과
	 */
	@PostMapping("departure")
	public Map<String, String> departure(@RequestBody ParkingVo vo) {
		Map<String, String>  resultMap = new HashMap();
		resultMap.put("status", "bad");
		resultMap.put("msg", "실패");
		int result = service.departure(vo);
		
		if(result ==1) {
			resultMap.put("status", "good");
			resultMap.put("msg", "성공");
		}
		
		return resultMap;
		
	}
	//예약 변경
	/**
	 * @param purpose ,carNo --> 동적으로
	 * @return 결과
	 */
	@PostMapping("change")
	public Map<String, String> change(@RequestBody ParkingVo vo){
		Map<String, String>  resultMap = new HashMap();
		resultMap.put("status", "bad");
		resultMap.put("msg", "실패");
		
		int result = service.change(vo);
		
		if(result ==1) {
			resultMap.put("status", "good");
			resultMap.put("msg", "성공");
		}
		
		return resultMap;
		
	}
	//예약 취소
	/**
	 * 
	 * @param parkingNo
	 * @return 
	 */
	@PostMapping("cancel")
	public Map<String, String> cancel(@RequestBody ParkingVo vo){
		Map<String, String>  resultMap = new HashMap();
		resultMap.put("status", "bad");
		resultMap.put("msg", "실패");
		
		int result = service.cancel(vo);
		
		if(result ==1) {
			resultMap.put("status", "good");
			resultMap.put("msg", "성공");
		}
		
		return resultMap;	
	}
	
	@GetMapping("list")
	/**
	 * 예약 리스트
	 * @param vo unitNo
	 * @return
	 */
	public Map<String, Object> list(@RequestBody ParkingVo vo){
		Map<String, Object>  resultMap = new HashMap();
	
		
		List<ParkingVo> ParkingVoList = service.list(vo);  
		
		
		resultMap.put("resultMap",ParkingVoList);
		resultMap.put("status", "good");
		
		return resultMap;
		
	}
	@GetMapping("detail")
	/**
	 * @param parkingNo
	 * @return
	 */
	public Map<String, Object> detail(@RequestBody ParkingVo vo){
		Map<String, Object>  resultMap = new HashMap();
		
		ParkingVo parkingVo = service.detail(vo);
				
		resultMap.put("parkingVo",parkingVo);		
		resultMap.put("status", "good");
		
		return resultMap;
	}
	
	
}
