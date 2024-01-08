package com.team1.app.complaint.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.team1.app.complaint.service.ComplaintService;

import lombok.RequiredArgsConstructor;

//민원 하자 접수
@RestController
@RequestMapping("complaint")
@RequiredArgsConstructor
public class ComplaintController {

	private final ComplaintService service;
	
}
