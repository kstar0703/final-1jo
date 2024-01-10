package com.team1.app.util.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
public class SearchVo {
	private String searchType;
	private String searchKeyword;

}
