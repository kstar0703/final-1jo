package com.team1.app.vote.dao;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import com.team1.app.vote.vo.VoteVo;

@Repository
public class VoteDao {
	
	public List<VoteVo> list(SqlSessionTemplate sst){
		return sst.selectList("VoteMapper.list");
	}

	public VoteVo detailBoard(SqlSessionTemplate sst, String no) {
		return sst.selectOne("VoteMapper.detailBoard",no);
	}

	public List<VoteVo> detailItem(SqlSessionTemplate sst, String no) {
		return sst.selectList("VoteMapper.detailItem",no);
	}

	public int insertBoard(SqlSessionTemplate sst, VoteVo vo) {
		return sst.insert("VoteMapper.insertBoard",vo);
	}

	public int insertItem(SqlSessionTemplate sst, List<VoteVo> voList) {
		return sst.insert("VoteMapper.insertItem",voList);
	}

	public int edit(SqlSessionTemplate sst, VoteVo vo) {
		return sst.update("VoteMapper.edit",vo);
	}

	public int delete(SqlSessionTemplate sst, String no) {
		return sst.update("VoteMapper.delete",no);
	}

	public List<VoteVo> select(SqlSessionTemplate sst, VoteVo vo) {
		return sst.selectList("VoteMapper.select",vo);
	}

	public int voteCount(SqlSessionTemplate sst, String no) {
		return sst.selectOne("VoteMapper.voteCount",no);
	}

	public int voteEndDayInsert(SqlSessionTemplate sst, String no) {
		return sst.update("VoteMapper.voteEndDayInsert",no);
	}

	public List<VoteVo> voteEndCountSelect(SqlSessionTemplate sst, String no) {
		return sst.selectList("VoteMapper.voteEndCountSelect",no);
	}

	public int voteEndFinishInsert(SqlSessionTemplate sst, List<VoteVo> voEnd) {
		return sst.insert("VoteMapper.voteEndFinishInsert",voEnd);
	}

	public List<VoteVo> voteCheck(SqlSessionTemplate sst, String no) {
		return sst.selectList("VoteMapper.voteCheck",no);
	}

	public int voting(SqlSessionTemplate sst, VoteVo vo) {
		return sst.insert("VoteMapper.voting",vo);
	}

	public List<VoteVo> adminList(SqlSessionTemplate sst) {
		return sst.selectList("VoteMapper.adminList");
	}

	public VoteVo adminDetailBoard(SqlSessionTemplate sst, String no) {
		return sst.selectOne("VoteMapper.adminDetailBoard",no);
	}

	public List<VoteVo> adminDetailItem(SqlSessionTemplate sst, String no) {
		return sst.selectList("VoteMapper.adminDetailItem",no);
	}

	public List<VoteVo> adminSelect(SqlSessionTemplate sst, VoteVo vo) {
		return sst.selectList("VoteMapper.adminSelect",vo);
	}

	public VoteVo history(SqlSessionTemplate sst, String no) {
		return sst.selectOne("VoteMapper.history",no);
	}

	public List<VoteVo> adminHistory(SqlSessionTemplate sst) {
		return sst.selectList("VoteMapper.adminHistory");
	}

}
