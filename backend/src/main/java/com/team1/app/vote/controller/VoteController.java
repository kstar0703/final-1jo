package com.team1.app.vote.controller;

import java.text.ParseException;
import java.util.*;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.team1.app.util.vo.PageVo;
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
	public Map<String,Object> list(VoteVo vo, PageVo pageVo) {
		int pageCnt = service.pageCnt(vo);
		int pageLimit = 3; //page 제한
		PageVo pvo = new PageVo(pageCnt, pageVo.getCurrentPage(), pageLimit, pageVo.getBoardLimit() );
		
		List<VoteVo> voList = service.list(vo);
		
		Map<String, Object> map = new HashMap<>();
		map.put("voList",voList);
		map.put("pageVo", pvo);
		return map;
	}

	// 투표 게시글 상세 조회
	@PostMapping("detail")
	public VoteVo detail(@RequestBody VoteVo vo) throws ParseException {
		return service.detail(vo);
	}

	// 투표하기
	@PostMapping("voting")
	public int voting(@RequestBody VoteVo vo) {
		int result = service.voting(vo);
		return result;
	}

	// 투표 게시글
	@GetMapping("select")
	public List<VoteVo> select(VoteVo vo) {
		return service.select(vo);
	}

	// 투표 게시글, 투표 항목 작성하기
	@PostMapping("insert")
	public boolean insert(@RequestBody VoteVo vo) {
		return service.insert(vo, vo.getVoList());
	}

	// 투표 게시글 수정 (글제목, 글내용)
	@PostMapping("edit")
	public int edit(@RequestBody VoteVo vo) {
		int result = service.edit(vo);
		return result;
	}

	// 전체 투표 수 조회 (투표율)
	@GetMapping("voteCount")
	public void voteCount(String no) {

		int count = service.voteCount(no);

		System.err.println(count);
	}

	// 투표 종료**********************************************
	
	@PutMapping("voteEnd") 
	public void voteEnd(VoteVo vo) {
		// test용 데이터 마이바티스 FORRECH vo.setVoteNo("3");
		boolean result = service.voteEnd(vo);
		System.out.println(result); 
	}
	 

	// 투표 조회***********************************************
	/*
	 * @GetMapping("voteCheck") public void voteCheck(String no) {
	 * 
	 * // test용 데이터 no = "5";
	 * 
	 * List<VoteVo> voList = service.voteCheck(no);
	 * 
	 * for (VoteVo voteVo : voList) { System.out.println(voteVo); } }
	 */

	// 관리자 전체 투표 게시글 조회
	@GetMapping("adminList")
	public List<VoteVo> adminList() {
		return service.adminList();
	}

	// 관리자 게시글 상세 조회
	@GetMapping("adminDetail")
	public VoteVo adminDetail(VoteVo vo) {
		return service.adminDetail(vo);
	}

	// 관리자 게시글 검색
	@PostMapping("adminSelect")
	public List<VoteVo> adminSelect(@RequestBody VoteVo vo) {
		return service.adminSelect(vo);
	}

	// 투표 결과 상세 조회*************************************************
	/*
	 * @GetMapping("history") public void history(VoteVo vo) {
	 * 
	 * vo.setVoteNo("3");
	 * 
	 * List<VoteVo> voList = service.history(vo);
	 * 
	 * for (VoteVo voteVo : voList) { System.out.println(voteVo); } }
	 */

	// 관리자 투표 전체 결과 이력 조회***************************************
	/*
	 * @GetMapping("adminHistory") public void adminHistory() { List<VoteVo> voList
	 * = service.adminHistory();
	 * 
	 * for (VoteVo voteVo : voList) { System.out.println(voteVo); } }
	 */
}
