package com.team1.app.util.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;


@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class PageVo {

	private int currentPage =1;//현재 페이지 번호
	private int boardLimit =10; //한페이지에 보여줄 페이지수

		

	public void setCurrentPage(int currentPage) {
		if(currentPage <=0) {
			this.currentPage =1;
			
		}else {
			this.currentPage =currentPage;
		}
	
	}

	public void setBoardLimit(int boardLimit) {
		if(boardLimit<=0) {
			this.boardLimit =10;
		}else {
			this.boardLimit = boardLimit;
		}
	}
	
	
	
	
	
	
	
	
}
