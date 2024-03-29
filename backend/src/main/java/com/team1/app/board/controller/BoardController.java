package com.team1.app.board.controller;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.team1.app.board.service.BoardService;
import com.team1.app.board.vo.BoardImgVo;
import com.team1.app.board.vo.BoardLikeVo;
import com.team1.app.board.vo.BoardListDto;
import com.team1.app.board.vo.BoardReplyVo;
import com.team1.app.board.vo.BoardVo;
import com.team1.app.board.vo.CategoryVo;
import com.team1.app.util.vo.PageVo;
import com.team1.app.util.vo.SearchVo;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("board")
@RequiredArgsConstructor
public class BoardController {
	private final BoardService service;

	// 전체 게시글 조회 (+댓글수 + 좋아요수 추가)
	@PostMapping("list")
	public Map<String, Object> list(@RequestBody BoardListDto boardListDto){
		
		
		BoardVo boardVo = boardListDto.getBoardVo();
		PageVo pageVo = boardListDto.getPageVo();
		System.out.println("들어온" + pageVo);
		System.out.println("들어온" + boardVo);
		int cnt = service.count(boardVo);
		System.out.println(cnt);
		PageVo pvo = new PageVo(cnt, pageVo.getCurrentPage(), 5, 5);
		
		List<BoardVo> boardVoList = service.list(boardVo, pvo);
		System.out.println(boardVoList);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("boardVoList", boardVoList);
		map.put("pageVo", pvo);	
		System.out.println(pvo);
		map.put("msg", "good");
		return map;
	}

	//게시글 상세 조회
	@GetMapping("detail/{boardNo}")
	public Map<String, Object> detail(@PathVariable String boardNo){
		BoardVo boardVo = service.detail(boardNo);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("boardVo", boardVo);
		map.put("msg", "good");
		return map; 
	}
	
	//카테고리 조회
	@GetMapping("category")
	public Map<String, Object> listCategory(){
		List<CategoryVo> categoryVoList = service.listCategory();
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("categoryVoList", categoryVoList);
		map.put("msg", "good");
		return map;		
	}
	//게시글 작성
	@PostMapping("write")
	public Map<String, String> insert(BoardVo vo, @RequestParam(value="files", required=false) List<MultipartFile> files, HttpServletRequest req) throws Exception{
		System.out.println("cno:" + vo.getCategoryNo());
		System.out.println("wno:" + vo.getWriterNo());
		System.out.println("title:" + vo.getTitle());
		System.out.println("content:" + vo.getContent());
		System.out.println(files.size());
		
		int result = service.insert(vo, files, req);
		
		Map<String, String> map = new HashMap<String, String>();
		map.put("msg", "good");
		if(result != 1) {
			map.put("msg", "bad");
		}
		return map;
	}
	
	//작성자 번호로 최근 게시물 번호 1개 조회
	@GetMapping("findLatestPost/{writerNo}")
	public Map<String, String> findLatestPost(@PathVariable String writerNo){
		System.out.println("writerNo:" + writerNo);
		BoardVo boardVo = service.findLatestPost(writerNo);
		String boardNo = boardVo.getBoardNo();
		Map<String, String> map = new HashMap<String, String>();
		map.put("boardNo", boardNo);
		map.put("msg", "good");
		return map;
	}


	//게시글 수정
	@PutMapping("/{boardNo}")
	public Map<String, String> edit(BoardVo vo, List<MultipartFile> files, HttpServletRequest req) throws Exception{
		System.out.println(vo);
		int result = service.edit(vo, files, req);
		Map<String, String> map = new HashMap<String, String>();
		map.put("msg", "good");
		if(result != 1) {
			map.put("msg", "bad");
		}
		return map;
	}
	
	// 게시글 삭제
	@CrossOrigin(origins = "http://localhost:3000")
	@DeleteMapping("delete")
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
	public List<BoardVo> search(@RequestParam String searchType, String searchKeyword){
		SearchVo vo = new SearchVo(searchType, searchKeyword);
		return service.search(vo); 
	}
	
	// 댓글 조회
	@PostMapping("replyList")
	public Map<String, Object> replyList(@RequestBody BoardReplyVo vo){
		System.out.println(vo);
		List<BoardReplyVo> replyVoList = service.replyList(vo);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("replyVoList", replyVoList);
		map.put("msg", "good");
		return map;
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
	@CrossOrigin(origins = "http://localhost:3000")
	@PutMapping("replyEdit")
	public Map<String, String> replyEdit(@RequestBody BoardReplyVo vo) {
		System.out.println(vo);
		int result = service.replyEdit(vo);
		Map<String, String> map = new HashMap<String, String>();
		map.put("msg", "good");
		if(result != 1) {
			map.put("msg", "bad");
		}
		return map;
	}
	
	//댓글 삭제
	@CrossOrigin(origins = "http://localhost:3000")
	@DeleteMapping("replyDelete")
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
	public Map<String, Object> replySearch(@RequestParam String searchType, @RequestParam String searchKeyword){
		SearchVo vo = new SearchVo(searchType, searchKeyword);
		List<BoardReplyVo> boardReplyVo = service.replySearch(vo);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("boardReplyVo", boardReplyVo);
		return map;
	}

	//좋아요수 조회
	@GetMapping("listLikeCount/{boardNo}")
	public Map<String, Integer> listLikeCount(@PathVariable String boardNo) {
		int likeCount = service.listLikeCount(boardNo);
		Map<String, Integer> map = new HashMap<String, Integer>();
		map.put("likeCount", likeCount);
		return map;
	}

	//좋아요 클릭
	@PostMapping("clickLike")
	public Map<String, String> clickLike(@RequestBody BoardLikeVo vo) {
		int result = service.clickLike(vo);
		Map<String, String> map = new HashMap<String, String>();
		map.put("msg", "good");
		if(result != 1) {
			map.put("msg", "bad");
		}
		return map;
	}

	// 전체 게시글 조회 (관리자)
	@GetMapping("admin/list")
	public Map<String, Object> listByAdmin(){
		List<BoardVo> boardVoList =  service.listByAdmin();
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("boardVoList", boardVoList);
		map.put("msg", "good");
		return map;
	}
	
	// 게시글 상세 조회 (관리자)
	@PostMapping("admin/detail")
	public Map<String, Object> detailByAdmin(@RequestBody BoardVo vo){
		BoardVo boardVo	= service.detailByAdmin(vo);
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("boardVo", boardVo);
		map.put("msg", "good");
		return map;
	}
	
	//관리자 규제
	@GetMapping("admin/ban/{boardNo}")
	public Map<String, String> banByAdmin(@PathVariable String boardNo){
		System.out.println(boardNo);
		int result = service.banByAdmin(boardNo);
		Map<String, String> map = new HashMap<String, String>();
		map.put("msg", "good");
		if(result != 1) {
			map.put("msg", "bad");
		}
		return map;
	}
	
}
