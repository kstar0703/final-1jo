package com.team1.app.vote.service;

import java.util.*;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Service;

import com.team1.app.vote.dao.VoteDao;
import com.team1.app.vote.vo.VoteVo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class VoteService {

	private final VoteDao dao;
	private final SqlSessionTemplate sst;
	
	public List<VoteVo> list(){
		return dao.list(sst);
	}

	public Map<String, Object> detail(String no) {
		VoteVo detailBoard = dao.detailBoard(sst,no);
		List<VoteVo> detailItem = dao.detailItem(sst,no);
		Map<String, Object> map = new HashMap<>();
		map.put("detailBoard", detailBoard);
		map.put("detailItem", detailItem);
		
		return map;
	}

	public int insert(VoteVo vo, List<VoteVo> voList) {
		
		int boardResult = dao.insertBoard(sst,vo);
		int itemResult = dao.insertItem(sst,voList);
		
		//리턴 값 생각 안 해봄
		return boardResult + itemResult;
	}

	public int edit(VoteVo vo) {
		return dao.edit(sst,vo);
	}

	public int delete(String no) {
		return dao.delete(sst,no);
	}

	public List<VoteVo> select(VoteVo vo) {
		return dao.select(sst,vo);
	}

	public int voteCount(String no) {
		return dao.voteCount(sst,no);
	}

	public VoteVo voteEnd(String no) {
		int result = dao.voteEndDayInsert(sst,no);
		
		List<VoteVo> voEnd = null;
		if(result == 1) {
			voEnd = dao.voteEndCountSelect(sst,no);
			
			if(voEnd != null) {
				int endResult = dao.voteEndFinishInsert(sst,voEnd);
				
				if(endResult != voEnd.size()) {
					// 예외처리 다시 하기
					throw new IllegalStateException();
				};
			}
		}
		return null;
	}

	public List<VoteVo> voteCheck(String no) {
		return dao.voteCheck(sst,no);
	}

	public int voting(VoteVo vo) {
		return dao.voting(sst,vo);
	}

	public List<VoteVo> adminList() {
		return dao.adminList(sst);
	}

	public Map<String, Object> adminDetail(String no) {
		
		VoteVo adminDetailBoard = dao.adminDetailBoard(sst,no);
		List<VoteVo> adminDetailItem = dao.adminDetailItem(sst,no);
		
		Map<String, Object> map = new HashMap<>();
		map.put("adminDetailBoard", adminDetailBoard);
		map.put("adminDetailItem", adminDetailItem);
		
		return map;
	}

	public List<VoteVo> adminSelect(VoteVo vo) {
		return dao.adminSelect(sst,vo);
	}

	public VoteVo history(String no) {
		return dao.history(sst,no);
	}

	public List<VoteVo> adminHistory() {
		return dao.adminHistory(sst);
	}
	
}
