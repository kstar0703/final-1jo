package com.team1.app.complaint.vo;

import lombok.Data;

@Data
public class ComplaintImgVo {
	private String imgNo;			//이미지 번호                
	private String imgName;			//이미지 이름                
	private String path;			//이미지 경로
	private String originName;		//이미지 원래 이름 
	
	public ComplaintImgVo() {

	};
	
	public ComplaintImgVo(String imgNo, String imgName, String path, String originName) {
	};	
	
	public ComplaintImgVo(String imgName, String path,String originName) {
		this.imgName= imgName;	            
		this.path =path;               
		this.originName =originName;
	}

}
