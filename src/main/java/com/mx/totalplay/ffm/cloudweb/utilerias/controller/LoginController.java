package com.mx.totalplay.ffm.cloudweb.utilerias.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class LoginController {
	
	/****/
	@RequestMapping(value = { "/"}, method = RequestMethod.GET)
	public ModelAndView Welome() {
		ModelAndView model = new ModelAndView();
		model.setViewName("loginPage");
		return model;
	}

	@RequestMapping(value = { "/homePage"}, method = RequestMethod.GET)
	public ModelAndView homePage() {
		ModelAndView model = new ModelAndView();
		model.setViewName("homePage");
		return model;
	}
	
	@RequestMapping(value = {"/loginPage"}, method = RequestMethod.GET)
	public ModelAndView loginPage(@RequestParam(value = "error",required = false) String error,
	@RequestParam(value = "logout",	required = false) String logout) {
		
		ModelAndView model = new ModelAndView();
		if (error != null) {
			model.addObject("error", "Credenciales invalidas");
		}

		if (logout != null) {
			model.addObject("message", "Has cerrado sesi�n.");
		}

		model.setViewName("loginPage");
		return model;
	}
	
	@RequestMapping(value = { "/error_403"}, method = RequestMethod.GET)
	public ModelAndView error403() {
		ModelAndView model = new ModelAndView();
		model.setViewName("error_403");
		return model;
	}
}
