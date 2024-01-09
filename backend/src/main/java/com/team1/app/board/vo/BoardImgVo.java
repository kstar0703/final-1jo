package com.team1.app.board.vo;

import java.util.List;

import lombok.Data;

@Data
public class BoardImgVo {
	private String imgNo;
	private String boardNo;
	private String imgName;
	private String path;
	private String originName;
	
	private List<String> paths;
}
