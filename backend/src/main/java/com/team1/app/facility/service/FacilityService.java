package com.team1.app.facility.service;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.team1.app.facility.dao.FacilityDao;
import com.team1.app.facility.vo.FacilityHistoryVo;
import com.team1.app.facility.vo.FacilityVo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FacilityService {

	private final FacilityDao dao;
	private final SqlSessionTemplate sst;
	
	//커뮤니티시설 목록조회
	public List<FacilityVo> list() {
		return dao.list(sst);
	}

	//커뮤니티시설 상세정보조회
	public FacilityVo detail(FacilityVo vo) {
		return dao.detail(sst, vo);
	}
	
	//예약내역조회 (사용자)
	public List<FacilityHistoryVo> listByHistory(FacilityHistoryVo vo) {
		//TODO 기간조회 - 화면에 따라 수정할 것 
		return dao.listByHistory(sst, vo);
	}

	//예약추가(회원번호, 이용일)
	public int apply(FacilityHistoryVo vo) {
		return dao.apply(sst, vo);
	}

	//예약취소(신청번호)
	public int cancel(FacilityHistoryVo vo) {
		return dao.cancel(sst, vo);
	}

	//커뮤니티시설 목록조회(+상세조회) (관리자)
	public List<FacilityVo> listForAdmin() {
		return dao.listForAdmin(sst);
	}

	//커뮤니티시설 등록 (관리자)
	public int insert(FacilityVo vo, MultipartFile image, HttpServletRequest req) throws Exception {
		if(image != null) {
			String rootDir = req.getServletContext().getRealPath("/");
			String commonRoot = rootDir.substring(0, rootDir.indexOf("backend") + "backend".length());
			String route = "src\\main\\webapp";
			String path = "\\resources\\upload\\facility\\";
			String savePath = commonRoot + route + path;
			String imageName = saveFile(image, savePath);
			String fullPath = "http://127.0.0.1:8888/app" + path + imageName;
			vo.setImage(fullPath);
		}
		int result = dao.insert(sst, vo);
		 return result;
	}
	
	//파일저장
	public String saveFile(MultipartFile image, String savePath) throws Exception, Exception {
		String originName = image.getOriginalFilename();
		String extension = originName.substring(originName.lastIndexOf("."));
		String imgName = UUID.randomUUID() + extension;
		File target = new File(savePath + imgName);
		image.transferTo(target);
		return imgName;
	}

	//커뮤니티시설 수정 (관리자)
	public int edit(FacilityVo vo) {
		return dao.edit(sst, vo);
	}

	//커뮤니티시설 삭제 (관리자)
	public int delete(FacilityVo vo) {
		return dao.delete(sst, vo);
	}



}
