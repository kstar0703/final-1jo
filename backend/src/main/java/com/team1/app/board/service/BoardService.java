package com.team1.app.board.service;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Service;

import com.team1.app.board.dao.BoardDao;
import com.team1.app.board.vo.BoardImgVo;
import com.team1.app.board.vo.BoardLikeVo;
import com.team1.app.board.vo.BoardReplyVo;
import com.team1.app.board.vo.BoardVo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BoardService {
	private final BoardDao dao;
	private final SqlSessionTemplate sst;

	// 전체 게시글 조회 (+댓글수 + 좋아요수 추가)
	public List<BoardVo> list() {
		List<BoardVo> boardVoList = dao.list(sst);
		for (BoardVo boardVo : boardVoList) {
			String boardNo = boardVo.getBoardNo();
			int replyCount = dao.replyCount(sst, boardNo);
			int likeCount = dao.listLikeCount(sst, boardNo);
			boardVo.setReplyCount(replyCount);
			boardVo.setLikeCount(likeCount);
		}
		return boardVoList;
	}

	//게시글 상세 조회 
	public BoardVo detail(BoardVo vo) {
		return dao.detail(sst, vo);
	}

	//게시글 작성
	public int insert(BoardVo vo) {
		return dao.insert(sst, vo);
	}

	//이미지 저장
	public int insertImg(List<BoardImgVo> imgs) {
		return dao.insertImg(sst, imgs);
	}

	//게시글 수정
	public int edit(BoardVo vo) {
		return dao.edit(sst, vo);
	}

	// 게시글 삭제
	public int delete(BoardVo vo) {
		return dao.delete(sst, vo);
	}

	//게시글 검색
	public List<BoardVo> search(Map<String, Object> searchMap) {
		return dao.search(sst, searchMap);
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
	public List<BoardReplyVo> replySearch(Map<String, Object> searchMap) {
		return dao.replySearch(sst, searchMap);
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




}
