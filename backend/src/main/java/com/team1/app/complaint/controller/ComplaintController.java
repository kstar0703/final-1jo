package com.team1.app.complaint.controller;

import java.util.*;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.team1.app.complaint.service.ComplaintService;
import com.team1.app.complaint.vo.ComplaintPageVo;
import com.team1.app.complaint.vo.ComplaintVo;
import com.team1.app.util.vo.PageVo;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

//민원 하자 접수
@RestController
@RequestMapping("complaint")
@RequiredArgsConstructor
@Slf4j
public class ComplaintController {

	private final ComplaintService service;
	
	//내 민원 글조회
	@GetMapping("mySumitList")
	public List<ComplaintVo> mySumitList( ComplaintVo vo) {
		return service.mySumitList(vo);
	}
	
	//민원 접수 
	@PostMapping("complaintSumit")
	public boolean complaintSumit(ComplaintVo vo, MultipartFile[] fileArr) throws Exception {
		return service.complaintSumit(vo,fileArr);
	}
	
	//내 민원 상세 조회
	@GetMapping("mySumitDetail")
	public ComplaintVo mySumitDetail(ComplaintVo vo) {
		return service.mySumitDetail(vo);
	}
	
	//관리자 전체 게시글 조회
	@GetMapping("adminList")
	public Map<String,Object> list(PageVo pageVo) {
		int listCount = service.listCnt(null);
		int pageLimit = 10;
		PageVo pvo = new PageVo(listCount,pageVo.getCurrentPage(), pageLimit, pageVo.getBoardLimit());
		List<ComplaintVo> voList = service.list(pvo);
		Map<String,Object> map = new HashMap<>();
		map.put("voList", voList);
		map.put("pageVo", pvo);
		return map;
	}
	
	//관리자 게시글 상세 조회
	@GetMapping("adminDetail")
	public ComplaintVo detail(ComplaintVo vo) {
		return service.detail(vo);
	}
	
	//민원 해결 글 작성
	@PostMapping("clear")
	public int clear( @RequestBody ComplaintVo vo) {
		return service.clear(vo);
	}
	
	//관리자 전체 민원 검색 (썸네일 사용 시)
	@PostMapping("adminSelect")
	public Map<String,Object> select(@RequestBody ComplaintPageVo dto) {
		ComplaintVo vo = dto.getVoList();
		PageVo pageVo = dto.getPageVo();
		int listCount = service.listSelectCnt(vo);
		int pageLimit = 10;
		PageVo pvo = new PageVo(listCount,pageVo.getCurrentPage(),pageLimit,pageVo.getBoardLimit());
		List<ComplaintVo> voList = service.select(vo,pvo);
		Map map = new HashMap<>();
		map.put("voList", voList);
		map.put("pageVo", pvo);
		
		return map; 
	}
	
}
