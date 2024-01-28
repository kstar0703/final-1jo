package com.team1.app.member.service;

import java.lang.reflect.Member;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;import org.apache.commons.io.input.TeeInputStream;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.boot.autoconfigure.amqp.RabbitProperties.ContainerType;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.team1.app.member.dao.MemberDao;
import com.team1.app.member.util.MemberUtil;
import com.team1.app.member.vo.DashBoardDto;
import com.team1.app.member.vo.MemberVo;
import com.team1.app.unit.vo.UnitVo;
import com.team1.app.util.vo.PageVo;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class MemberService {
	
	private final MemberDao dao;
	private final MemberUtil util;
	private final SqlSessionTemplate sst;
	
	/**
	 * 아이디 유효성 검사
	 * @param 
	 * @return msg ,status 
	 */
	public Map<String, String> validateId(MemberVo vo) {
		
		// 결과맵 
		Map<String, String> resultMap = new HashMap();
		resultMap.put("msg", "가입 불가능한 전화번호 입니다.");
		resultMap.put("status","bad");
		
		if(util.checkPhoneLength(vo.getPhone())) {
			resultMap.put("msg","길이가 너무 짧습니다.");
			return resultMap;
		}
		
		if(!util.matchPhoneParttern(vo.getPhone())) {
			resultMap.put("msg","전화번호 형식이 아닙니다.");
			return resultMap;
		}
		
		if(dao.validateId(vo,sst) !=1) {
			resultMap.put("msg","가입 가능한 전화번호 입니다.");
			resultMap.put("status","good");
		}
		
		
		return resultMap;
		
	}
	/**
	 * 회원가입
	 * @param 
	 * @return msg ,status 
	 */
	public Map<String, String> join(MemberVo vo) {
		//결과맵
		Map<String,String> resultMap = new HashMap();
		resultMap.put("msg", "가입실패");
		resultMap.put("status","bad");
		
		
		if(util.checkIdLength(vo.getPhone())) {
			resultMap.put("msg","비밀번호는 9글자 이상 작성해야 합니다");
			return resultMap;
		}
		
		if(!util.matchIdParttern(vo.getPwd())) {
			resultMap.put("msg","특수문자,대문자,소문자가 하나 이상씩 들어가야 합니다");
			return resultMap;
		}
		
		int result = dao.join(sst,vo);
		
		if(result ==1) {
			resultMap.put("msg","회원 가입 성공");
			resultMap.put("status","good");
		}
		
		return resultMap;
	}
	/**
	 * 로그인
	 * @param 
	 * @return loginMember ,status , msg
	 */
	public Map<String, Object> login(MemberVo vo) {
		
	
		//결과맵
		Map<String,Object> resultMap = new HashMap();
		resultMap.put("msg", "아이디 또는 패스워드가 잘못되었습니다");
		resultMap.put("status","bad");

		
		MemberVo loginMember =  dao.login(sst,vo);
		
		System.out.println(loginMember);
		
		if(loginMember ==null) {
			return resultMap;
		}
		
	
		if(loginMember.getPermissionYn().equals("N")) {
			resultMap.put("msg", "허용받지 않은 계정입니다.");
		}else {
			resultMap.put("msg", "로그인 성공");
			resultMap.put("status","good");
			resultMap.put("loginMember",loginMember);
		}
		
	
		return resultMap;
	}
	/**
	 * 정보 변경
	 * @param 
	 * @return loginMember ,status , msg
	 */
	public Map<String, Object> changeInfo(MemberVo vo) {

		// 결과맵 
		Map<String, Object> resultMap = new HashMap();
		resultMap.put("msg", "정보 변경 실패");
		resultMap.put("status","bad");
				
		
		// 패스워드 확인로직
		if(vo.getPwd() !=null) {
			
			if(util.checkIdLength(vo.getPwd())) {
				resultMap.put("msg","비밀번호는 9글자 이상 작성해야 합니다");
				return resultMap;
			}
			
			
			if(!util.matchIdParttern(vo.getPwd())) {
				resultMap.put("msg","특수문자,대문자,소문자가 하나 이상씩 들어가야 합니다");
				return resultMap;
			}
		}
		
		int result = dao.changeInfo(sst,vo);
		
		if(result == 1) {
			resultMap.put("msg", "정보 변경 성공");
			resultMap.put("status","good");
			MemberVo loginMember = dao.login(sst, vo);
		}
			
		return resultMap;
	}
	public Map<String, Object> delete(MemberVo vo) {
		
		// 결과맵 
		Map<String, Object> resultMap = new HashMap();
		resultMap.put("msg", "회원탈퇴 실패");
		resultMap.put("status","bad");
		
		
		//전화번호 앞에 1로 변경
		vo.setPhone("1" + vo.getPhone().substring(1));
		
		int result = dao.delete(sst,vo);
		
		if(result == 1) {
			resultMap.put("msg", "회원 탈퇴 성공");
			resultMap.put("status","good");
		}
		
		return resultMap;
	}
	
	// 유닛 조회
	public Map<String, Object> selectUnit(UnitVo vo) {
		
		// 결과맵 
		Map<String, Object> resultMap = new HashMap();
		resultMap.put("msg", "조회 데이터 없음");
		resultMap.put("status","bad");
		resultMap.put("UnitVo", "검색결과없음");
		
		List<UnitVo> unitVo = dao.selectUnit(sst,vo);
		
		if(unitVo != null) {	
		resultMap.put("msg", "조회 성공");
		resultMap.put("status","good");
		resultMap.put("UnitVo", unitVo);
		}
		return resultMap;
		
	}
	// 비번 변경
	public Map<String, Object> changePwd(MemberVo vo) {
		
		// 결과맵 
		Map<String, Object> resultMap = new HashMap();
		resultMap.put("msg", "조회 데이터 없음");
		resultMap.put("status","bad");
		System.out.println(vo);
		
		
		MemberVo loginMember =null;
		if(dao.changeInfo(sst,vo)!=0) {
		 loginMember = localStoargeMember(vo);
		 resultMap.put("msg", "비밀번호 변경 성공!");
		resultMap.put("status","good");
		 
		}
		resultMap.put("loginMember",loginMember);
		
		System.out.println(resultMap);

		
		
	
		return resultMap;
	}
	
	// 로그인 정보 최신화용
	public MemberVo localStoargeMember(MemberVo vo) {
		
		MemberVo loginMember = dao.localStoargeMember(sst,vo);
		
		return loginMember;
	}
	// 이메일 중복검사
	public Map<String, String> emailCheck(Map<String, String> map) {
		Map<String, String> resultMap = new HashMap<String, String>();

		resultMap.put("status","good");
		
		int result = dao.emailCheck(sst,map);
		
		if(result>0) {
			resultMap.put("status","bad");
		}
		
		return resultMap;
	}
	
	// 유닛검샘 카운트
	public int countUnit(MemberVo vo) {

		List<MemberVo> list	= dao.countUnit(sst,vo);
		
		
		log.info("들어온 리스트 ?? {} ::: ",list);
		
		 
		Map  resultMap = new HashMap();
		
		for (MemberVo memberVo : list) { 
			resultMap.put(memberVo.getUnitNo(),memberVo);
		}
		
		List<MemberVo> resultList= new ArrayList<MemberVo>(resultMap.values());
		
		int result = resultList.size();
		
		return result; 
	}
	
	// 유닛검새
	public List<MemberVo> Unitlist(MemberVo vo, PageVo pvo) {
		
		List<MemberVo> list	= dao.countUnit(sst,vo);
		
		if(list.size() ==0) {
			return new ArrayList<MemberVo>();
		}
		
		Map <String,MemberVo> resultMap = new LinkedHashMap<String, MemberVo>();
		
		for (MemberVo memberVo : list) { 
			log.info("찍힌 번호 ::: {} ", memberVo.getUnitNo());
			resultMap.put(memberVo.getUnitNo(),memberVo);
		}
		
		List<MemberVo> originList= new ArrayList<MemberVo>(resultMap.values());
		
		
		for (MemberVo memberVo : originList) {
			log.info("찍힌 번호 ::: {} ", memberVo.getUnitNo());
		}
		
		
		log.info("유닛검색 찍힌 리스트 사이즈 ::: {}", originList );
		log.info("유닛검색 찍힌 넘어온 pvo ::: {}", pvo );
		
		
		
		
		
		// 시작위치는 큐런트 페이지  private int boardLimit;		// 한 페이지에 보여줄 게시글 갯수
		
		int offset = (pvo.getCurrentPage()-1) * pvo.getBoardLimit();
		int limit =  offset + pvo.getBoardLimit();
	
	
		if(limit > originList.size()){
			limit =   originList.size();
		}
		
		
		List<MemberVo> 	pageList = new ArrayList<>(originList.subList(offset, limit));
		
		
			
		return pageList;
	}
	// 비밀번호 찾기 이메일 매칭 맞는지 확인하는 메소드
	public int isEmailInUse(MemberVo vo) {
		return dao.isEmailInUse(sst,vo);
	}
	//임시 비밀번호 만들기
	public String getTempPwd(MemberVo vo) {
		
	String tmepPwd = util.generateTemporaryPassword();
	
	log.info("생성한 임시 비밀번호 :::{}",tmepPwd);
	
	vo.setPwd(tmepPwd);
	
	
	
	
	
	int result = dao.updateTempPwd(sst,vo);
	
	if(result!=1) {
		return null;
	}

		
		return tmepPwd;
	}
	//이름 얻기
	public String getName(MemberVo vo) {
		return dao.getName(vo,sst); 
	}
	public DashBoardDto getDashBoard(MemberVo vo) {
		return dao.dashBoardDto(vo,sst);
	}
}