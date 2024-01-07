package com.team1.app.managementfee.service;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Service;

import com.team1.app.managementfee.dao.ManagementFeeDao;
import com.team1.app.managementfee.vo.ManagementFeeVo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ManagementFeeService {

	private final ManagementFeeDao dao;
	private final SqlSessionTemplate sst;
	
	//세대별 관리비 조회(세대정보, 기간)
	public List<ManagementFeeVo> listByUnitAndPeriod() {
		return dao.listByUnitAndPeriod(sst);
	}

	//전체 관리비 조회 (관리자)
	public List<ManagementFeeVo> list() {
		return dao.list(sst);
	}

}
