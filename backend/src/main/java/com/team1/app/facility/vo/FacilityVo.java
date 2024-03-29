package com.team1.app.facility.vo;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class FacilityVo {
	private String facilitiesNo;
	private String facilitiesName;
	private String unitPrice;
	private String location;
	private String operationTime;
	private String dayOff;
	private String contact;
	private String amenity;
	private String image;
	private String enrollDate;
	private String modifyDate;
	private String delYn;
	private String cancelManagerNo;
}
