package com.team1.app.complaint.controller;

import java.io.IOException;
import java.util.*;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

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
	public List<ComplaintVo> mySumitList( ComplaintVo vo) {

		return service.mySumitList(vo);
	}
	
	//민원 접수 
	@PostMapping("complaintSumit")
	public boolean complaintSumit(ComplaintVo vo, MultipartFile[] fileArr) throws Exception {
		System.out.println("vo :"+vo);
		for (MultipartFile multipartFile : fileArr) {
			System.out.println("fileArr :"+multipartFile.getOriginalFilename());
		}
		
		boolean result = service.complaintSumit(vo,fileArr);
		System.out.println(result);
		return result;
	}
	
	//내 민원 상세 조회
	@GetMapping("mySumitDetail")
	public void mySumitDetail(ComplaintVo vo) {
		ComplaintVo resultVo = service.mySumitDetail(vo);
		System.out.println(resultVo);

	}
	
	//관리자 전체 게시글 조회
	@GetMapping("adminList")
	public void list() {
		List<ComplaintVo> voList = service.list();
		for (ComplaintVo complaintVo : voList) {
			System.out.println(complaintVo);
		}
	}
	
	//관리자 게시글 상세 조회
	@GetMapping("adminDetail")
	public void detail(ComplaintVo vo) {
		ComplaintVo resultVo = service.detail(vo);
		System.out.println(resultVo);
	}
	
	//민원 해결 글 작성
	@PostMapping("clear")
	public void clear(ComplaintVo vo) {
		vo.setManagerNo("11");
		vo.setReply("민원 해결 테스트 답변입니다.");
		vo.setComplaintNo("5");
		int result = service.clear(vo);
	}
	
	//관리자 전체 민원 검색 (썸네일 사용 시)
	@GetMapping("adminSelect")
	public void select(ComplaintVo vo) {

		//test용 데이터
		vo.setTitle("테스트");
		vo.setContent("테스트");
		vo.setDelYn("N");
		vo.setReply("테스트");
		vo.setStatus("Y");
		vo.setEnrollDateStart("20230101");
		vo.setEnrollDateEnd("20240110");
		vo.setReplyDateStart("20230101");
		vo.setReplyDateEnd("20240110");
		vo.setDelYn("N");
		List<ComplaintVo> voList = service.select(vo); 
		
		for (ComplaintVo complaintVo : voList) {
			System.out.println(complaintVo);
		}
	}
	
}
