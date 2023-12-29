package com.team1.app.home.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController {
	//홈화면
	@RequestMapping("home")
	public String home() {
		return "home";
	}
}
