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
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.UtileriaGeneral;

@Controller
public class PlantaExternaViewsController {
	private  final Logger logger = LogManager.getLogger(PlantaInternaViewsController.class.getName());
	
	
	private final ConstantesGeneric genericVars;   
	private final UtileriaGeneral utileriaGeneral;
	
    @Autowired
    public PlantaExternaViewsController(UtileriaGeneral utileriaGeneral,ConstantesGeneric genericVars) {
        this.utileriaGeneral = utileriaGeneral;
        this.genericVars = genericVars;
    }
	
	@GetMapping("/moduloDespachoPE")
	public String despachoPlantaExterna() {		
		return "plantaexterna/despacho/despachope";				
	}
	@GetMapping("/moduloDespachoCentral")
	public String despachoCentralPlantaExterna() {		
		return "plantaexterna/despachocentral/despachocentral";				
	}
	
	@GetMapping("/moduloConsultaOTPE")
	public String consultaOtpePlantaExterna() {		
		return "plantaexterna/consultaotpe/consultaotpe";				
	}
	@GetMapping("/moduloReportesPE")
	public String reportesPEPlantaExterna() {		
		return "plantaexterna/reportespe/reportespe";				
	}
	
	@GetMapping("/moduloInspectorIncidenciasPE")
	public String inspectorIncidenciasPlantaExterna() {		
		return "plantaexterna/inspectorincidencia/inspectorincidencia";				
	}
	
	@GetMapping("/moduloInspectorCoberturasPE")
	public String inspectorCoberturaPlantaExterna() {		
		return "plantaexterna/inspectorcoberturas/inspectorcoberturaspe";				
	}
	
	@GetMapping("/moduloIncidenciasCuadrantesPE")
	public String incidenciasCuadrantesPlantaExterna() {		
		return "plantaexterna/incidenciasCuadrantes/incidenciasCuadrantes";				
	}
	
	@ModelAttribute("googlkeyattrvar")
	 public Map<String,Object> agregarVariablesGeneric () {
		logger.info("agregando generic ------------------");
		Map<String,Object>mapaVars=new HashMap<>();
		mapaVars.put("gkeactok", genericVars.getGoogAccLLaevATok());
	  return mapaVars;
	}
}
