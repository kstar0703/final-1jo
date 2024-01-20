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

import javax.swing.DefaultRowSorter;

import org.apache.ibatis.session.RowBounds;
import org.mybatis.spring.SqlSessionTemplate;import org.springframework.core.type.filter.AbstractClassTestingTypeFilter;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.team1.app.announcement.controller.AnnouncementController;
import com.team1.app.announcement.dao.AnnouncementDao;
import com.team1.app.announcement.vo.AnnouncementImgVo;
import com.team1.app.announcement.vo.AnnouncementVo;
import com.team1.app.util.vo.PageVo;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j;
import lombok.extern.slf4j.Slf4j;
import oracle.net.aso.f;

@Service
@RequiredArgsConstructor
@Slf4j
public class AnnouncementService {
	
	private final AnnouncementDao dao;
	private final SqlSessionTemplate sst;
	
	//공지사항 작성(admin)이미지 첨부
	public Map<String, String> write(AnnouncementVo vo, MultipartFile[] fileArr) throws Exception {
	
		//result 확인용
		int resultCheck = 1;
		
		//결과 반환용
		boolean retunrResult= false;
		
		//디비 저장 경로
		String path="http://127.0.0.1:8888/app/resources\\upload\\announcement\\img\\";
		
		//
		Map<String,String> resultMap = new HashMap();
		
		//파일 이름 저장
		if(fileArr !=null && fileArr.length>0) {
			List<String> fileList = saveFile(fileArr);
			
			resultCheck += fileList.size(); 
			//MultipartFile[]용 인덱스
			int idx =0;
			for (String filename : fileList) {
			    vo.getFileList()
			    .add( 
			    new AnnouncementImgVo(filename,path,fileArr[idx++].getOriginalFilename()) );
			}
		}
		
		
		int result = dao.write(sst,vo);
		
		log.info("업로드 개수 : {}" , result );
		log.info("업로드 resultCheck 개수 : {}" , resultCheck );
		
		if(resultCheck == result) {
				
			//현재 번호 가져오기 
			  String announcementNo = dao.getCurrentAnnouncementNo(sst);
			  	
				resultMap.put("announcementNo",announcementNo);
				resultMap.put("status", "good");
				resultMap.put("msg", "게시글 작성 성공");
				
			
		}else if(resultCheck == result ) {
//			TODO 시간 남으면 파일 삭제 내용 추가
		}else {
			throw new Exception("파일업로드실패");
		}
		
		return resultMap;
	}
	
		//공지사항 수정(관리자)
		public Boolean change(AnnouncementVo vo, MultipartFile[] fileArr) throws IllegalStateException, IOException {
			
			//파일 삭제
			int deleteCnt = dao.deleteFile(sst, vo);
			int imgUpdateresult=0;
			System.out.println(deleteCnt);
			System.out.println("파일삭제 성공");
			
			//게시글 수정(수정내용이 없을 수도 있다)
			
			
			//TODO 기존 게시글하고 같으면 실행안하는 로직 처리
			
			int result = dao.change(vo,sst);
			System.out.println("게시글 내용 수정 완료");
			System.out.println(result);
			
			//디비 저장 경로
			String path="http://127.0.0.1:8888/app/resources\\upload\\announcement\\img\\";
			
			//파일 이름 저장
			if(fileArr !=null && fileArr.length>0) {
				List<String> fileList = saveFile(fileArr);
				
				
				for(int i=0; i<fileList.size(); i++) {
					 vo
					 .getFileList()
					  .add( 
					   new AnnouncementImgVo(fileList.get(i),path,fileArr[i].getOriginalFilename()) );
				}
				
				imgUpdateresult = dao.changeImg(vo,sst); 
			}
			
			
	
			if(result ==0 && imgUpdateresult ==0) {
				throw new IllegalStateException("수정 내용이 없습니다");
			}
			
			
			return true;
		}
	
	
	//파일저장
	private List<String> saveFile(MultipartFile[] fileArr) throws IllegalStateException, IOException {
		//저장 파일 경로
		String path ="E:\\dev\\FINAL_1JO\\backend\\src\\main\\webapp\\resources\\upload\\announcement\\img\\";
		List<String> fileList = new ArrayList();
		for (MultipartFile f : fileArr) {
		
		//랜덤 파일네임
		String UUIDfileName = UUID.randomUUID().toString() +  System.currentTimeMillis();
		//파일확장잔
		String extendName = f.getOriginalFilename().substring(f.getOriginalFilename().lastIndexOf("."));
			File target = new File(path + UUIDfileName + extendName);
			f.transferTo(target);
			fileList.add(UUIDfileName+extendName);
			
			
		}
		log.info("fileArr에 전달받은값 : {} ", fileArr.length  );
		
		return fileList;
	}
	

	//공지사항 게시판 리스트 (리스트)
	public List<AnnouncementVo> list(AnnouncementVo vo,PageVo pageVo) {
		
		return dao.list(sst, vo, pageVo);
		
		
	}

	
	//공지사항 상세조회
	public AnnouncementVo detail(AnnouncementVo vo) {
		
		List<AnnouncementVo> list = dao.detail(sst, vo);
		
		if(list !=null &&  list.size()>0) {
			for (AnnouncementVo announcementVo : list) {
				list.get(0).getFileList().
				add(
				new AnnouncementImgVo(
									announcementVo.getImgNo()
									,announcementVo.getImgName()
									,announcementVo.getPath() 
									,announcementVo.getOriginName()
									)		
						);			
			}
			return list.get(0);	
		}
		
		return null;
	}
	//공지사항 삭제 (관리자)
	public boolean delete(AnnouncementVo vo) {
		
		int result = dao.delete(sst,vo);
		
		if(result !=1) {
			throw new IllegalStateException();
		}
		/*지금이러면 공개 처리 삭제 처리 의미가 없어서 일단 보류 ;
		 * else { dao.deleteFile(sst,vo); }
		 */
		
	
		return true;
	}

	//개수
	public int count(AnnouncementVo vo) {	
		return dao.count(sst,vo);
	}

	

	public boolean cancelDelete(AnnouncementVo vo) {
		int result = dao.cancelDelete(sst,vo);
		
		if(result !=1) {
			throw new IllegalStateException();
		}else {
			dao.deleteFile(sst,vo);			
		}
		return true;
	}
	
	

	

	
	
	
	
	
	
		
	
		

}
