package com.team1.app.announcement.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.team1.app.announcement.service.AnnouncementService;
import com.team1.app.announcement.vo.AnnouncementVo;
import com.team1.app.util.vo.PageVo;

import lombok.RequiredArgsConstructor;

//공지사항
@RequestMapping("announcement")
@RestController
@RequiredArgsConstructor
public class AnnouncementController {
	
	private final AnnouncementService service;
	
	
	/**
	 * 공지사항 작성
	 * @param vo
	 * @param fileArr 파일리스트 , managerNo, 
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
	 * 공지사항 수정(관리자)
	 * @param vo (announcementNo) ,동적(title,content) fileArr
	 * @return 
	 * not body
	 * @throws IOException 
	 * @throws IllegalStateException 
	 */
	@PostMapping("change")
	public Map<String,Object> change(AnnouncementVo vo,MultipartFile[] fileArr) throws IllegalStateException, IOException{
		
		Map<String,Object> resultMap = new HashMap();

		Boolean result = service.change(vo,fileArr);
		
		if(result) {
			resultMap.put("status", "good");
			resultMap.put("msg", "게시글 수정 성공");
		}
		
		return resultMap;		
	}

	/**
	 * 공지사항 리스트 조회
	 * @param vo title,content,id(관리자 아이디) 검색어 , currentPage,boardLimit (PageVo)
	 * @return  
	 * 페이징용 count 메소드 호출 
	 * 
	 */
	@GetMapping("list")
	public Map<String,Object> list(AnnouncementVo vo,PageVo pageVo){
		
		
		
		Map<String,Object> resultMap = new HashMap();
		
		int cnt = service.count(vo);
		
		//페이지 리밋
		int pageLimit = 10;	
		
		
		PageVo pvo = new PageVo(cnt,pageVo.getCurrentPage() , pageLimit  , pageVo.getBoardLimit() );
	
		
	
		List<AnnouncementVo> voList = service.list(vo,pvo);
		
		
		resultMap.put("status", "good");
		resultMap.put("msg", "조회 성공");
		resultMap.put("voList", voList);
		resultMap.put("pageVo",pvo);
		
		
		return resultMap;
	}
	/**
	 * @param vo announcement 
	 * 
	 */
	
	//TODO 뒤에 메소드 String 받도록 리펙토링
	@GetMapping("detail/{announcementNo}")
	public Map<String,Object> detail(@PathVariable String announcementNo){
		
		Map<String,Object> resultMap = new HashMap();
		resultMap.put("status", "good");
		resultMap.put("msg", "조회 성공");
		
		AnnouncementVo vo = new AnnouncementVo();
		
		vo.setAnnouncementNo(announcementNo);
		AnnouncementVo resultVo = service.detail(vo);
		
		
		if(resultVo ==null) {
			resultMap.put("status", "bad");
			resultMap.put("msg", "조회 실패");	
		}
		resultMap.put("resultVo", resultVo);

		return resultMap;		
	}
	

	/**
	 * 
	 * @param announcementNo
	 * @return
	 */
	@PostMapping("delete")
	public Map<String, String> delete(AnnouncementVo vo){
		
		Map<String,String> resultMap = new HashMap();
		resultMap.put("status","bad");
		resultMap.put("msg","삭제 실패");
		
		
		boolean result = service.delete(vo); 
		
		if(result) {
			resultMap.put("status","good");
			resultMap.put("msg","삭제 성공");
		}
		
		
		return resultMap;		
	}
	
	
	
	
}


