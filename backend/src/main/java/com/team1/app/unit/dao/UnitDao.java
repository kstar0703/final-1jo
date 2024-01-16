package com.team1.app.unit.dao;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import com.team1.app.unit.vo.UnitVo;

@Repository
public class UnitDao {

	public UnitVo info(UnitVo vo, SqlSessionTemplate sst) {
		
		return sst.selectOne("MemberMapper.unitInfo",vo);
	}

}
