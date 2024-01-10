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

	public boolean insert(VoteVo vo, List<VoteVo> voList) {
		
		boolean result = false;
		int voListCnt = voList.size();
		
		int boardResult = dao.insertBoard(sst,vo);
		if(boardResult != 1) {
			throw new IllegalStateException();
		}
		int itemResult = dao.insertItem(sst,voList);
		if(voListCnt == itemResult) {
			result = true;
		}
		
		return result;
	}

	public int edit(VoteVo vo) {
		System.out.println(vo);
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

	public boolean voteEnd(String no) {
		
		boolean result = false;
		
		//마감 일자 삽입
		int endDayResult = dao.voteEndDayInsert(sst,no);
		
		List<VoteVo> voEnd = new ArrayList<VoteVo>();
		
		if(endDayResult != 1) {
			throw new IllegalStateException();			
		}
		//투표 결과 조회
		voEnd = dao.voteEndCountSelect(sst,no);
		
		if(voEnd == null) {
			throw new IllegalStateException();						
		}
		//투표 모든 결과 테이블 삽입
		int endResult = dao.voteEndFinishInsert(sst,voEnd);
		
		if(endResult != voEnd.size()) {
			throw new IllegalStateException();									
		};
		if(endDayResult+endResult > 0 && voEnd != null) {
			result = true;			
		}
		
		return result;
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

	public List<VoteVo> history(String no) {
		return dao.history(sst,no);
	}

	public List<VoteVo> adminHistory() {
		return dao.adminHistory(sst);
	}
	
}
