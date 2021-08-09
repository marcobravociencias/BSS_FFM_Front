package com.mx.totalplay.ffm.cloudweb.utilerias.controller;
import java.util.HashMap;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;

import com.mx.totalplay.ffm.cloudweb.utilerias.utils.ConstantesGeneric;
@Controller
public class PlantaInternaViewsController {
	private  final Logger logger = LogManager.getLogger(PlantaInternaViewsController.class.getName());
	@Autowired 
	ConstantesGeneric genericVars;
	
	@GetMapping("/moduloDespacho")
	public String despachoPlantaInterna() {		
		return "plantainterna/despacho/despachopi";				
	}
	
	@GetMapping("/moduloUsuarios")
	public String usuariosPlantaInterna() {
		return "plantainterna/usuarios/usuariosPi";
	}
	
	@GetMapping("/moduloDisponibilidad")
	@GetMapping("/ordenesuniversales")
	public String ordenesUniversales() {
		return "plantainterna/ordenesUniversales/ordenesuniversales";
	}
	
	public String disponibilidad() {
		return "plantainterna/disponibilidad/disponibilidad";
	}
	
	@GetMapping("/moduloConsultaOt")
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
	@GetMapping("/moduloSkills")
	public String skillsAdm() {
		
		return "plantainterna/skillsAdm/mainSkills";
		
	}
	@GetMapping("/coordInst")
	public String coordInst() {
		
		return "plantainterna/coordInstalaciones/mainCoordInstalaciones";
		
	}
	
	@GetMapping("/busqueda")
	public String busqueda() {
		return "plantainterna/busqueda/busqueda";
	}
	
	@GetMapping("/moduloVehiculos")
	public String controlVehicular() {		
		return "plantainterna/controlVehicular/mainControlVehicular";
	}
}

