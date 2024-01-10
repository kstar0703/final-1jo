package com.team1.app.complaint.service;

import java.io.File;
import java.io.IOException;
import java.util.*;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.team1.app.complaint.dao.ComplaintDao;
import com.team1.app.complaint.vo.ComplaintImgVo;
import com.team1.app.complaint.vo.ComplaintVo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ComplaintService {

	private final ComplaintDao dao;
	private final SqlSessionTemplate sst;
	
	
	public List<ComplaintVo> mySumitList(String no) {
		return dao.mySumitList(sst,no);
	}


	public boolean complaintSumit(ComplaintVo vo, MultipartFile[] fileArr) throws IllegalStateException, IOException {
		boolean result = false;
		
		//민원 글 접수
		int csResult = dao.complaintSumit(sst,vo);
		if(csResult != 1) {
			throw new IllegalStateException();
		}
		//저장 경로 
		String path = "http://127.0.0.1:8888/app/resources/upload/complaint/img/";
		
		if(fileArr != null && fileArr.length > 0 ) {
			List<String> fileList = saveFile(fileArr);
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
	private List<String> saveFile(MultipartFile[] fileArr) throws IllegalStateException, IOException {
		
		String savePath = "D:\\final\\finalPrj\\backend\\src\\main\\webapp\\resources\\upload\\complaint\\img\\";
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
		System.out.println("작동함");
		List<ComplaintVo> voList = dao.mySumitDetail(sst,vo);
		
		if(voList.get(0).getImgNo().length() > 0) {
			for (ComplaintVo complaintVo : voList) {
				voList.get(0).getImgVoList().add(
					new ComplaintImgVo(complaintVo.getImgNo() ,complaintVo.getImgName(), complaintVo.getPath(), complaintVo.getOriginName())
				);
				System.out.println(voList.get(0).getImgVoList());		
			}
		}				
		System.out.println(voList.get(0));
		return voList.get(0);
	}


	public List<ComplaintVo> list() {
		return dao.list(sst);
	}


	public Map<String, Object> detail(ComplaintVo vo) {
		List<ComplaintVo> voList = dao.detail(sst,vo);
		Map<String, Object> map = new HashMap<>();
		map.put("voList", voList);
		return map;
	}


	public int clear(ComplaintVo vo) {
		return dao.clear(sst,vo);
	}


	public List<ComplaintVo> select(ComplaintVo vo) {
		return dao.select(sst,vo);
	}
}
