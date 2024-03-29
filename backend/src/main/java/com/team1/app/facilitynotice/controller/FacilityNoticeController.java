package com.team1.app.facilitynotice.controller;

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
import org.springframework.web.bind.annotation.RestController;

import com.team1.app.board.vo.BoardVo;
import com.team1.app.facilitynotice.service.FacilityNoticeService;
import com.team1.app.facilitynotice.vo.FacilityNoticeVo;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("facility/notice")
@RequiredArgsConstructor
public class FacilityNoticeController {
	private final FacilityNoticeService service;

	//커뮤니티공지 목록조회
	@PostMapping("list")
	public Map<String, Object> list(@RequestBody FacilityNoticeVo vo){
		System.out.println(vo);
		List<FacilityNoticeVo> facilityNoticeVoList = service.list(vo);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("facilityNoticeVoList", facilityNoticeVoList);
		map.put("msg", "good");
		return map;
	}

	//커뮤니티공지 상세조회
	@PostMapping("detail")
	public Map<String, Object> detail(@RequestBody FacilityNoticeVo vo){
		FacilityNoticeVo facilityNoticeVo = service.detail(vo);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("facilityNoticeVo", facilityNoticeVo);
		System.out.println(facilityNoticeVo);
		return map;
	}

	//커뮤니티공지 목록조회 (관리자)
	@GetMapping("admin/list")
	public Map<String, Object> listByAdmin(){
		List<FacilityNoticeVo> facilityNoticeVoList = service.listByAdmin();
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("facilityNoticeVoList", facilityNoticeVoList);
		return map;
	}

	//커뮤니티공지 상세조회 (관리자)
	@GetMapping("admin/detail")
	public Map<String, Object> detailByAdmin (@RequestBody FacilityNoticeVo vo){
		FacilityNoticeVo facilityNoticeVo = service.detailByAdmin(vo);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("facilityNoticeVo", facilityNoticeVo);
		return map;
	}

	//커뮤니티공지 등록
	@PostMapping("admin/insert")
	public Map<String, String> insert(@RequestBody FacilityNoticeVo vo){
		int result = service.insert(vo);
		Map<String, String> map = new HashMap<String, String>();
		map.put("msg", "good");
		if(result != 1) {
			map.put("msg", "bad");
		}
		return map;
	}
	
	//커뮤니티공지 수정
	@PutMapping("admin/edit")
	public Map<String, String> edit(@RequestBody FacilityNoticeVo vo){
		int result = service.edit(vo);
		Map<String, String> map = new HashMap<String, String>();
		map.put("msg", "good");
		if(result != 1) {
			map.put("msg", "bad");
		}
		return map;
	}
	
	//커뮤니티공지 삭제
	@PutMapping("admin/delete")
	public Map<String, String> delete(@RequestBody FacilityNoticeVo vo){
		int result = service.delete(vo);
		Map<String, String> map = new HashMap<String, String>();
		map.put("msg", "good");
		if(result != 1) {
			map.put("msg", "bad");
		}
		return map;
	}
}