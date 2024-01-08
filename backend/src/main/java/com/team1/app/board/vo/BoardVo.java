package com.team1.app.board.vo;

import java.util.List;

import lombok.Data;

@Data
public class BoardVo {
	private String boardNo;
	private String writerNo;
	private String categoryNo;
	private String title;
	private String content;
	private String enrollDate;
	private String modifyDate;
	private String delYn;
	private String hit;
	
	private String categoryName;
	
	private String unitNo;
	private String name;
	private String gender;
		
	private String dong;
	private String ho;
	
	private int replyCount;
	private int likeCount;

	private List<BoardImgVo> imgs;
	
	private String imgNo;
	private String imgName;
	private String path;
	private String originName;
	
	private List<String> paths;
	
}
