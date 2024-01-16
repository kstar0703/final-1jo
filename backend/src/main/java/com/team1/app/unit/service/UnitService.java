package com.team1.app.unit.service;

import java.util.HashMap;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Service;

import com.team1.app.member.dao.MemberDao;
import com.team1.app.member.util.MemberUtil;
import com.team1.app.unit.dao.UnitDao;
import com.team1.app.unit.vo.UnitVo;

import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class UnitService {
	
	private final UnitDao dao;
	private final SqlSessionTemplate sst;
	

	public Map<String, Object> info(UnitVo vo) {

		Map <String, Object> resultMap = new HashMap();
		
		UnitVo unitVo = dao.info(vo,sst);
		
		if(unitVo != null) {
			resultMap.put("status","good");
			resultMap.put("unitVo",unitVo);	
		}
		
		return resultMap;
	}

}
