package com.team1.app.announcement.service;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

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
		
		// 가공 데이터 넘기기
		Map<String, Object> dataMap = new HashMap(); 
		//디비 저장 경로
		String path="http://127.0.0.1:8888/app/resources\\upload\\gallery\\img";
		
		//파일 저장입니다
		if(fileArr !=null && fileArr.length>0) {
			List<String> fileList = saveFile(fileArr);
			resultCheck += fileList.size(); 
			//MultipartFile[]용 인덱스
			int idx =0;
			
			for (String filename : fileList) {
				System.out.println("반복문 호출?");
			    vo.getFileList().add( new AnnouncementImgVo("filename","http://127.0.0.1:8888/app/resources/upload/gallery/img/",fileArr[idx++].getOriginalFilename()) ); 
			}
			
		}
		
		dataMap.put("vo",vo);
		
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
			File target = new File(path + UUIDfileName);
			f.transferTo(target);
			fileList.add(UUIDfileName);
		}
		
		return fileList;
	}
	
	//파일삭제
	
	
	
	
	
	//공지사항 목록 조회
	
	//공지사항 상세조회
	
	//공지사항 수정(관리자)
		
	//게시글삭제 (관리자)
	
	//게시글 검색(제목,내용)
		

}
