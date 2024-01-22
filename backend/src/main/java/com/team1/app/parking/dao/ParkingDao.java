package com.team1.app.parking.dao;

import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.session.RowBounds;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import com.team1.app.parking.vo.ParkingVo;
import com.team1.app.util.vo.PageVo;

@Repository
public class ParkingDao {

	//예약할 차 등록
	public int register(SqlSessionTemplate sst, ParkingVo vo) {
		return sst.update("ParkingMapper.register",vo);
	}

	//입차 등록
	public int arrival(SqlSessionTemplate sst, ParkingVo vo) {
		return sst.update("ParkingMapper.arrival",vo);
	}

	//출차 등록 
	public int departure(SqlSessionTemplate sst, ParkingVo vo) {
		return sst.update("ParkingMapper.departure",vo);
	}
	//출차 등록(시간빼기)
	public int subtractUnitTime(SqlSessionTemplate sst, ParkingVo vo) {
		return sst.update("ParkingMapper.subtractUnitTime",vo);
	}
	//예약 변경
	public int change(SqlSessionTemplate sst, ParkingVo vo) {
		return sst.update("ParkingMapper.change",vo);
	}

	//예약 취소
	public int cancel(SqlSessionTemplate sst, ParkingVo vo) {
		return sst.update("ParkingMapper.cancel",vo);
	}

	//예약 리스트
	public List<ParkingVo> list(SqlSessionTemplate sst, ParkingVo vo, PageVo pageVo) {
		
		int limit = pageVo.getBoardLimit();
		int offset = (pageVo.getCurrentPage()-1) * pageVo.getBoardLimit();
		RowBounds rowBounds = new RowBounds(offset,limit);
		
		return sst.selectList("ParkingMapper.list",vo,rowBounds); 
	}
	//예약 상세정보 

	public ParkingVo detail(SqlSessionTemplate sst, ParkingVo vo) {
		return sst.selectOne("ParkingMapper.detail",vo);
	}

	//예약 복구
	public int recovery(SqlSessionTemplate sst,ParkingVo vo) {
		return sst.update("ParkingMapper.recovery",vo);
	}

	// 게시글 숫자
	public int count(SqlSessionTemplate sst, ParkingVo vo) {
		return sst.selectOne("ParkingMapper.count",vo);
	}
	

}
