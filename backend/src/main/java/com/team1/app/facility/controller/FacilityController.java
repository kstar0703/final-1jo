package com.team1.app.facility.controller;
import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.team1.app.facility.service.FacilityService;
import com.team1.app.facility.vo.FacilityHistoryVo;
import com.team1.app.facility.vo.FacilityVo;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("facility")
@RequiredArgsConstructor
public class FacilityController {
	private final FacilityService service;
	
	//커뮤니티시설 목록조회
	@GetMapping("list")
	public Map<String, Object> list(){
		List<FacilityVo> facilityVoList = service.list();
		System.out.println(facilityVoList);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("facilityVoList", facilityVoList);
		return map;
	}
	
	//커뮤니티시설 상세정보조회
	@PostMapping("detail")
	public Map<String, Object> detail(@RequestBody FacilityVo vo){
		FacilityVo facilityVo = service.detail(vo);
		Map<String,Object> map = new HashMap<String, Object>();
		map.put("facilityVo", facilityVo);
		return map;
	}
	
	//커뮤니티시설 상세정보조회 (관리자용)
	@PostMapping("admin/detail")
	public Map<String, Object> detailForAdmin(@RequestBody FacilityVo vo){
		FacilityVo facilityVo = service.detailForAdmin(vo);
		Map<String,Object> map = new HashMap<String, Object>();
		map.put("facilityVo", facilityVo);
		return map;
	}
	
	//전체예약내역조회 (관리자)
	@GetMapping("admin/history")
	public Map<String, Object> listByHistoryForAdmin(){
		List<FacilityHistoryVo> facilityHistoryVoList = service.listByHistoryForAdmin();
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("facilityHistoryVoList", facilityHistoryVoList);
		return map;
	}
	
	//예약내역조회 (사용자) + 기간으로 조회 
	@PostMapping("history")
	public Map<String, Object> listByHistory(@RequestBody FacilityHistoryVo vo){
		List<FacilityHistoryVo> historyVoList = service.listByHistory(vo);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("historyVoList", historyVoList);
		return map;
	}
	
	//예약추가(회원번호, 이용일)
	@PostMapping("apply")
	public Map<String, String> apply(@RequestBody FacilityHistoryVo vo){
		System.out.println(vo);
		int result = service.apply(vo);
		Map<String,String> map = new HashMap<String, String>();
		map.put("msg", "good");
		if(result != 1) {
			map.put("msg", "bad");
		}
		return map;
	}
	
	//예약취소(신청번호)
	@PutMapping("cancel")
	@CrossOrigin(origins = "http://localhost:3000")
	public Map<String, String> cancel(@RequestBody FacilityHistoryVo vo){
		System.out.println(vo);
		int result = service.cancel(vo);
		Map<String, String> map = new HashMap<String, String>();
		map.put("msg", "good");
		if(result != 1) {
			map.put("msg", "bad");
		}
		return map;
	}
	
	//커뮤니티시설 목록조회(+상세조회) (관리자)
	@GetMapping("admin/list")
	public Map<String, Object> listForAdmin(){
		List<FacilityVo> facilityVoList = service.listForAdmin();
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("facilityVoList", facilityVoList);
		return map;
	}
	
	//커뮤니티시설 등록 (관리자)
	@PostMapping("admin/insert")
	public Map<String, String> insert(FacilityVo vo, @RequestParam(required = false) MultipartFile file, HttpServletRequest req) throws Exception{
		System.out.println("시설등록:" + vo);
		System.out.println("시설이미지:" + file);
		
		String rootDir = req.getServletContext().getRealPath("/");
		String commonRoot = rootDir.substring(0, rootDir.indexOf("backend") + "backend".length());
		String route = "\\src\\main\\webapp";
		String path = "\\resources\\upload\\board\\img\\";
		String savePath = commonRoot + route + path;
		
		if(file != null) {
		String imgName = saveFile(file, savePath);
		String fullPath = "http://127.0.0.1:8888/app" + path + imgName;
		vo.setImage(fullPath);
		}
		int result = service.insert(vo);
		Map<String, String> map = new HashMap<String, String>();
		map.put("msg", "good");
		if(result != 1) {
			map.put("msg", "bad");
		}
		return map;
		
		
//		int result = service.insert(vo, image);
//		Map<String, String> map = new HashMap<String, String>();
//		map.put("msg", "good");
//		if(result != 1) {
//			map.put("msg", "bad");
//		}
//		return map;
	}
	
	private String saveFile(MultipartFile file, String savePath) throws Exception{
		String originName = file.getOriginalFilename();
		String extension = originName.substring(originName.lastIndexOf("."));
		String imgName = UUID.randomUUID() + extension;
		File target = new File(savePath + imgName);
		file.transferTo(target);
		return imgName;
		
		
		
		/**
		String path = "C:\\dev\\khTeamPrj\\team1Repo\\backend\\src\\main\\webapp\\resources\\upload\\facility\\";
		String orginName = f.getOriginalFilename();
		//원래는 "changeName(랜덤값) + 확장자"로 해야함 
		File target = new File(path + orginName); 
		f.transferTo(target); 
		return path + orginName; 
		**/
	}	
	
	
	//커뮤니티시설 수정 (관리자)
	@CrossOrigin(origins = "http://localhost:3000")
	@PostMapping("admin/edit")
	public Map<String, String> edit(@ModelAttribute FacilityVo vo, @RequestParam(required = false) MultipartFile file, HttpServletRequest req) throws Exception{
		
		System.out.println("file" + file);
		
		String rootDir = req.getServletContext().getRealPath("/");
		String commonRoot = rootDir.substring(0, rootDir.indexOf("backend") + "backend".length());
		String route = "\\src\\main\\webapp";
		String path = "\\resources\\upload\\board\\img\\";
		String savePath = commonRoot + route + path;
		
		if(file != null) {
			String imgName = saveFile(file, savePath);
			String image = "http://127.0.0.1:8888/app" + path + imgName;
			vo.setImage(image);
		}
		int result = service.edit(vo);
		Map<String, String> map = new HashMap<String, String>();
		map.put("msg", "good");
		if(result != 1) {
			map.put("msg", "bad");
		}
		return map;
	}
	
	//커뮤니티시설 삭제 (관리자)
	@CrossOrigin(origins = "http://localhost:3000")
	@PutMapping("admin/delete")
	public Map<String, String> delete(@RequestBody FacilityVo vo){
		System.out.println(vo);
		int result = service.delete(vo);
		Map<String, String> map = new HashMap<String, String>();
		map.put("msg", "good");
		if(result != 1) {
			map.put("msg", "bad");
		}
		return map;
	}
}
