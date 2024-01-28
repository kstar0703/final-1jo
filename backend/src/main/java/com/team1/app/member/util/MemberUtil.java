package com.team1.app.member.util;

import java.security.SecureRandom;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.stereotype.Component;

@Component
public class MemberUtil {

	//전화 번호 형식 확인
	public boolean matchPhoneParttern(String phoneNumber) {
		  final String PHONE_NUMBER_REGEX = "^010-\\d{4}-\\d{4}$";
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
	
	public String generateTemporaryPassword() {
		SecureRandom random = new SecureRandom();
        StringBuilder password = new StringBuilder();

        // 특수문자 1개, 대소문자 영어 1개 이상, 8자리 이상의 비밀번호 생성
        String specialCharacters = "!@#$%^&*()-_=+[]{}|;:'\",.<>?";
        String upperCaseCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        String lowerCaseCharacters = "abcdefghijklmnopqrstuvwxyz";
        String digits = "0123456789";

        // 대소문자, 숫자, 특수문자 각각 1개를 포함한 총 4개의 문자를 초기 비밀번호로 추가
        password.append(upperCaseCharacters.charAt(random.nextInt(upperCaseCharacters.length())));
        password.append(lowerCaseCharacters.charAt(random.nextInt(lowerCaseCharacters.length())));
        password.append(digits.charAt(random.nextInt(digits.length())));
        password.append(specialCharacters.charAt(random.nextInt(specialCharacters.length())));

        // 나머지 글자를 랜덤으로 추가 (총 10글자로 고정)
        for (int i = 4; i < 10; i++) {
            String allCharacters = upperCaseCharacters + lowerCaseCharacters + digits + specialCharacters;
            int randomIndex = random.nextInt(allCharacters.length());
            password.append(allCharacters.charAt(randomIndex));
        }

        return password.toString();
    }
}
