package com.team1.app.util.vo;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@NoArgsConstructor
@ToString
@Getter
public class PageVo {
	
	private int listCount; 		// 총 게시글 갯수
	private int currentPage;	// 현재페이지  
	private int pageLimit;		// 페이징 영역 페이지갯수 
	private int boardLimit;		// 한 페이지에 보여줄 게시글 갯수 
	
	private int maxPage;		// 가장 마지막 페이지 
	private int startPage;		// 페이징 영역 시작값 
	private int endPage; 		// 페이징 영역 마지막값
	public int getCurrentPage() {
		return currentPage;
	}
	
	public void setCurrentPage(int currentPage) {
		this.currentPage = currentPage;
	}
	
	public void setBoardLimit(int boardLimit) {
		this.boardLimit = boardLimit;
	}
	
	
	
	

	//private int startRow; 		// 조회할 첫번재 행 번호 (ROWNUM)
	//private int lastRow; 		// 조회할 마지막 행 번호 (ROWNUM)
	
	public PageVo(int listCount , int currentPage, int pageLimit, int boardLimit) {
		this.listCount = listCount;
		
		System.out.println("들어온 현재 페이지" +currentPage);
		
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
		
		System.out.println("");
		
		System.out.println(boardLimit);
		System.out.println((double)listCount/boardLimit ) ;
		
		this.maxPage = (int) Math.ceil((double)this.listCount/this.boardLimit);
		this.startPage = (this.currentPage - 1) / this.pageLimit * this.pageLimit + 1;
		this.endPage = this.startPage + this.pageLimit - 1;
		
		if(endPage > maxPage) {
			endPage = maxPage;
		}
		
	}
}
		
		
		

	
	
	
	
	
	

	
	
	
	

	
	
	
	
	
	
	
	

