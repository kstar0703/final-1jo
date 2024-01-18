package com.team1.app.member.vo;

import lombok.Data;

@Data
public class MemberVo {
	private String memberNo;
	private String unitNo;
	private String phone;
	private String pwd;
	private String ownerYn;
	private String name;
	private String gender;
	private String birth;
	private String delYn;
	private String permissionYn;
	private String currentPwd;
	private String unitCount;
	private String email;
	private String joinDate;
	
	private String dong;
	private String ho;
	private String scale;
	private String vehTime;
	
	private String startDate; 	// 기간 검색 시작 데이트
	private String endDate;     // 기간 검색 검색 데이트
}
