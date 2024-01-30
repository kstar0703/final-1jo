package com.team1.app.facility.service;

import java.io.File;
import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.team1.app.facility.dao.FacilityDao;
import com.team1.app.facility.vo.FacilityHistoryVo;
import com.team1.app.facility.vo.FacilityVo;
import com.team1.app.managementfee.dao.ManagementFeeDao;
import com.team1.app.managementfee.vo.ManagementFeeVo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FacilityService {

	private final FacilityDao dao;
	private final SqlSessionTemplate sst;
	
	private final ManagementFeeDao fDao;
	
	//커뮤니티시설 목록조회
	public List<FacilityVo> list() {
		return dao.list(sst);
	}

	//커뮤니티시설 상세정보조회
	public FacilityVo detail(FacilityVo vo) {
		return dao.detail(sst, vo);
	}
	
	//예약내역조회 (사용자)
	public List<FacilityHistoryVo> listByHistory(FacilityHistoryVo vo) {
		//TODO 기간조회 - 화면에 따라 수정할 것 
		return dao.listByHistory(sst, vo);
	}

	//예약추가(회원번호, 이용일)
	public int apply(FacilityHistoryVo vo) {
		//관리비 청구용 데이터 가공
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
		LocalDate date = LocalDate.parse(vo.getUseDate(), formatter);
		String usageYear = String.valueOf(date.getYear());
		String usageMonth = String.valueOf(date.getMonthValue());
		String unitNo = vo.getUnitNo();
		String price = vo.getPrice();
		ManagementFeeVo feeVo = new ManagementFeeVo();
		feeVo.setUnitNo(unitNo);
		feeVo.setUsageYear(usageYear);
		feeVo.setUsageMonth(usageMonth);
		feeVo.setPrice(price);
		
		String billingNo = fDao.getBilingNo(sst, feeVo);
		System.out.println("조회된청구번호" + billingNo);
		if(billingNo != null) {
			fDao.updateFacilitiesFee(sst, feeVo);
		}else {
			
		}
		
		return dao.apply(sst, vo);
	}
	
	

	//예약취소(신청번호)
	public int cancel(FacilityHistoryVo vo) {
		return dao.cancel(sst, vo);
	}

	//커뮤니티시설 목록조회(+상세조회) (관리자)
	public List<FacilityVo> listForAdmin() {
		return dao.listForAdmin(sst);
	}

	//커뮤니티시설 등록 (관리자)
//	public int insert(FacilityVo vo, MultipartFile image) throws Exception {		
//		if(image != null) {
//			String imageUrl = saveFile(image);
//			String path = imageUrl.replace("C:\\dev\\download\\", "http://127.0.0.1:8888/app");		
//			vo.setImage(path);
//		}
//		int result = dao.insert(sst, vo);
//		 return result;
//	}
	
	public int insert(FacilityVo vo) {
		if(vo.getImage() != null) {
		String str = vo.getImage().replace("C:\\dev\\khTeamPrj\\team1Repo\\backend\\src\\main\\webapp", "http://127.0.0.1:8888/app");
		vo.setImage(str);
		}
		return dao.insert(sst, vo);
	}
	
	
	//파일저장
//	public String saveFile(MultipartFile image) throws Exception, Exception {
//		String path ="C:\\dev\\download\\";
//		
//		String originName = image.getOriginalFilename();
//		String extension = originName.substring(originName.lastIndexOf("."));
//		String imgName = UUID.randomUUID() + extension;
//		File target = new File(path + imgName);
//		image.transferTo(target);
//		
//		return path + imgName;
//	}

	//커뮤니티시설 수정 (관리자)
	public int edit(FacilityVo vo) {
		if(vo.getImage() != null) {
		String str = vo.getImage().replace("C:\\dev\\khTeamPrj\\team1Repo\\backend\\src\\main\\webapp", "http://127.0.0.1:8888/app");
		vo.setImage(str);
		}
		return dao.edit(sst, vo);
	}

	//커뮤니티시설 삭제 (관리자)
	public int delete(FacilityVo vo) {
		return dao.delete(sst, vo);
	}

	//커뮤니티 상세조회 (관리자)
	public FacilityVo detailForAdmin(FacilityVo vo) {
		return dao.detailForAdmin(sst, vo);
	}

	//전체예약내역조회 (관리자)
	public List<FacilityHistoryVo> listByHistoryForAdmin() {
		return dao.listByHistoryForAdmin(sst);
	}





}
