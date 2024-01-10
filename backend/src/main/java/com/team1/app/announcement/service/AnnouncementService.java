package com.team1.app.announcement.service;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.apache.ibatis.session.RowBounds;
import org.mybatis.spring.SqlSessionTemplate;import org.springframework.core.type.filter.AbstractClassTestingTypeFilter;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.team1.app.announcement.dao.AnnouncementDao;
import com.team1.app.announcement.vo.AnnouncementImgVo;
import com.team1.app.announcement.vo.AnnouncementVo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AnnouncementService {
	
	private final AnnouncementDao dao;
	private final SqlSessionTemplate sst;
	
	//공지사항 작성(admin)이미지 첨부
	public boolean write(AnnouncementVo vo, MultipartFile[] fileArr) throws Exception {
		
		//result 확인용
		int resultCheck = 1;
		
		//결과 반환용
		boolean retunrResult= false;
		
		
		//디비 저장 경로
		String path="http://127.0.0.1:8888/app/resources\\upload\\gallery\\img";
		
		//파일 저장입니다
		if(fileArr !=null && fileArr.length>0) {
			List<String> fileList = saveFile(fileArr);
			resultCheck += fileList.size(); 
			//MultipartFile[]용 인덱스
			int idx =0;
			int idx2 = 0;
			for (String filename : fileList) {
			    vo.getFileList()
			    .add( 
			    new AnnouncementImgVo(filename,path,fileArr[idx++].getOriginalFilename()) );
			    
			System.out.println(vo.getFileList().get(idx2++));    
			}
			
		}
		
		
		
		int result = dao.write(sst,vo);
		
		if(resultCheck == result) {
			retunrResult = true;
		}else if(resultCheck == result ) {
			
		}else {
			throw new Exception("파일업로드실패");
		}
		
	
		return retunrResult;
	}
	
	//파일저장
	private List<String> saveFile(MultipartFile[] fileArr) throws IllegalStateException, IOException {
		//저장 파일 경로
		String path ="E:\\dev\\FINAL_1JO\\backend\\src\\main\\webapp\\resources\\upload\\announcement\\img";
		List<String> fileList = new ArrayList();
		for (MultipartFile f : fileArr) {
		
		//랜덤 파일네임
		String UUIDfileName = UUID.randomUUID().toString() +  System.currentTimeMillis();
		String extendName = f.getOriginalFilename().substring(f.getOriginalFilename().lastIndexOf("."));
			File target = new File(path + UUIDfileName + extendName);
			f.transferTo(target);
			fileList.add(UUIDfileName+extendName);
		}
		
		return fileList;
	}
	//공지사항 게시판 글개수 (페이징용)
	public int count(AnnouncementVo vo) {
		return dao.count(sst,vo);
	}

	//공지사항 게시판 리스트 (리스트)
	public List<AnnouncementVo> list(AnnouncementVo vo) {
		int page =0;
		
		int limit = 10;
		int offset = 0;
		
		
		
		RowBounds rb = new RowBounds(offset,limit);
		
		return dao.list(sst,vo);
	}

	
	//공지사항 상세조회
	public AnnouncementVo detail(AnnouncementVo vo) {
		
		List<AnnouncementVo> list = dao.detail(sst, vo);
		
		
		Map<String,AnnouncementVo> fileNameMap = new LinkedHashMap();
		
		for (AnnouncementVo announcementVo : list) {
			
		}
		
		
		AnnouncementVo resultVo;
		
		
		return null;
	}
	

	//공지사항 수정(관리자)
	
	//공지사항 삭제
	
	
	
	
	
	
		
	//게시글삭제 (관리자)
	
	//게시글 검색(제목,내용)
		

}
