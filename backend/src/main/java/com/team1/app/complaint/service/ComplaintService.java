package com.team1.app.complaint.service;

import java.io.File;
import java.io.IOException;
import java.util.*;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.team1.app.complaint.dao.ComplaintDao;
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


	public boolean complaintSumit(ComplaintVo vo, MultipartFile[] file) throws IllegalStateException, IOException {
		boolean result = false;
		int iisResult = 0;
		//민원 글 접수
		int csResult = dao.complaintSumit(sst,vo);
		if(csResult != 1) {
			throw new IllegalStateException();
		}
		//민원에 첨부된 사진 여러개 접수 
		String path = "";
		if(file != null && file.length > 0 ) {
			for (MultipartFile multipartFile : file) {
				multipartFile.transferTo(new File(path));
			}
			iisResult =dao.imgInsertSumit(sst,file);			
			
		}
		
		
		return result;
	}

	public Map<String, Object> mySumitDetail(ComplaintVo vo) {
		
		List<ComplaintVo> voList = dao.mySumitDetail(sst,vo);
		Map<String, Object> map = new HashMap<>();
		map.put("voList", voList);
		return map;
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
