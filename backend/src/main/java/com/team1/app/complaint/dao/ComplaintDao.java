package com.team1.app.complaint.dao;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import com.team1.app.complaint.vo.ComplaintVo;

@Repository
public class ComplaintDao {

	public List<ComplaintVo> mySumitList(SqlSessionTemplate sst,String no) {
		return sst.selectList("ComplaintMapper.mySumitList",no);
	}

	public int complaintSumit(SqlSessionTemplate sst, ComplaintVo vo) {
		return sst.insert("ComplaintMapper.complaintSumit",vo);
	}
	//이미지 복수 처리시 같이 작업.
	public int imgInsertSumit(SqlSessionTemplate sst, ComplaintVo vo) {
		return sst.insert("ComplaintMapper.imgInsertSumit",vo);
	}
	//이미지 복수 처리시 같이 작업.
	public List<ComplaintVo> mySumitDetail(SqlSessionTemplate sst, ComplaintVo vo) {
		return sst.selectList("ComplaintMapper.mySumitDetail",vo);
	}

	public List<ComplaintVo> list(SqlSessionTemplate sst) {
		return sst.selectList("ComplaintMapper.list");
	}
	//이미지 복수 처리시 같이 작업.
	public List<ComplaintVo> detail(SqlSessionTemplate sst, ComplaintVo vo) {
		return sst.selectList("ComplaintMapper.detail",vo);
	}

	public int clear(SqlSessionTemplate sst, ComplaintVo vo) {
		return sst.update("ComplaintMapper.clear",vo);
	}

	public List<ComplaintVo> select(SqlSessionTemplate sst, ComplaintVo vo) {
		return sst.selectList("ComplaintMapper.select",vo);
	}
	
}
