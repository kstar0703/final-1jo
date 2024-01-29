package com.team1.app.complaint.dao;

import java.io.File;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;

import com.team1.app.complaint.vo.ComplaintImgVo;
import com.team1.app.complaint.vo.ComplaintVo;
import com.team1.app.util.vo.PageVo;

import lombok.extern.slf4j.Slf4j;

@Repository
@Slf4j
public class ComplaintDao {

	public List<ComplaintVo> mySumitList(SqlSessionTemplate sst,ComplaintVo vo) {
		return sst.selectList("ComplaintMapper.mySumitList",vo);
	}

	public int complaintSumit(SqlSessionTemplate sst, ComplaintVo vo) {
		return sst.insert("ComplaintMapper.complaintSumit",vo);
	}
	
	public int imgInsertSumit(SqlSessionTemplate sst, List<ComplaintImgVo> imgList) {		
		return sst.insert("ComplaintMapper.imgInsertSumit",imgList);
	}
	
	public List<ComplaintVo> mySumitDetail(SqlSessionTemplate sst, ComplaintVo vo) {
		return sst.selectList("ComplaintMapper.mySumitDetail",vo);
	}

	public List<ComplaintVo> list(SqlSessionTemplate sst, PageVo pageVo) {
		int limit = pageVo.getBoardLimit();
		int offset = (pageVo.getCurrentPage()-1)*pageVo.getBoardLimit();
		RowBounds rowBounds = new RowBounds(offset,limit);
		return sst.selectList("ComplaintMapper.adminList"," ",rowBounds);
	}
	
	public List<ComplaintVo> detail(SqlSessionTemplate sst, ComplaintVo vo) {
		return sst.selectList("ComplaintMapper.adminDetail",vo);
	}

	public int clear(SqlSessionTemplate sst, ComplaintVo vo) {
		return sst.update("ComplaintMapper.clear",vo);
	}

	public List<ComplaintVo> select(SqlSessionTemplate sst, ComplaintVo vo, PageVo pageVo) {
		int limit = pageVo.getBoardLimit();
		int offset = (pageVo.getCurrentPage()-1)*pageVo.getBoardLimit();
		RowBounds rowBounds = new RowBounds(offset, limit);
		return sst.selectList("ComplaintMapper.adminSelect", vo, rowBounds);
	}
	
	//관리자 메인 페이지 기능
	public List<ComplaintVo> statuseSelect(SqlSessionTemplate sst) {
		return sst.selectList("ComplaintMapper.statuseSelect");
	}
	//페이징용 페이지 갯수 
	public int listCnt(SqlSessionTemplate sst, ComplaintVo vo) {
		return sst.selectOne("ComplaintMapper.listCnt",vo);
	}
	public int listSelectCnt(SqlSessionTemplate sst, ComplaintVo vo) {
		return sst.selectOne("ComplaintMapper.listSelectCnt",vo);
	}
	
}
