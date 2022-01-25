package com.mx.totalplay.ffm.cloudweb.utilerias.controller;

import java.util.HashMap;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;

import com.mx.totalplay.ffm.cloudweb.utilerias.utils.ConstantesGeneric;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.UtileriaGeneral;

@Controller
public class ProjectManagerViewsController {
	private  final Logger logger = LogManager.getLogger(PlantaInternaViewsController.class.getName());
	private final ConstantesGeneric genericVars;   
	private final UtileriaGeneral utileriaGeneral;
	
	public ProjectManagerViewsController(ConstantesGeneric genericVars, UtileriaGeneral utileriaGeneral) {
		this.genericVars = genericVars;
		this.utileriaGeneral = utileriaGeneral;
	}
	
	@ModelAttribute("googlkeyattrvar")
	 public Map<String,Object> agregarVariablesGeneric () {
		logger.info("agregando generic ------------------");
		Map<String,Object>mapaVars=new HashMap<>();
		mapaVars.put("gkeactok", genericVars.getGoogAccLLaevATok());
	  return mapaVars;
	}
	
	@GetMapping("/moduloMisProyectos")
	public String misProyectosProjectManager() {
		return "projectmanager/misProyectos/misProyectos";
	}

	@GetMapping("/moduloMonitorPMS")
	public String monitorPMS() {
		return "projectmanager/monitorPMS/monitorPMS";
	}
}
