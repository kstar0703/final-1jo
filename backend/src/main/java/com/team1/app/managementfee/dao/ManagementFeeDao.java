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
		System.out.println("조회된" + list);
		return list;
	}

	//전체 관리비 조회 (관리자)
	public List<ManagementFeeVo> list(SqlSessionTemplate sst) {
		return sst.selectList("ManagementFeeMapper.list");
	}

	//view
	//	public List name() {
	//		
	//	}

	//청구번호 조회
	public String getBilingNo(SqlSessionTemplate sst, ManagementFeeVo feeVo) {
		return sst.selectOne("ManagementFeeMapper.getBilingNo", feeVo);
	}
	//기존 청구내역에 추가 
	public int updateFacilitiesFee(SqlSessionTemplate sst, ManagementFeeVo feeVo) {
		return sst.update("ManagementFeeMapper.updateFacilitiesFee", feeVo);
	}

}
