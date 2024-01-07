package com.team1.app.member.controller;

import java.lang.reflect.Member;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.team1.app.member.service.MemberService;

import lombok.RequiredArgsConstructor;
import oracle.jdbc.proxy.annotation.Post;

@RequestMapping("member")
@RestController
@RequiredArgsConstructor
@ResponseBody
@CrossOrigin("*")

//
public class MemberController {
	
	
	private final MemberService memberservice;
	
	@PostMapping("/login")
	public Map<String, Object> login(@RequestBody Member Vo) {
		

		return memberservice.login(Vo);
	}

}
