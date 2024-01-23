package com.team1.app.parking.vo;

import lombok.Data;

@Data
public class ParkingVo {
	 private String parkingNo;     //이력번호
	 private String unitNo;        //세대번호
	 private String memberNo;
	 private String purpose;       //방문목적
	 private String carNo;         //차번호
	 private String arrivalTime;   //입차 시간
	 private String departureTime; //출차 시간
	 private String modifyDate;    //변경일
	 private String delYn;         //삭제여부
	 private String fee; 			//요금
	 private String enrollDate;  	// 등록일
	 private String writeDate; //작성일
	 
	 private String phone;   // 휴대폰 번호
	 private String name; 	//회원번호
	 
	 private String dong;
	 private String ho;
	 
	 
	private String startDate; 	// 기간 검색 시작 데이트
	private String endDate;     // 기간 검색 검색 데이트
	         
}
