package com.team1.app.util.vo;

import lombok.Getter;
import lombok.Setter;

@Getter
public class PageVo {
	
	private int listCount; 		// 총 게시글 갯수
	private int currentPage;	// 현재페이지  
	private int pageLimit;		// 페이징 영역 페이지갯수 
	private int boardLimit;		// 한 페이지에 보여줄 게시글 갯수 
	
	private int maxPage;		// 가장 마지막 페이지 
	private int startPage;		// 페이징 영역 시작값 
	private int endPage; 		// 페이징 영역 마지막값
	
/*	private int startRow; 		// 조회할 첫번재 행 번호 (ROWNUM)
	private int lastRow; 		// 조회할 마지막 행 번호 (ROWNUM)
*/	
	public PageVo(int listCount , int currentPage, int pageLimit, int boardLimit) {
		this.listCount = listCount;
		
		if(currentPage<=0) {
			this.currentPage = 1;
		}else {
			this.currentPage = currentPage;
		}
		
		this.pageLimit = pageLimit;
		
		if(boardLimit<=0) {
			this.boardLimit =10;
		}else {
			this.boardLimit = boardLimit;
		}
		
		this.maxPage = (int) Math.ceil((double)listCount/boardLimit);
		this.startPage = (currentPage - 1) / pageLimit * pageLimit + 1;
		this.endPage = startPage + pageLimit - 1;
		
		if(endPage > maxPage) {
			endPage = maxPage;
		}
		
		/*
		 * this.startRow = (currentPage - 1) * boardLimit + 1; this.lastRow = startRow +
		 * boardLimit - 1;
		 */
	}

	public void setCurrentPage(int currentPage) {
		this.currentPage = currentPage;
	}
	public void setBoardLimit(int boardLimit) {
		this.boardLimit = boardLimit;
	}
	
	

	
	
	
	
}

	
	
	
	
	
	
	
	

