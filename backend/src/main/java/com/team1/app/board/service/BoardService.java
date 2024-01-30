package com.team1.app.board.service;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.team1.app.board.dao.BoardDao;
import com.team1.app.board.vo.BoardImgVo;
import com.team1.app.board.vo.BoardLikeVo;
import com.team1.app.board.vo.BoardReplyVo;
import com.team1.app.board.vo.BoardVo;
import com.team1.app.board.vo.CategoryVo;
import com.team1.app.util.vo.PageVo;
import com.team1.app.util.vo.SearchVo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BoardService {
	private final BoardDao dao;
	private final SqlSessionTemplate sst;

	// 전체 게시글 조회 (+댓글수 + 좋아요수 추가)
	public List<BoardVo> list(BoardVo bvo, PageVo pvo) {
		List<BoardVo> boardVoList = dao.list(sst, bvo, pvo);
		for (BoardVo boardVo : boardVoList) {
			String boardNo = boardVo.getBoardNo();
			int replyCount = dao.replyCount(sst, boardNo);
			int likeCount = dao.listLikeCount(sst, boardNo);
			boardVo.setReplyCount(replyCount);
			boardVo.setLikeCount(likeCount);
		}
		return boardVoList;
	}
	
	//글 수 조회
	public int count(BoardVo vo) {
		return dao.count(sst, vo);
	}

	//게시글 상세 조회 
	public BoardVo detail(String boardNo) {
		int result = dao.increaseHit(sst, boardNo);
		if(result != 1) {
			throw new IllegalStateException();
		}
		BoardVo boardVo = dao.detail(sst, boardNo);
		List<BoardImgVo> imgs = dao.selectImg(sst, boardNo);
		boardVo.setImgs(imgs);
		return boardVo;
	}

	//게시글 작성
	public int insert(BoardVo vo, List<MultipartFile> files, HttpServletRequest req) throws Exception {
		int overallResult = 0;
		int boardResult = dao.insert(sst, vo);		
		
		String rootDir = req.getServletContext().getRealPath("/");
		String commonRoot = rootDir.substring(0, rootDir.indexOf("backend") + "backend".length());
		String route = "\\src\\main\\webapp";
		String path = "\\resources\\upload\\board\\img\\";
		String savePath = commonRoot + route + path;


		System.out.println(savePath);
				
		int fileResult = 1;
		BoardImgVo imgVo = new BoardImgVo();
		if(files != null) {
			imgVo.setBoardNo(vo.getBoardNo());
			
			for (MultipartFile file : files) {
				imgVo.setOriginName(file.getOriginalFilename());
				String imgName = saveFile(file, savePath);
				String fullPath = "http://127.0.0.1:8888/app" + path + imgName;
				imgVo.setPath(fullPath);
				imgVo.setImgName(imgName);
				
				System.out.println(imgVo);			
				

				int result = dao.insertImg(sst, imgVo);
				if(result != 1) {
					fileResult = 0;
					break;
				}
			}
			
		}
		if(boardResult == 1 && fileResult == 1) {
			overallResult = 1;
		}		
		return overallResult;
	}

	
	//게시글 수정
	public int edit(BoardVo vo, List<MultipartFile> files, HttpServletRequest req) throws Exception {
		int overallResult = 0;
		int boardResult = dao.edit(sst, vo);		
		
		String root = req.getServletContext().getRealPath("/");

		
		BoardImgVo imgVo = new BoardImgVo();
		imgVo.setBoardNo(vo.getBoardNo());
		imgVo.setImgName(vo.getImgName());
		imgVo.setOriginName(vo.getOriginName());
				
		int fileResult = 1;
		for (MultipartFile file : files) {
			String path = saveFile(file, root);
			imgVo.setPath(path);
			int result = dao.editImg(sst, imgVo);
			if(result != 1) {
				fileResult = 0;
				break;
			}
		}
		if(boardResult == 1 && fileResult == 1) {
			overallResult = 1;
		}		
		return overallResult;
	}
	
	//서버에 파일저장
	private String saveFile(MultipartFile file, String savePath) throws IllegalStateException, Exception {
		
		System.out.println(savePath);

		String originName = file.getOriginalFilename();
		String extension = originName.substring(originName.lastIndexOf("."));
		String imgName = UUID.randomUUID() + extension;
		File target = new File(savePath + imgName);
		file.transferTo(target);
		return imgName;
	}

	// 게시글 삭제
	public int delete(BoardVo vo) {
		return dao.delete(sst, vo);
	}

	//게시글 검색
	public List<BoardVo> search(SearchVo vo) {
		return dao.search(sst, vo);
	}

	// 댓글 조회
	public List<BoardReplyVo> replyList(BoardReplyVo vo) {
		return dao.replyList(sst, vo);
	}

	//댓글수 조회
	public int replyCount(String boardNo) {
		return dao.replyCount(sst, boardNo);
	}	

	// 댓글 작성
	public int replyWrite(BoardReplyVo vo) {
		return dao.replyWrite(sst, vo);
	}

	//댓글 수정
	public int replyEdit(BoardReplyVo vo) {
		return dao.replyEdit(sst, vo);
	}

	//댓글 삭제
	public int replyDelete(BoardReplyVo vo) {
		return dao.replyDelete(sst, vo);
	}

	// 댓글 검색
	public List<BoardReplyVo> replySearch(SearchVo vo) {
		return dao.replySearch(sst, vo);
	}

	//좋아요수 조회
	public int listLikeCount(String boardNo) {
		return dao.listLikeCount(sst, boardNo);
	}

	//좋아요 클릭처리 
	public int clickLike(BoardLikeVo vo) {
		int result = dao.selectLike(sst, vo);
		
		if(result == 1) {
			return dao.deleteLike(sst, vo);
		}else {
			return dao.insertLike(sst, vo);
		}
	}

	// 전체 게시글 조회 (관리자)
	public List<BoardVo> listByAdmin() {
		return dao.listByAdmin(sst);
	}

	// 게시글 상세 조회 (관리자)
	public BoardVo detailByAdmin(BoardVo vo) {
		return dao.detailByAdmin(sst, vo);
	}

	//카테고리 조회
	public List<CategoryVo> listCategory() {
		return dao.listCategory(sst);
	}
	
	//작성자 번호로 최근 게시물 번호 1개 조회
	public BoardVo findLatestPost(String writerNo) {
		return dao.findLatestPost(sst, writerNo);
	}

	//관리자 규제
	public int banByAdmin(String boardNo) {
		return dao.banByAdmin(sst, boardNo);
	}




}
