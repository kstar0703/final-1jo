package com.team1.app.vote.service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
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

	public VoteVo detail(VoteVo vo) throws ParseException {
		
		//게시글 + 투표항목 같이 불러오기
		List<VoteVo> voList = dao.detailBoard(sst,vo);
		
		//투표항목이 있다면 voList 0번째 List 객체안에 투표 정보 넣기
		if(voList.get(0).getItemNo().length() > 0) {
			for (VoteVo vVo : voList) {
				voList.get(0).getVoList().add(
						new VoteVo(vVo.getVoteNo(),vVo.getVoteOrder(),vVo.getItemNo(),vVo.getItemName(),vVo.getVoteType()) 
				);
			}
		}
		
		//만약 종료된 투표이면 투표 결과 가져오기
		//현재 날짜와 마감일자 date형
		Date today = new Date();
		Date deadLineDate = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss").parse(voList.get(0).getDeadlineDate());
		//마감이 된 경우
		if(today.after(deadLineDate)) {
			voList.get(0).setVoHistory(dao.history(sst,vo));
		}
		
		//만약 이미 투표한 사람이라면 투표 했단 표시인 count 값
		String cnt = dao.votingYn(sst,vo).getCount();
		VoteVo resultVo = voList.get(0);
		resultVo.setCount(cnt);
		
		return resultVo;
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

	public boolean voteEnd(VoteVo vo) {
		
		boolean result = false;
		
		//마감 일자 삽입
		int endDayResult = dao.voteEndDayInsert(sst,vo);
		
		List<VoteVo> voEnd = new ArrayList<VoteVo>();
		
		if(endDayResult != 1) {
			throw new IllegalStateException();			
		}
		//투표 결과 조회
		voEnd = dao.voteEndCountSelect(sst,vo);
		
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
		int result = dao.voting(sst,vo);
		if(result != 1) {
			throw new IllegalStateException();
		}
		return result;
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

	public List<VoteVo> history(VoteVo vo) {
		return dao.history(sst,vo);
	}

	public List<VoteVo> adminHistory() {
		return dao.adminHistory(sst);
	}
	
}
