package com.team1.app.member.util;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.stereotype.Component;

@Component
public class MemberUtil {

	//전화 번호 형식 확인
	public boolean matchPhoneParttern(String phoneNumber) {
		  final String PHONE_NUMBER_REGEX = "^010-\\d{4}-\\d{3}$";
		 Pattern pattern = Pattern.compile(PHONE_NUMBER_REGEX);
	        Matcher matcher = pattern.matcher(phoneNumber);
	        return matcher.matches();
	}

	//전화 번호 길이 확인 
	public boolean checkPhoneLength(String phoneNumber) {		
		return phoneNumber.length() <= 12 || phoneNumber.length()>13;
	}
	
	//패스워드 길이 확인 (9자리 이상)
	public boolean checkIdLength(String pwd) {
		
		return pwd.length() <=8;	
			}
	//패스워드 형식
	public boolean matchIdParttern(String pwd) {
		   // 정규식 패턴
        String regex = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@#$%^&+=!]).+$";
        // 패턴 컴파일
        Pattern pattern = Pattern.compile(regex);
        // 패턴과 일치하는지 확인
        Matcher matcher = pattern.matcher(pwd);

        return matcher.matches();
	}
	

}
