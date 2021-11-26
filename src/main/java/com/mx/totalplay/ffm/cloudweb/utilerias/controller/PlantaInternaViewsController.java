package com.mx.totalplay.ffm.cloudweb.utilerias.controller;
import java.util.HashMap;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;

import com.mx.totalplay.ffm.cloudweb.plantainterna.utils.ConstDisponbilidadPI;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.ConstantesGeneric;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.ConsumeRest;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.UtileriaGeneral;
@Controller
public class PlantaInternaViewsController {
	private  final Logger logger = LogManager.getLogger(PlantaInternaViewsController.class.getName());
	
	
	
	private final ConstantesGeneric genericVars;   
	private final UtileriaGeneral utileriaGeneral;

    @Autowired
    public PlantaInternaViewsController(UtileriaGeneral utileriaGeneral,ConstantesGeneric genericVars) {
        this.utileriaGeneral = utileriaGeneral;
        this.genericVars = genericVars;
    }

	
    
	@GetMapping("/moduloDespacho")
	public String despachoPlantaInterna() {		
		return "plantainterna/despacho/despachopi";				
	}
	@GetMapping("/moduloUsuarios")
	public String usuariosPlantaInterna() {
		return "plantainterna/usuarios/usuariosPi";
	}
	
	@GetMapping("/moduloOrdenesUniversales")
	public String ordenesUniversales() {
		return "plantainterna/ordenesUniversales/ordenesuniversales";
	}
	
	@GetMapping("/moduloDisponibilidad")
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
	 
	@GetMapping("/moduloReportesPI")
	public String reportesPI() {
		
		return "plantainterna/reportesPI/mainReportesPI";
		
	}
	@GetMapping("/moduloSkills")
	public String skillsAdm() {
		
		return "plantainterna/skillsAdm/mainSkills";
		
	}
	@GetMapping("/moduloCoordInst")
	public String coordInst() {
		return "plantainterna/coordInstalaciones/mainCoordInstalaciones";
		
	}
	
	@GetMapping("/moduloBusqueda")
	public String busqueda() {
		return "plantainterna/busqueda/busqueda";
	}
	
	@GetMapping("/moduloVehiculos")
	public String controlVehicular() {		
		return "plantainterna/controlVehicular/mainControlVehicular";
	}
	
	@GetMapping("/moduloSoporteCentralizado")
	public String soporteCentralizado() {		
		return "plantainterna/soporteCentralizado/mainSoporteCentralizado";
	}
}

