package com.mx.totalplay.ffm.cloudweb.plantaexterna.controller;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.mx.totalplay.ffm.cloudweb.plantaexterna.service.InspectorIncidenciaService;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.DataTableResponse;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;

@RestController
@RequestMapping("/req")
public class InspectorIncidenciaController {
	
	private final Logger logger = LogManager.getLogger(InspectorIncidenciaController.class.getName());
	private final InspectorIncidenciaService inspectorIncidenciaService;
	private ServiceResponseResult result;
	private DataTableResponse dataTableResponse;
	private Gson gson = new Gson();
	
	@Autowired
	public InspectorIncidenciaController(InspectorIncidenciaService inspectorIncidenciaService) {
		this.inspectorIncidenciaService = inspectorIncidenciaService;
	}
	
	@PostMapping("/consultarFallasInspectorPE")
	public ResponseEntity<?> consultarFallasInspectorPE(String params) {
		logger.info("##### InspectorIncidenciaController - consultarFallasInspectorPE");
		ServiceResponseResult response = inspectorIncidenciaService.consultarFallasInspectorPE(params);
		if (response.getResult() instanceof Integer){
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
		
	}
	
	@PostMapping("/consultarStatusFallasInspectorPE")
	public ResponseEntity<?> consultarStatusFallasInspectorPE(String params) {
		logger.info("###### InspectorIncidenciaController - consultarStatusFallasInspectorPE");
		ServiceResponseResult response = inspectorIncidenciaService.consultarStatusFallasInspectorPE(params);
		if(response.getResult() instanceof Integer) {
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}
	
	@PostMapping("/consultarIncidenciasInspectorPE")
	public ResponseEntity<?> consultarIncidenciasInspectorPE(String params) {
		logger.info("###### InspectorIncidenciaController - consultarIncidenciasInspectorPE");
		ServiceResponseResult response = inspectorIncidenciaService.consultarIncidenciasInspectorPE(params);
		if(response.getResult() instanceof Integer) {
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}

}
