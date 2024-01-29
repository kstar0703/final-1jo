package com.team1.app.vote.dao;

import java.util.List;

import org.apache.ibatis.session.RowBounds;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import com.team1.app.util.vo.PageVo;
import com.team1.app.vote.vo.VoteVo;

import lombok.extern.slf4j.Slf4j;

@Repository
@Slf4j
public class VoteDao {
	
	public List<VoteVo> list(SqlSessionTemplate sst,VoteVo vo, PageVo pageVo){
		int limit = pageVo.getBoardLimit();
		int offset = (pageVo.getCurrentPage()-1)* pageVo.getBoardLimit();
		RowBounds rowBounds = new RowBounds(offset, limit);
		return sst.selectList("VoteMapper.list",vo,rowBounds);
	}

	public List<VoteVo> detailBoard(SqlSessionTemplate sst, VoteVo vo) {
		return sst.selectList("VoteMapper.detailBoard",vo);
	}
	
	public VoteVo votingYn(SqlSessionTemplate sst, VoteVo vo) {
		return sst.selectOne("VoteMapper.votingYn",vo);
	}

//	public List<VoteVo> detailItem(SqlSessionTemplate sst, VoteVo vo) {
//		return sst.selectList("VoteMapper.detailItem",vo);
//	}

	public int insertBoard(SqlSessionTemplate sst, VoteVo vo) {
		return sst.insert("VoteMapper.insertBoard",vo);
	}

	public int insertItem(SqlSessionTemplate sst, List<VoteVo> voList) {
		return sst.insert("VoteMapper.insertItem",voList);
	}

	public int edit(SqlSessionTemplate sst, VoteVo vo) {
		return sst.update("VoteMapper.edit",vo);
	}

	public List<VoteVo> select(SqlSessionTemplate sst, VoteVo vo,PageVo pageVo) {
		int limit = pageVo.getBoardLimit();
		int offset = (pageVo.getCurrentPage()-1)* pageVo.getBoardLimit();
		RowBounds rowBounds = new RowBounds(offset, limit);
		return sst.selectList("VoteMapper.select",vo,rowBounds);
	}

	public int voteCount(SqlSessionTemplate sst, String no) {
		return sst.selectOne("VoteMapper.voteCount",no);
	}
	
	//voteEnd
	public int voteEndDayInsert(SqlSessionTemplate sst, VoteVo vo) {
		return sst.update("VoteMapper.voteEndDayInsert",vo);
	}

	public List<VoteVo> voteEndCountSelect(SqlSessionTemplate sst, VoteVo vo) {
		return sst.selectList("VoteMapper.voteEndCountSelect",vo);
	}

	public int voteEndFinishInsert(SqlSessionTemplate sst, List<VoteVo> voEnd) {
		return sst.insert("VoteMapper.voteEndFinishInsert",voEnd);
	}
	/*****************************************************************************/
	
//	public List<VoteVo> voteCheck(SqlSessionTemplate sst, String no) {
//		return sst.selectList("VoteMapper.voteCheck",no);
//	}

	public int voting(SqlSessionTemplate sst, VoteVo vo) {
		return sst.insert("VoteMapper.voting",vo);
	}

	public List<VoteVo> adminList(SqlSessionTemplate sst,PageVo pageVo) {
		int limit = pageVo.getBoardLimit();
		int offset = (pageVo.getCurrentPage()-1)*pageVo.getBoardLimit();
		RowBounds rowBounds = new RowBounds(offset,limit);
		return sst.selectList("VoteMapper.adminList"," ",rowBounds);
	}

	public List<VoteVo> adminDetailBoard(SqlSessionTemplate sst, VoteVo vo) {
		return sst.selectList("VoteMapper.adminDetail",vo);
	}

//	public List<VoteVo> adminDetailItem(SqlSessionTemplate sst, String no) {
//		return sst.selectList("VoteMapper.adminDetailItem",no);
//	}

	public List<VoteVo> adminSelect(SqlSessionTemplate sst, VoteVo vo,PageVo pageVo) {

		int limit = pageVo.getBoardLimit();
		int offset = (pageVo.getCurrentPage()-1)*pageVo.getBoardLimit();
		RowBounds rowBounds = new RowBounds(offset,limit);

		return sst.selectList("VoteMapper.adminSelect",vo,rowBounds);
	}

	public List<VoteVo> history(SqlSessionTemplate sst, VoteVo vo) {
		return sst.selectList("VoteMapper.history",vo);
	}

//	public List<VoteVo> adminHistory(SqlSessionTemplate sst) {
//		return sst.selectList("VoteMapper.adminHistory");
//	}

	public int increaseHit(SqlSessionTemplate sst, VoteVo vo) {
		return sst.update("VoteMapper.increaseHit",vo);
	}

	public int pageCnt(SqlSessionTemplate sst, VoteVo vo) {
		return sst.selectOne("VoteMapper.pageCnt",vo);
	}

	public int adminPageCnt(SqlSessionTemplate sst, VoteVo vo) {
		return sst.selectOne("VoteMapper.adminPageCnt",vo);
	}


}
