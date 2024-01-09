package com.team1.app.vote.controller;

import java.util.*;

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
	public void list() {
		List<VoteVo> voList= service.list();
		System.out.println(voList);
	}
	
	//투표 게시글 상세 조회
	@GetMapping("detail")
	public void detail(String no) {
		no = "1";
		
		Map<String,Object> map = service.detail(no);
		
		System.out.println(map);
	}
	
	//투표 게시글, 투표 항목 작성하기
	@PostMapping("insert")
	public void insert( VoteVo vo ) {
		vo.setManagerNo("11");
		vo.setTitle("11번 테스트 전자 투표");
		vo.setContent("테스트용 투표 진행합니다.");
		VoteVo vvo1 = new VoteVo();
		VoteVo vvo2 = new VoteVo();
		VoteVo vvo3 = new VoteVo();
		vvo1.setVoteNo("11");
		vvo2.setVoteNo("11");
		vvo3.setVoteNo("11");
		vvo1.setItemName("TEST1");
		vvo2.setItemName("TEST2");
		vvo3.setItemName("TEST3");
		vvo1.setVoteOrder("1");
		vvo2.setVoteOrder("2");
		vvo3.setVoteOrder("3");
		vvo1.setVoteType("일반투표");
		vvo2.setVoteType("일반투표");
		vvo3.setVoteType("일반투표");
		List<VoteVo> voList = new ArrayList<VoteVo>();
		voList.add(vvo1);
		voList.add(vvo2);
		voList.add(vvo3);
		
		int result = service.insert(vo,voList);
		
		System.out.println(result);
	}
	
	//투표 게시글 수정 (글제목, 글내용)
	@PutMapping("edit")
	public void edit(VoteVo vo) {
		int result = service.edit(vo);
	}
	
	//투표 게시글 삭제
	@DeleteMapping("delete")
	public void delete(String no) {
		int result = service.delete(no);
	}
	
	//투표 게시글 검색
	@GetMapping("select")
	public void select(VoteVo vo) {
		List<VoteVo> voList = service.select(vo); 
	}
	
	// 전체 투표 수 조회 (투표율)
	@GetMapping("voteCount")
	public void voteCount(String no){
		int count = service.voteCount(no);
	}
	
	//투표 종료
	@PutMapping("voteEnd")
	public void voteEnd(String no) {
		VoteVo vo = service.voteEnd(no);
	}
	
	// 투표 조회
	@GetMapping("voteCheck")
	public void voteCheck(String no) {
		List<VoteVo> voList = service.voteCheck(no);
	}
	
	// 투표하기
	@PostMapping("voting")
	public void voting(VoteVo vo) {
		int result = service.voting(vo);
	}
	
	// 관리자 전체 투표 게시글 조회
	@GetMapping("adminList")
	public void adminList() {
		List<VoteVo> voList = service.adminList();
	}
	
	// 관리자 게시글 상세 조회
	@GetMapping("adminDetail")
	public void adminDetail(String no) {
		Map<String,Object> map = service.adminDetail(no);
	}
	
	// 관리자 게시글 검색
	@GetMapping("adminSelect")
	public void adminSelect(VoteVo vo) {
		List<VoteVo> voList = service.adminSelect(vo);
	}
	
	// 투표 결과 상세 조회
	@GetMapping("history")
	public void history(String no) {
		VoteVo vo = service.history(no);
	}
	
	// 관리자 투표 전체 결과 이력 조회  
	@GetMapping("adminHistory")
	public void adminHistory() {
		List<VoteVo> voList = service.adminHistory();
	}
}
