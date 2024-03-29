package com.team1.app.complaint.service;

import java.io.File;
import java.io.IOException;
import java.util.*;

import javax.servlet.http.HttpServletRequest;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.team1.app.complaint.dao.ComplaintDao;
import com.team1.app.complaint.vo.ComplaintImgVo;
import com.team1.app.complaint.vo.ComplaintVo;
import com.team1.app.util.vo.PageVo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ComplaintService {

	private final ComplaintDao dao;
	private final SqlSessionTemplate sst;
	
	
	public List<ComplaintVo> mySumitList(ComplaintVo vo) {
		return dao.mySumitList(sst,vo);
	}


	public boolean complaintSumit(ComplaintVo vo, MultipartFile[] fileArr, HttpServletRequest req) throws IllegalStateException, IOException {
		boolean result = false;
		
		//민원 글 접수
		int csResult = dao.complaintSumit(sst,vo);
		if(csResult != 1) {
			throw new IllegalStateException();
		}
		//저장 경로 
		String path = "http://127.0.0.1:8888/app/resources/upload/complaint/img/";
		String rootDir = req.getServletContext().getRealPath("/");
		String commonRoot = rootDir.substring(0, rootDir.indexOf("backend") + "backend".length());
		String route = "\\src\\main\\webapp";
		String Spath = "\\resources\\upload\\complaint\\img\\";
		String savePath = commonRoot + route + Spath;
		
		if(fileArr != null && fileArr.length > 0 ) {
			List<String> fileList = saveFile(fileArr,savePath);

			if(fileList.size() <= 0) {
				throw new IllegalStateException();
			}
			//DB에 넣을 사진 정보 
			List<ComplaintImgVo> imgList = new ArrayList<ComplaintImgVo>();
			for (String filename : fileList) {
				int idx = 0;
				imgList
				.add(
				new ComplaintImgVo(filename, path,fileArr[idx++].getOriginalFilename())
				);
			}
			
			int imgResult = dao.imgInsertSumit(sst, imgList);
			if(imgResult <= 0) {
				throw new IllegalStateException();
			}
			
		}
		
		if(csResult == 1 ) {			
			result = true;
		}
		
		return result;
	}
	//파일저장
	private List<String> saveFile(MultipartFile[] fileArr, String savePath) throws IllegalStateException, IOException {
		
//		String savePath = "D:\\final\\finalPrj\\backend\\src\\main\\webapp\\resources\\upload\\complaint\\img\\";
		List<String> fileList = new ArrayList<String>();
		
		for (MultipartFile f : fileArr) {
			//랜덤 파일 네임
			String UUIDfileName = UUID.randomUUID().toString() + System.currentTimeMillis();
			String extendName = f.getOriginalFilename().substring(f.getOriginalFilename().lastIndexOf("."));
			File target = new File(savePath+UUIDfileName+extendName);
			f.transferTo(target);
			fileList.add(UUIDfileName+extendName);
		}
		return fileList;
	}


	public ComplaintVo mySumitDetail(ComplaintVo vo) {
		List<ComplaintVo> voList = dao.mySumitDetail(sst,vo);
		
		if(voList.get(0).getImgNo().length() > 0) {
			for (ComplaintVo complaintVo : voList) {
				voList.get(0).getImgVoList().add(
					new ComplaintImgVo(complaintVo.getImgNo() ,complaintVo.getImgName(), complaintVo.getPath(), complaintVo.getOriginName())
				);
			}
		}				
		return voList.get(0);
	}


	public List<ComplaintVo> list(PageVo pageVo) {
		return dao.list(sst,pageVo);
	}


	public ComplaintVo detail(ComplaintVo vo) {
		List<ComplaintVo> voList = dao.detail(sst,vo);
		
		if(voList.get(0).getImgNo().length() > 0) {
			for (ComplaintVo complaintVo : voList) {
				voList.get(0).getImgVoList().add(
					new ComplaintImgVo(complaintVo.getImgNo() ,complaintVo.getImgName(), complaintVo.getPath(), complaintVo.getOriginName())
				);
			}
		}

		return voList.get(0);
	}


	public int clear(ComplaintVo vo) {

		if(vo != null && vo.getContent() != null) {


			vo.setContent(vo.getContent().replace("\r\n", "<br/>"));
		}
		return dao.clear(sst,vo);
	}


	public List<ComplaintVo> select(ComplaintVo vo, PageVo pvo) {
		return dao.select(sst,vo, pvo);
	}

	// 페이징을 위한 페이지 총 갯수 구하기
	public int listCnt(ComplaintVo vo) {
		return dao.listCnt(sst,vo);
	}
	public int listSelectCnt(ComplaintVo vo) {
		return dao.listSelectCnt(sst,vo);
	}
}
