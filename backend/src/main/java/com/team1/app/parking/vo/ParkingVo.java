package com.team1.app.parking.vo;

import lombok.Data;

@Data
public class ParkingVo {
	 private String parkingNo;     //이력번호
	 private String unitNo;        //세대번호
	 private String purpose;       //방문목적
	 private String carNo;         //차번호
	 private String arrivaltime;   //입차 시간
	 private String departuretime; //출차 시간
	 private String modifyDate;    //변경일
	 private String delYn;         //삭제여부
	 private String fee; 		//요금
	         
}
