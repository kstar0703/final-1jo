package com.team1.app.vote.vo;

import lombok.Data;

@Data
public class VoteVo {
	                                                
	private String voteNo;			//투표글 번호       
	private String managerNo;		//작성자 번호       
	private String managerId;		//작성자 아이디      
	private String title;			//글 제목         
	private String content;			//글 설명         
	private String enrollDate;		//등록 일자        
	private String modifyDate;		//수정 일자        
	private String deadlineDate;	//마감 일자        
	private String delYn;			//삭제 여부        
	private String acceptYn;		//허가 여부        
	                                                
	private String voteHistoryNo;	//결과 이력 번호     
	private String voteName;		//투표 결과 항목 명   
	private String voteCount;		//투표 수         
	private String voteOrder;		//표기 순서        
	                                                
	private String itemNo;			//투표 항목 번호     
	private String itemName;		//투표 항목 명      
	private String voteType;		//항목 유형        
	                                                
	private String replyNo;			//응답 번호        
	private String prtcNo;			//응답자 번호       
	private String retcDate;		//응답 일자        
	                                                
}                                                   
