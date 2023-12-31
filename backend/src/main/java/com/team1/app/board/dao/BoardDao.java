package com.team1.app.board.dao;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import com.team1.app.board.vo.BoardImgVo;
import com.team1.app.board.vo.BoardLikeVo;
import com.team1.app.board.vo.BoardReplyVo;
import com.team1.app.board.vo.BoardVo;

@Repository
public class BoardDao {

	// 전체 게시글 조회
	public List<BoardVo> list(SqlSessionTemplate sst) {
		return sst.selectList("BoardMapper.list");
	}

	//게시글 상세 조회 )
	public BoardVo detail(SqlSessionTemplate sst, String boardNo) {
		System.out.println(boardNo);
		return sst.selectOne("BoardMapper.detail", boardNo);
	}
	
	//게시글 상세 조회 - 첨부 이미지 조회 
	public List<BoardImgVo> selectImg(SqlSessionTemplate sst, String boardNo) {
		return sst.selectList("BoardMapper.selectImg", boardNo);
	}
	
	//조회수 증가
	public int increaseHit(SqlSessionTemplate sst, String boardNo) {
		return sst.update("BoardMapper.increaseHit", boardNo);
	}

	//게시글 작성
	public int insert(SqlSessionTemplate sst, BoardVo vo) {
		return sst.insert("BoardMapper.insert", vo);
	}
	
	//게시글 수정
	public int edit(SqlSessionTemplate sst, BoardVo vo) {
		return sst.update("BoardMapper.edit", vo);
	}

	//이미지 저장 
	public int insertImg(SqlSessionTemplate sst, BoardImgVo vo) {
		return sst.insert("BoardMapper.insertImg", vo);
	}

	// 게시글 삭제
	public int delete(SqlSessionTemplate sst, BoardVo vo) {
		 int result = sst.update("BoardMapper.delete", vo);
		 return result;
	}

	//게시글 검색
	public List<BoardVo> search(SqlSessionTemplate sst, Map<String, Object> searchMap) {
		return sst.selectList("BoardMapper.search", searchMap);
	}
	
	//댓글수 조회
	public int replyCount(SqlSessionTemplate sst, String boardNo) {
		return sst.selectOne("BoardMapper.listReplyCount", boardNo);
	}
	
	// 댓글 조회
	public List<BoardReplyVo> replyList(SqlSessionTemplate sst, BoardReplyVo vo) {
		return sst.selectList("BoardMapper.listReply", vo);
	}

	// 댓글 작성
	public int replyWrite(SqlSessionTemplate sst, BoardReplyVo vo) {
		return sst.insert("BoardMapper.insertReply", vo);
	}
	
	//댓글 수정
	public int replyEdit(SqlSessionTemplate sst, BoardReplyVo vo) {
		return sst.update("BoardMapper.editReply", vo);
	}

	//댓글 삭제
	public int replyDelete(SqlSessionTemplate sst, BoardReplyVo vo) {
		return sst.update("BoardMapper.deleteReply", vo);
	}

	// 댓글 검색
	public List<BoardReplyVo> replySearch(SqlSessionTemplate sst, Map<String, Object> searchMap) {
		return sst.selectList("BoardMapper.searchReply", searchMap);
	}

	//좋아요수 조회
	public int listLikeCount(SqlSessionTemplate sst, String boardNo) {
		return sst.selectOne("BoardMapper.listLikeCount", boardNo);
	}
	
	//좋아요 클릭여부 조회 (글번호 +회원번호)
	public int selectLike(SqlSessionTemplate sst, BoardLikeVo vo) {
		return sst.selectOne("BoardMapper.selectLikeByMemeberNo", vo);
	}
	
	//좋아요 추가
	public int insertLike(SqlSessionTemplate sst, BoardLikeVo vo) {
		return sst.insert("BoardMapper.insertLike", vo);
	}
	
	//좋아요 삭제 
	public int deleteLike(SqlSessionTemplate sst, BoardLikeVo vo) {
		return sst.update("BoardMapper.deleteLike", vo);
	}
	
	// 전체 게시글 조회 (관리자)
	public List<BoardVo> listByAdmin(SqlSessionTemplate sst) {
		return sst.selectList("BoardMapper.listByAdmin");
	}

	// 게시글 상세 조회 (관리자)
	public BoardVo detailByAdmin(SqlSessionTemplate sst, BoardVo vo) {
		return sst.selectOne("BoardMapper.detailByAdmin", vo);
	}





}
