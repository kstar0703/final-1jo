package com.team1.app.managementfee.dao;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import com.team1.app.managementfee.vo.ManagementFeeVo;

@Repository
public class ManagementFeeDao {

	//세대별 관리비 조회(세대정보, 기간)
	public List<ManagementFeeVo> listByUnitAndPeriod(SqlSessionTemplate sst, ManagementFeeVo vo) {
		
		List<ManagementFeeVo> list = sst.selectList("ManagementFeeMapper.listByUnitForYear", vo);
		System.out.println(list);
		return list;
	}

	//전체 관리비 조회 (관리자)
	public List<ManagementFeeVo> list(SqlSessionTemplate sst) {
		return sst.selectList("ManagementFeeMapper.list");
	}

}
