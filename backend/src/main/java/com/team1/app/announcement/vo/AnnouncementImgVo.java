package com.team1.app.announcement.vo;

import lombok.Data;

@Data

public class AnnouncementImgVo {
	private String imgNo;		 //파일넘버    
	private String imgName;      //파일이름    
	private String path;         //경로      
	private String originName;   //원본이름    
	
	
	public AnnouncementImgVo(String imgName, String path, String originName) {
		super();
		this.imgNo = imgNo;
		this.imgName = imgName;
		this.path = path;
		this.originName = originName;
	}


	public AnnouncementImgVo(String imgNo, String imgName, String path, String originName) {
	}
	
	
	
	
}                                          
