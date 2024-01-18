package com.team1.app.vote.controller;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.*;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.team1.app.vote.service.VoteService;
import com.team1.app.vote.vo.VoteVo;

import lombok.RequiredArgsConstructor;

//투표
@RestController
@RequiredArgsConstructor
@RequestMapping("vote")
public class VoteController {

	private final VoteService service;
	
	// 전체 투표 게시글 조회
	@GetMapping("list")
	public List<VoteVo> list() {
		List<VoteVo> voList= service.list();
//		System.out.println(voList);
		return voList;
	}
	
	//투표 게시글 상세 조회
	@PostMapping("detail")
	public VoteVo detail(@RequestBody VoteVo vo) throws ParseException {
		VoteVo voteVo = service.detail(vo);
		return voteVo;
	}
	
	// 투표하기
	@PostMapping("voting")
	public int voting( @RequestBody VoteVo vo) {
//		System.out.println(vo);
		//test용 데이터
//		vo.setVoteNo("1");
//		vo.setItemNo("3");
//		vo.setPrtcNo("11");
		
		int result = service.voting(vo);
		System.out.println(result);
		return result;
	}	
	
	//투표 게시글 
	@GetMapping("select")
	public List<VoteVo> select(VoteVo vo) {
		
		//test용 데이터
//		vo.setTitle("투표");
//		vo.setContent("투표");
		
		List<VoteVo> voList = service.select(vo); 
		
//		for (VoteVo voteVo : voList) {
//			
//			System.out.println(voteVo);
//		}
		return voList;
	}	
	//투표 게시글, 투표 항목 작성하기
	@PostMapping("insert")
	public void insert( @RequestBody VoteVo vo ) {
		System.out.println(vo);
		//test 용 데이터 마이바티스 FORRECH
//		vo.setManagerNo("11");
//		vo.setTitle("11번 테스트 전자 투표");
//		vo.setContent("테스트용 투표 진행합니다.");
//		VoteVo vvo1 = new VoteVo();
//		VoteVo vvo2 = new VoteVo();
//		VoteVo vvo3 = new VoteVo();
//		vvo1.setVoteNo("6");
//		vvo2.setVoteNo("6");
//		vvo3.setVoteNo("6");
//		vvo1.setItemName("TEST1");
//		vvo2.setItemName("TEST2");
//		vvo3.setItemName("TEST3");
//		vvo1.setVoteOrder("1");
//		vvo2.setVoteOrder("2");
//		vvo3.setVoteOrder("3");
//		vvo1.setVoteType("일반투표");
//		vvo2.setVoteType("일반투표");
//		vvo3.setVoteType("일반투표");
		List<VoteVo> voList = new ArrayList<VoteVo>();
//		voList.add(vvo1);
//		voList.add(vvo2);
//		voList.add(vvo3);
//		
		boolean result = service.insert(vo,voList);
//		
		System.out.println(result);
	}
	
	@PostMapping("itemInsert")
	public void itemInsert(@RequestBody List<VoteVo> voList) {
		System.out.println(voList);
		
	}
	
	//투표 게시글 수정 (글제목, 글내용)
	@PostMapping("edit")
	public int edit( @RequestBody VoteVo vo) {
		System.out.println(vo);
		
		int result = service.edit(vo);
		System.out.println(result);
		
		return result;
	}
	
	//투표 게시글 삭제
	@DeleteMapping("delete")
	public void delete(String no) {
		
		no = "6";
		
		int result = service.delete(no);
		
		System.out.println(result);
	}
	
	
	// 전체 투표 수 조회 (투표율)
	@GetMapping("voteCount")
	public void voteCount(String no){
		
		//test용 데이터
		no = "1";
		
		int count = service.voteCount(no);
		
		System.err.println(count);
	}
	
	//투표 종료
	@PutMapping("voteEnd")
	public void voteEnd(VoteVo vo) {
		
		//test용 데이터 마이바티스 FORRECH
		vo.setVoteNo("3");
		
		boolean result = service.voteEnd(vo);
		
		System.out.println(result);
	}
	
	// 투표 조회
	@GetMapping("voteCheck")
	public void voteCheck(String no) {
		
		//test용 데이터
		no = "5";
		
		List<VoteVo> voList = service.voteCheck(no);
		
		for (VoteVo voteVo : voList) {
			System.out.println(voteVo);
		}
	}
	

	/*관리자 페이지**********************************************/
	// 관리자 전체 투표 게시글 조회
	@GetMapping("adminList")
	public List<VoteVo> adminList() {
		List<VoteVo> voList = service.adminList();
		
//		for (VoteVo voteVo : voList) {
//			System.out.println(voteVo);
//		}
		return voList;
	}
	
	// 관리자 게시글 상세 조회
	@GetMapping("adminDetail")
	public VoteVo adminDetail(VoteVo vo) {
//		no = "1";		
		VoteVo voteVo = service.adminDetail(vo);
		return voteVo;
	}
	
	// 관리자 게시글 검색
	@GetMapping("adminSelect")
	public void adminSelect(VoteVo vo) {
		
		//test용 데이터
		vo.setDelYn("N");
		vo.setManagerId("admin");
		vo.setTitle("투표");
		vo.setContent("투표");
		vo.setEnrollDateStart("20240101");
		vo.setEnrollDateEnd("20240110");
		vo.setDelYn("N");
		vo.setAcceptYn("N");
		
		List<VoteVo> voList = service.adminSelect(vo);
		for (VoteVo voteVo : voList) {
			System.out.println(voteVo);
		}
	}
	
	// 투표 결과 상세 조회
	@GetMapping("history")
	public void history(VoteVo vo) {
		
		vo.setVoteNo("3");
		
		List<VoteVo> voList = service.history(vo);
		
		for (VoteVo voteVo : voList) {
			System.out.println(voteVo);
		}
	}
	
	// 관리자 투표 전체 결과 이력 조회  
	@GetMapping("adminHistory")
	public void adminHistory() {
		List<VoteVo> voList = service.adminHistory();
		
		for (VoteVo voteVo : voList) {
			System.out.println(voteVo);
		}
	}
}
