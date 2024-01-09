package com.team1.app.complaint.controller;

import java.util.*;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.team1.app.complaint.service.ComplaintService;
import com.team1.app.complaint.vo.ComplaintVo;

import lombok.RequiredArgsConstructor;

//민원 하자 접수
@RestController
@RequestMapping("complaint")
@RequiredArgsConstructor
public class ComplaintController {

	private final ComplaintService service;
	
	//내 민원 글조회
	@GetMapping("mySumitList")
	public void mySumitList(String no) {
		List<ComplaintVo> voList = service.mySumitList(no);
	}
	
	//민원 접수 
	// 여기 이미지 복수로 들어오게 설계해야 함
	@PostMapping("complaintSumit")
	public void complaintSumit(ComplaintVo vo) {
		int result = service.complaintSumit(vo);
	}
	
	//내 민원 상세 조회
	// 여기 이미지 복수로 들어오게 설계해야 함
	@GetMapping("mySumitDetail")
	public void mySumitDetail(ComplaintVo vo) {
		Map<String,Object> map = service.mySumitDetail(vo);
	}
	
	//관리자 전체 게시글 조회
	@GetMapping("admin/list")
	public void list() {
		List<ComplaintVo> voList = service.list();
	}
	
	//관리자 게시글 상세 조회
	// 여기 이미지 복수로 들어오게 설계해야 함
	@GetMapping("admin/detail")
	public void detail(ComplaintVo vo) {
		Map<String,Object> map = service.detail(vo);
	}
	
	//민원 해결 글 작성
	@PostMapping("clear")
	public void clear(ComplaintVo vo) {
		int result = service.clear(vo);
	}
	
	//관리자 전체 민원 검색 (썸네일 사용 시)
	@GetMapping("admin/select")
	public void select(ComplaintVo vo) {
		List<ComplaintVo> voList = service.select(vo); 
	}
	
}
