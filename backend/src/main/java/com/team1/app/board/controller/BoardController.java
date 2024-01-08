package com.team1.app.board.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.team1.app.board.service.BoardService;
import com.team1.app.board.vo.BoardImgVo;
import com.team1.app.board.vo.BoardLikeVo;
import com.team1.app.board.vo.BoardReplyVo;
import com.team1.app.board.vo.BoardVo;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("board")
@RequiredArgsConstructor
@CrossOrigin("*")
public class BoardController {
	private final BoardService service;

	// 전체 게시글 조회
	@GetMapping("list")
	public List<BoardVo> list(){
		return service.list();
	}

	//게시글 상세 조회
	@GetMapping("detail")
	public Map<String, Object> detail(@RequestBody BoardVo vo){
		BoardVo boardVo = service.detail(vo);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("boardVo", boardVo);
		return map; 
	}

	//게시글 작성
	@PostMapping("insert")
	public Map<String, String> insert(@RequestBody BoardVo vo){
		int boardResult = service.insert(vo); 

		int imgResult = 0;
		List<BoardImgVo> imgs = vo.getImgs(); 
		if(imgs != null) {
			imgResult = service.insertImg(imgs);
		}
		Map<String, String> map = new HashMap<String, String>();
		map.put("msg", "bad");
		if(boardResult == 1 && imgResult == 1) {
			map.put("msg", "good");
		}
		return map;
	}
	
	//게시글 수정
	@PostMapping("edit")
	public Map<String, String> edit(@RequestBody BoardVo vo){
		int boardResult = service.edit(vo); 

		int imgResult = 0;
		List<BoardImgVo> imgs = vo.getImgs(); 
		if(imgs != null) {
			imgResult = service.insertImg(imgs);
		}
		Map<String, String> map = new HashMap<String, String>();
		map.put("msg", "bad");
		if(boardResult == 1 && imgResult == 1) {
			map.put("msg", "good");
		}
		return map;
	}
	
	// 게시글 삭제
	@GetMapping("delete")
	public Map<String, String> delete(@RequestBody BoardVo vo){
		int result = service.delete(vo);
		Map<String, String> map = new HashMap<String, String>();
		map.put("msg", "good");
		if(result != 1) {
			map.put("msg", "bad");
		}
		return map;
	}
	
	//게시글 검색
	@GetMapping("search")
	public List<BoardVo> search(@RequestBody Map<String, Object> searchMap){
		return service.search(searchMap); 
	}
	
	// 댓글 조회
	@GetMapping("replyList")
	public List<BoardReplyVo> replyList(@RequestBody BoardReplyVo vo){
		return service.replyList(vo);
	}
	
	// 댓글 작성
	@PostMapping("replyWrite")
	public Map<String, String> replyWrite(@RequestBody BoardReplyVo vo){
		int result = service.replyWrite(vo);
		Map<String, String> map = new HashMap<String, String>();
		map.put("msg", "good");
		if(result != 1) {
			map.put("msg", "bad");
		}
		return map;
	}
	
	//댓글 수정
	@PostMapping("replyEdit")
	public Map<String, String> replyEdit(@RequestBody BoardReplyVo vo) {
		int result = service.replyEdit(vo);
		Map<String, String> map = new HashMap<String, String>();
		map.put("msg", "good");
		if(result != 1) {
			map.put("msg", "bad");
		}
		return map;
	}
	
	//댓글 삭제
	@GetMapping("replyDelete")
	public Map<String, String> replyDelete(@RequestBody BoardReplyVo vo){
		int result = service.replyDelete(vo);
		Map<String, String> map = new HashMap<String, String>();
		map.put("msg", "good");
		if(result != 1) {
			map.put("msg", "bad");
		}
		return map;
	}
	
	// 댓글 검색
	@GetMapping("replySearch")
	public Map<String, Object> replySearch(@RequestBody Map<String, Object> searchMap){
		List<BoardReplyVo> boardReplyVo = service.replySearch(searchMap);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("boardReplyVo", boardReplyVo);
		return map;
	}

	//좋아요수 조회
	@GetMapping("listLikeCount")
	public int listLikeCount(String boardNo) {
		return service.listLikeCount(boardNo);
	}

	//좋아요 클릭
	@GetMapping("clickLike")
	public int clickLike(BoardLikeVo vo) {
		return service.clickLike(vo);
	}

	// 전체 게시글 조회 (관리자)
	@GetMapping("admin/list")
	public List<BoardVo> listByAdmin(){
		return service.listByAdmin();
	}
	
	// 게시글 상세 조회 (관리자)
	@GetMapping("admin/detail")
	public Map<String, Object> detailByAdmin(@RequestBody BoardVo vo){
		BoardVo boardVo	= service.detailByAdmin(vo);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("boardVo", boardVo);
		return map;
	}
	
}
