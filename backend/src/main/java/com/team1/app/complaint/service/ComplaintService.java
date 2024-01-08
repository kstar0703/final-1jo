package com.team1.app.complaint.service;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Service;

import com.team1.app.complaint.dao.ComplaintDao;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ComplaintService {

	private final ComplaintDao dao;
	private final SqlSessionTemplate sst;
}
