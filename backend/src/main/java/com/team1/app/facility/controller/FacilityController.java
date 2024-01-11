package com.team1.app.facility.controller;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.team1.app.facility.service.FacilityService;
import com.team1.app.facility.vo.FacilityHistoryVo;
import com.team1.app.facility.vo.FacilityVo;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("facility")
@RequiredArgsConstructor
public class FacilityController {
	private final FacilityService service;
	
	//커뮤니티시설 목록조회
	@GetMapping("list")
	public Map<String, Object> list(){
		List<FacilityVo> facilityVoList = service.list();
		System.out.println(facilityVoList);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("facilityVoList", facilityVoList);
		return map;
	}
	
	//커뮤니티시설 상세정보조회
	@GetMapping("detail")
	public Map<String, Object> detail(@RequestBody FacilityVo vo){
		FacilityVo facilityVo = service.detail(vo);
		Map<String,Object> map = new HashMap<String, Object>();
		map.put("facilityVo", facilityVo);
		return map;
	}
	
	//예약내역조회 (사용자) + 기간으로 조회 
	@GetMapping("history")
	public List<FacilityHistoryVo> listByHistory(@RequestBody FacilityHistoryVo vo){
		return service.listByHistory(vo);
	}
	
	//예약추가(회원번호, 이용일)
	@PostMapping("apply")
	public Map<String, String> apply(@RequestBody FacilityHistoryVo vo){
		int result = service.apply(vo);
		Map<String,String> map = new HashMap<String, String>();
		map.put("msg", "good");
		if(result != 1) {
			map.put("msg", "bad");
		}
		return map;
	}
	
	//예약취소(신청번호)
	@PutMapping("cancel")
	public Map<String, String> cancel(@RequestBody FacilityHistoryVo vo){
		int result = service.cancel(vo);
		Map<String, String> map = new HashMap<String, String>();
		map.put("msg", "good");
		if(result != 1) {
			map.put("msg", "bad");
		}
		return map;
	}
	
	//커뮤니티시설 목록조회(+상세조회) (관리자)
	@GetMapping("admin/list")
	public List<FacilityVo> listForAdmin(){
		return service.listForAdmin();
	}
	
	//커뮤니티시설 등록 (관리자)
	@PostMapping("admin/insert")
	public Map<String, String> insert(@RequestBody FacilityVo vo){
		int result = service.insert(vo);
		Map<String, String> map = new HashMap<String, String>();
		map.put("msg", "good");
		if(result != 1) {
			map.put("msg", "bad");
		}
		return map;
	}
	
	//커뮤니티시설 수정 (관리자)
	@PutMapping("admin/edit")
	public Map<String, String> edit(@RequestBody FacilityVo vo){
		int result = service.edit(vo);
		Map<String, String> map = new HashMap<String, String>();
		map.put("msg", "good");
		if(result != 1) {
			map.put("msg", "bad");
		}
		return map;
	}
	
	//커뮤니티시설 삭제 (관리자)
	@PutMapping("admin/delete")
	public Map<String, String> delete(@RequestBody FacilityVo vo){
		int result = service.delete(vo);
		Map<String, String> map = new HashMap<String, String>();
		map.put("msg", "good");
		if(result != 1) {
			map.put("msg", "bad");
		}
		return map;
	}
}
