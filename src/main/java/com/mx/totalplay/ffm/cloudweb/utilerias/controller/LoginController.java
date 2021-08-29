package com.mx.totalplay.ffm.cloudweb.utilerias.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.google.gson.Gson;
import com.google.gson.JsonObject;

@Controller
public class LoginController {
	Gson gson=new Gson();
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
	@RequestParam(value = "logout",	required = false) String logout, HttpServletRequest request) {
		//Object lastException  = request.getSession().getAttribute("SPRING_SECURITY_LAST_EXCEPTION");
		ModelAndView model = new ModelAndView();
		if (error != null) {
			model.addObject("error", "Credenciales invalidas");

			/**JsonObject jsonObject = gson.fromJson(gson.toJson(lastException).toString(), JsonObject.class);
			if (jsonObject.get("detailMessage").getAsString().equals("1")) {
				model.addObject("error", "Credenciales invalidas");
			} else {
				model.addObject("error", "No cuentas con permisos asignados");
			}**/
		}
		if (logout != null) {
			model.addObject("message", "Tu sesi&oacute;n ha expirado");
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
