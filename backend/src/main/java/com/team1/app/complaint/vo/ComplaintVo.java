package com.team1.app.complaint.vo;

import lombok.Data;

@Data
public class ComplaintVo {
                                                            
	private String complaintNo;		//민원 번호                 
	private String managerNo;		//민원 처리 담당자 관리자 번호
	private String memberNo;		//작성자 번호                
	private String memberName;		//작성자 이름                
	private String title;			//민원 제목                 
	private String content;			//민원 내용                 
	private String enrollDate;		//작성 일자
	private String enrollDateStart;	//작성 일자 검색 시작 일자 
	private String enrollDateEnd;	//작성 일자 검색 종료 일자
	private String delYn;			//삭제 여부                 
	private String status;			//민원 처리 상태              
	private String reply;			//민원 처리 답변              
	private String replyDate;		//민원 처리 일자
	private String replyDateStart;	//민원 처리 일자 검색 시작 일자 
	private String replyDateEnd;	//민원 처리 일자 검색 종료 일자
	                                                        
	private String imgNo;			//이미지 번호                
	private String imgName;			//이미지 이름                
	private String path;			//이미지 경로
	private String originName;		//이미지 원래 이름             
}                                                           
