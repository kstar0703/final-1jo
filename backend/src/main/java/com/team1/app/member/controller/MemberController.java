package com.team1.app.member.controller;

import java.lang.reflect.Member;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import javax.mail.internet.MimeMessage;
import javax.naming.spi.DirStateFactory.Result;


import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.team1.app.announcement.vo.AnnouncementVo;
import com.team1.app.manager.Service.ManagerService;
import com.team1.app.member.service.MemberService;
import com.team1.app.member.vo.MemberVo;
import com.team1.app.member.vo.RequestDto;
import com.team1.app.unit.vo.UnitVo;
import com.team1.app.util.vo.PageVo;

import ch.qos.logback.core.joran.conditional.IfAction;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import oracle.jdbc.proxy.annotation.Post;

@RequestMapping("/member")
@RestController
@RequiredArgsConstructor
@Slf4j
//status good bad 실패
public class MemberController {
	
	private final MemberService service;
	private final JavaMailSender mailSender;
	
	
	
	
	
    /**
     *	유닛정보조회 
     */
	@GetMapping("/selectUnit")
	public Map<String,Object> selectUnit (UnitVo vo){
		
		
		return service.selectUnit(vo);
	}
	
	
	
	/**
	 * 
	 * @param 아이디 phone
	 * @return
	 */
		@PostMapping("/validateId")
		public  Map< String, String> validateId(@RequestBody MemberVo vo ){
			return service.validateId(vo);
		}
	
	/**
	 * 
	 * @param phone,pwd,gender,birth,ownerYn,unitNo,name
	 * @return
	 */
	@PostMapping("/join")
	public Map<String, String> join(@RequestBody MemberVo vo){
		
	
		return service.join(vo);
	}
	
	/**
	 * 
	 * @param phone,pwd
	 *
	 * @return 
	 */
	@PostMapping("/login")
	public Map<String, Object> login(@RequestBody MemberVo vo) {
		
		return service.login(vo); 
	}
	
	/**
	 * 
	 * @param 변경할 정보 pwd memberNo
	 * @param 현재 비밀번호 
	 * @return 
	 */
	@PostMapping("/changeInfo")
	public  Map<String, Object> changeInfo(MemberVo vo){
		
		return service.changeInfo(vo);
	}
	/**
	 * 
	 * @param memberVo
	 * @param currentPwd
	 * @return 
	 */
	@PostMapping("/delete")
	public Map<String, Object> delete(@RequestBody MemberVo vo) {
		
		return service.delete(vo);
	}
	
	/**
	 * @param currentPwd , pwd
	 * @return
	 */
	
	@PostMapping("/changePwd")
	public  Map<String, Object> changePwd(@RequestBody MemberVo vo ){
		
		return service.changePwd(vo);
	}
	
	
	@PostMapping("emailCheck")
	public Map<String,String> emailCheck(@RequestBody Map<String,String> map){
		
		log.info("이메일 체크 실행 ::: {}" , map);
		
		Map<String, String> resultMap;
		resultMap = service.emailCheck(map);
		
		return resultMap;
	}
	
	
	@PostMapping("findUnit")
	public Map<String,Object> findUnit(@RequestBody RequestDto requestDto) {
		
		MemberVo vo = requestDto.getMemberVo();
	    PageVo pageVo = requestDto.getPageVo();

			
			 
			log.info ( "들어온 페이지  +  ::: {}", pageVo);
			log.info ( "들어온 MemberVo  +  ::: {}", vo);
		
	
			
			Map<String, Object> resultMap =  new HashMap();
			
			int cnt = service.countUnit(vo);	
		
			//페이지 리밋
			int pageLimit = 10;	
			
			PageVo pvo = new PageVo(cnt,pageVo.getCurrentPage() , pageLimit  , pageVo.getBoardLimit() );
			
			List<MemberVo> voList = service.Unitlist(vo,pvo);
			
			resultMap.put("status", "good");
			resultMap.put("msg", "조회 성공");

			resultMap.put("voList", voList);
			resultMap.put("pageVo",pvo);
			return resultMap;
    }
	
	@PostMapping("authorizeEmail")
	public Map findAuth(@RequestBody MemberVo vo) {
		
		
		Map map = new HashMap();
	    
		Random r = new Random();
        
        
        String sendTitle = "[그래이 아파트 이메일 인증]";
        int num = r.nextInt(999999); //랜덤 난수 
        String sendContent = String.format("<h1>안녕하세요 %s님</h1><p>그레이 아파트 회원가입 인증번호는 <strong> %d</strong> 입니다.</p>", vo.getName(), num);
        
       
       if(  emailSender(vo.getEmail() , sendTitle, sendContent )) {
       
        //성공적으로 메일 
        map.put("status", "good");
        map.put("num", num);
       }
            
            return map;
		}
	
	
	
	@PostMapping("isEmailInUse")
	public Map isEmailInUse(@RequestBody MemberVo vo) {
		
		log.info("들어온 값 ::: {}" ,vo);
		Map map = new HashMap();
		map.put("status", "good");
	    
		
		if(service.isEmailInUse(vo)!=1) {
			map.put("status", "bad");
		}
        
            return map;
	}
	
	@PostMapping("findPassWord")
	public Map findPassWord(@RequestBody MemberVo vo) {
		Map map = new HashMap();
		map.put("status", "bad");
		
		String sendTitle = "[그래이 아파트 임시 비밀번호]";
        
		// 템프 패스워드겸
		String tempPwd = service.getTempPwd(vo);
		
		if(tempPwd==null) {
			return map;
		}
		
		String name = service.getName(vo);
		
		
		
        String sendContent = String.format("<h1>안녕하세요 %s님</h1><p>그레이 아파트 임시 비밀번호는 <strong>%s</strong> 입니다.</p>", name, tempPwd);
		
		
		if(emailSender(vo.getEmail() , sendTitle, sendContent )) {
		       
	        //성공적으로 메일 
	        map.put("status", "good");
	        map.put("num", tempPwd);
		}
	    
		
		
        
            return map;
	}
	
	
	
	
	
	
	
	//이메일 샌더
	public boolean emailSender(String toEmail,String snedTitle,String sendContnet) {
		
	          
         String setFrom = "kkimbabb@naver.com";//발신자 이메일
         String tomail = toEmail;
         String title = sendContnet;
         String content = sendContnet; 
         
		
         try {
             MimeMessage msg = mailSender.createMimeMessage();
             MimeMessageHelper msgHelper = new MimeMessageHelper(msg, true, "utf-8");
             
             log.info("트라이안에 호출");
             
             msgHelper.setFrom(setFrom);
             msgHelper.setTo(tomail);
             msgHelper.setSubject(title);
             msgHelper.setText(content,true);
            
             //메일 전송
             mailSender.send(msg);
             
         }catch (Exception e) {
         
             
         }
		return true;
	
	
	}
}    

