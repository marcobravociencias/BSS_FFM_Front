package com.mx.totalplay.ffm.cloudweb.plantaexterna.controller;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.mx.totalplay.ffm.cloudweb.plantaexterna.service.InspectorCoberturaService;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.DataTableResponse;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;

@RestController
@RequestMapping("/req")
public class InspectorCoberturaController {
    private final Logger logger = LogManager.getLogger(InspectorCoberturaController.class.getName());
	private final InspectorCoberturaService inspectorCoberturaService;
	private ServiceResponseResult result;
	private DataTableResponse dataTableResponse;
	private Gson gson = new Gson();
	
	@Autowired
	public InspectorCoberturaController(InspectorCoberturaService inspectorCoberturaService) {
		this.inspectorCoberturaService = inspectorCoberturaService;
	}
	
	@PostMapping("/consultarFallasCoberturaPE")
	public ResponseEntity<?> consultarFallasInspectorPE(@RequestBody String params) {
		logger.info("##### InspectorCoberturaController - consultarFallasInspectorPE");
		ServiceResponseResult response = inspectorCoberturaService.consultarFallasCoberturaPE(params);
		if (response.getResult() instanceof Integer){
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
		
	}

    
	@PostMapping("/consultarFiltrosCoberturaPE")
	public ResponseEntity<?> consultarFiltrosCoberturaPE(@RequestBody String params) {
		logger.info("##### InspectorCoberturaController - consultarFiltrosInspectorPE");
		ServiceResponseResult response = inspectorCoberturaService.consultarFiltrosCoberturaPE(params);
		if (response.getResult() instanceof Integer){
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
		
	}

    
	@PostMapping("/consultarIncidenciasCoberturaPE")
	public ResponseEntity<?> consultarIncidenciasCoberturaPE(@RequestBody String params) {
		logger.info("##### InspectorCoberturaController - consultarIncidenciasCoberturaPE");
		ServiceResponseResult response = inspectorCoberturaService.consultarIncidenciasCoberturaPE(params);
		if (response.getResult() instanceof Integer){
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
		
	}
	
	@PostMapping("/ligarIncidenciaPE")
	public ResponseEntity<?> ligarIncidenciaPE(@RequestBody String params) {
		logger.info("##### InspectorCoberturaController - ligarIncidenciaPE");
		ServiceResponseResult response = inspectorCoberturaService.ligarIncidencia(params);
		if (response.getResult() instanceof Integer){
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
		
	}
}
