package com.team1.app.managementfee.vo;

import lombok.Data;

@Data
public class ManagementFeeVo {
	private String billingNo;
	private String unitNo;
	private String usagePeriod;
	private String basicFee;
	private String mainternanceFee;
	private String facilitiesFee;
	private String totalAmount;
	
	private String dong;
	private String ho;
	private String scale;
	
	private String startDate;
	private String endDate;
}
