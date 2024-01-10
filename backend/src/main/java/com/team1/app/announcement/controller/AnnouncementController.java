package com.team1.app.announcement.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.team1.app.announcement.service.AnnouncementService;
import com.team1.app.announcement.vo.AnnouncementVo;

import lombok.RequiredArgsConstructor;

//공지사항
@RequestMapping("announcement")
@RestController
@RequiredArgsConstructor
public class AnnouncementController {
	
	private final AnnouncementService service;
	
	
	/**
	 * 공지사항
	 * @param vo
	 * @param fileList 파일리스트
	 * @return
	 * @throws Exception 
	 */
	@PostMapping("write")
	public Map<String,String> write(AnnouncementVo vo,MultipartFile[] fileArr ) throws Exception{
		
		Map<String,String> resultMap = new HashMap();
		
		
		boolean success = service.write(vo,fileArr);
		
		if(success) {
			resultMap.put("status", "good");
			resultMap.put("msg", "게시글 작성 성공");
		}
		
		return resultMap;			
	}

	
	/**
	 * 공지사항 리스트 조회
	 * @param vo title,content,like 검색어
	 * @return
	 * 페이징용 count 메소드 호출 
	 * 
	 */
	//TODO count로 page vo 만들기
	@GetMapping("list")
	public Map<String,Object> list(@RequestBody AnnouncementVo vo){
		Map<String,Object> resultMap = new HashMap();
	
		return resultMap;	
	}
	/**
	 * 
	 */
	@PostMapping("detail")
	public Map<String,Object> detail(@RequestBody AnnouncementVo vo){
		Map<String,Object> resultMap = new HashMap();
		
		return resultMap;		
	}
	
	//공지사항 수정(관리자)
	@PostMapping("change")
	public Map<String,Object> change(@RequestBody AnnouncementVo vo){
		Map<String,Object> resultMap = new HashMap();
		
		return resultMap;		
	}
	//게시글삭제 (관리자)
	@PostMapping("delete")
	public Map<String,Object> delete(@RequestBody AnnouncementVo vo){
		Map<String,Object> resultMap = new HashMap();
		
		return resultMap;		
	}
	
	//게시글 검색(제목,내용) 아마 위에 꺼랑 같이 쓰면 될꺼같은데 
	
	
}


