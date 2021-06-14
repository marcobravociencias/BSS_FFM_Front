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
public class PlantaInternaViewsController {
	private  final Logger logger = LogManager.getLogger(PlantaInternaViewsController.class.getName());
	@Autowired 
	ConstantesGeneric genericVars;
	
	@GetMapping("/despachoplantainterna")
	public String despachoPlantaInterna() {		
		return "plantainterna/despacho/despachopi";				
	}
	
	@GetMapping("/usuariosplantainterna")
	public String usuariosPlantaInterna() {
		return "plantainterna/usuarios/usuariosPi";
	}
	
	@GetMapping("/disponibilidad")
	public String disponibilidad() {
		return "plantainterna/disponibilidad/disponibilidad";
	}
	
	@GetMapping("/consultaOT")
	public String consultaOT() {
		return "plantainterna/consultaOT/consultaOT";
	}
	 @ModelAttribute("googlkeyattrvar")
	 public Map<String,Object> agregarVariablesGeneric () {
		logger.info("agregando generic ------------------");
		Map<String,Object>mapaVars=new HashMap<>();
		mapaVars.put("gkeactok", genericVars.getGoogAccLLaevATok());
	  return mapaVars;
	}
	 
	@GetMapping("/reportesPI")
	public String reportesPI() {
		
		return "plantainterna/reportesPI/mainReportesPI";
		
	}
	@GetMapping("/skillsAdm")
	public String skillsAdm() {
		
		return "plantainterna/skillsAdm/mainSkills";
		
	}
	
	@GetMapping("/busqueda")
	public String busqueda() {
		return "plantainterna/busqueda/busqueda";
	}
}

