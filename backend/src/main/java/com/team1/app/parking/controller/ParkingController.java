
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
import com.team1.app.util.vo.PageVo;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

//차량 등록

@RequestMapping("parking")
@RestController
@RequiredArgsConstructor
@Slf4j
public class ParkingController {
		
	private final ParkingService service;
	
	/**
	 * 
	 * @param unitNo(유닛번호),carNO(차량번호),purpose(방문목적)
	 * @return 성공결과
	 */
	@PostMapping("register")
	public Map<String, String> register(ParkingVo vo ){
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
	public Map<String, String> arrival(ParkingVo vo){
		Map<String, String>  resultMap = new HashMap();
		resultMap.put("status", "bad");
		resultMap.put("msg", "실패");
		int result = service.arrival(vo);
		
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
	public Map<String, String> departure(ParkingVo vo) {
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
	 * @param parkingNo,[ purpose ,carNo] --> 동적으로
	 * @return 결과
	 */
	@PostMapping("change")
	public Map<String, String> change(ParkingVo vo){
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
	/**
	 * 예약 복구
	 * @param parkingNo
	 * @return 
	 */
	@PostMapping("recovery")
	public Map<String, String> recovery(@RequestBody ParkingVo vo){
		Map<String, String>  resultMap = new HashMap();
		resultMap.put("status", "bad");
		resultMap.put("msg", "실패");
		
		int result = service.recovery(vo);
		
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
	public Map<String, Object> list(ParkingVo vo,PageVo pageVo){
		Map<String, Object>  resultMap = new HashMap();
	
		log.info("들어온 값 : {}  ",vo);
		log.info("들어온 pageVo값 : {}  ",pageVo);
		log.info("들어온 현재page값 : {}  ",pageVo.getCurrentPage());
		
		
		
		int cnt = service.count(vo);
		
		log.info("전체 페이지 갯수 :{}",cnt);
		
		//페이지 리밋
		int pageLimit = 10;	
				
	   PageVo pvo = new PageVo(cnt,pageVo.getCurrentPage() , pageLimit  , pageVo.getBoardLimit() );
		
	   
	   List<ParkingVo> ParkingVoList = service.list(vo,pvo); 
	   log.info("나가는 페이지수 :  {}" ,ParkingVoList.size() );
	   
		resultMap.put("resultMap",ParkingVoList);
		resultMap.put("status", "good");
		resultMap.put("pageVo", pvo);
		
		return resultMap;
		
	}
	@GetMapping("detail")
	/**
	 * @param parkingNo
	 * @return
	 */
	public Map<String, Object> detail(ParkingVo vo){
		Map<String, Object>  resultMap = new HashMap();
		
		ParkingVo parkingVo = service.detail(vo);
				
		resultMap.put("parkingVo",parkingVo);		
		resultMap.put("status", "good");
		
		return resultMap;
	}
	
	
}
