package com.totalplay.ffm.utilerias.controller;

import java.util.HashMap;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;

import com.totalplay.ffm.utilerias.utils.ConstantesGeneric;

@Controller
public class GenericController {
	
	private  final Logger logger = LogManager.getLogger(GenericController.class.getName());
	
	@Autowired
	ConstantesGeneric genericVars;
	
	@GetMapping("/enrutarUser")
	public String despachoPlantaExterna() {	
		logger.info("ENTRA DECISION");
		return "plantainterna/despacho/despachopi";				
	}	
	
	 @ModelAttribute("googlkeyattrvar")
	 public Map<String,Object> agregarVariablesGeneric () {
		logger.info("agregando generic ------------------");
		Map<String,Object>mapaVars=new HashMap<>();
		mapaVars.put("gkeactok", genericVars.getGoogAccLLaevATok());
	  return mapaVars;
	}
}
