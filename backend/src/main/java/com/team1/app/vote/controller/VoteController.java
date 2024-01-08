package com.team1.app.vote.controller;

import java.util.*;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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
	
	@GetMapping("list")
	public void list() {
		List<VoteVo> voList= service.list();
	}
	
	@GetMapping("detail")
	public void detail(String no) {
		Map<String,Object> map = service.detail(no);
	}
	
	//아직 확인 안함 (게시글 + 투표 항목 작성하기)
	@PostMapping("insert")
	public void insert(VoteVo vo, List<VoteVo> voList ) {
		int result = service.insert(vo,voList);
	}
	//여기부터 확인 안함-----------------------------------------
	@PutMapping("edit")
	public void edit(VoteVo vo) {
		int result = service.edit(vo);
	}
	
	@DeleteMapping("delete")
	public void delete(String no) {
		int result = service.delete(no);
	}
	
	@GetMapping("select")
	public void select(VoteVo vo) {
		List<VoteVo> voList = service.select(vo); 
	}
	
	@GetMapping("voteCount")
	public void voteCount(String no){
		int count = service.voteCount(no);
	}
	
	@PutMapping("voteEnd")
	public void voteEnd(String no) {
		VoteVo vo = service.voteEnd(no);
	}
	
	@GetMapping("voteCheck")
	public void voteCheck(String no) {
		List<VoteVo> voList = service.voteCheck(no);
	}
	
	@PostMapping("voting")
	public void voting(VoteVo vo) {
		int result = service.voting(vo);
	}
	
	@GetMapping("adminList")
	public void adminList() {
		List<VoteVo> voList = service.adminList();
	}
	
	@GetMapping("adminDetail")
	public void adminDetail(String no) {
		Map<String,Object> map = service.adminDetail(no);
	}
	
	@GetMapping("adminSelect")
	public void adminSelect(VoteVo vo) {
		List<VoteVo> voList = service.adminSelect(vo);
	}
	
	@GetMapping("history")
	public void history(String no) {
		VoteVo vo = service.history(no);
	}
	
	@GetMapping("adminHistory")
	public void adminHistory() {
		List<VoteVo> voList = service.adminHistory();
	}
}
