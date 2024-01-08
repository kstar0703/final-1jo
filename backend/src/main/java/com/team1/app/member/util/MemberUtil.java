package com.team1.app.member.util;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.stereotype.Component;

@Component
public class MemberUtil {

	//전화 번호 형식 확인
	public boolean matchParttern(String phoneNumber) {
		  final String PHONE_NUMBER_REGEX = "^010-\\d{4}-\\d{3}$";
		 Pattern pattern = Pattern.compile(PHONE_NUMBER_REGEX);
	        Matcher matcher = pattern.matcher(phoneNumber);
	        return matcher.matches();
	}

	//전화 번호 길이 확인
	public boolean checkLength(String phoneNumber) {		
		return phoneNumber.length() <= 12;
	}
	
	

}
