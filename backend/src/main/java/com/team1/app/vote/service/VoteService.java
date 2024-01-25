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
	
	public List<VoteVo> list(VoteVo vo){
		return dao.list(sst,vo);
	}

	public VoteVo detail(VoteVo vo) throws ParseException {
		
		//게시글 + 투표항목 같이 불러오기
		List<VoteVo> voList = dao.detailBoard(sst,vo);
		
		//투표항목이 있다면 voList 0번째 List 객체안에 투표 정보 넣기
		if(voList.get(0).getItemNo().length() > 0) {
			for (VoteVo vVo : voList) {
				voList.get(0).getVoList().add(
						new VoteVo(vVo.getVoteNo(),vVo.getVoteOrder(),vVo.getItemNo(),vVo.getItemName()) 
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
		
		//로그인한 회원이 투표 했는지 구분		
		String status = voList.get(0).getReplyStatus();
		
		//마감 안 되고 이미 투표 안 했으면 조회수 올리기
		if(voList.get(0).getVoHistory().size() == 0 && Integer.parseInt(status) == 0) {
			int hitResunt = dao.increaseHit(sst,vo);
			if(hitResunt != 1) {
				throw new IllegalStateException();
			}
		}

		return voList.get(0);
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
		
		if(boardResult == 1) {
			result = true;
		}
		return result;
	}

	public int edit(VoteVo vo) {
		int result = dao.edit(sst,vo);
		if(result != 1) {
			throw new IllegalStateException();
		}
		return result;
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

//	public List<VoteVo> voteCheck(String no) {
//		return dao.voteCheck(sst,no);
//	}

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

	public VoteVo adminDetail(VoteVo vo) {
		
		List<VoteVo> voList = dao.adminDetailBoard(sst,vo);
		if(voList == null) {
			throw new IllegalStateException();
		}
		
		//투표항목이 있다면 voList 0번째 List 객체안에 투표 정보 넣기
		if(voList.get(0).getItemNo().length() >0) {
			for (VoteVo vVo : voList) {
				voList.get(0).getVoList().add(
					new VoteVo(vVo.getVoteNo(),vVo.getVoteOrder(),vVo.getItemNo(),vVo.getItemName())
				);
			}
			
			List<VoteVo> voCntList = dao.voteEndCountSelect(sst, vo);
			if(voCntList == null) {
				throw new IllegalStateException();
			}
			//전체 투표 수 합산
			Integer cnt = 0;
			for (VoteVo voteVo : voCntList) {
				cnt = cnt + Integer.parseInt(voteVo.getCount());
			}
			
			//전체 투표 수 삽입
			voList.get(0).setCount(cnt.toString());
			//항목별 투표 수 삽입
			voList.get(0).setVoCntList(voCntList);
			
			//마감된 투표 결과 있으면 담기
			List<VoteVo> histryVo =dao.history(sst, vo);
			voList.get(0).setVoHistory(histryVo);

		}
		
		return voList.get(0);
	}

	public List<VoteVo> adminSelect(VoteVo vo) {
		return dao.adminSelect(sst,vo);
	}

	//페이지 용 전체 갯수 count
	public int pageCnt(VoteVo vo) {
		return dao.pageCnt(sst,vo);
	}

//	public List<VoteVo> history(VoteVo vo) {
//		return dao.history(sst,vo);
//	}

//	public List<VoteVo> adminHistory() {
//		return dao.adminHistory(sst);
//	}
	
}
