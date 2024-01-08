package com.team1.app.announcement.vo;

import java.util.ArrayList;
import java.util.List;

import lombok.Data;

@Data
public class AnnouncementVo {
	                             
	private String announcementNo;        // 공지사항번호
	private String managerNo;             // 관리자 번호
	private String title;                  // 제목
	private String content;                // 내용
	private String enrollDate;            // 등록일
	private String modifyDate;            // 수정일
	private String delYn;                 // 삭제 여부
	private String id; 					   // 작성자
	
	private String imgNo;				//파일넘버
	private String imgName;				//파일이름
	private String path;				//경로
	private String originName;			//원본이름
	
	private List<AnnouncementImgVo> list = new ArrayList();  //파일 리스트
	                                            
}                  
