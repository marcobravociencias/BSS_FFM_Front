package com.mx.totalplay.ffm.cloudweb.projectmanager.controller;

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
import com.mx.totalplay.ffm.cloudweb.projectmanager.service.OportunidadService;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;

@RestController
@RequestMapping("/req")
public class OportunidadController {
	
	private final Logger logger = LogManager.getLogger(OportunidadController.class.getName());
	private final OportunidadService oportunidadService;
	private ServiceResponseResult result;
	private Gson gson = new Gson();
	
	@Autowired
	public OportunidadController(OportunidadService oportunidadService) {
		this.oportunidadService = oportunidadService;
	}
	
	@PostMapping("/consultarOportunidades")
	public ResponseEntity<?> consultarOportunidades(@RequestBody String params) {
		logger.info("###### OportunidadController - consultarOportunidades");
		ServiceResponseResult response = oportunidadService.consultarOportunidades(params);
		if(response.getResult() instanceof Integer) {
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}
	
	@PostMapping("/consultarDetalleOportunidad")
	public ResponseEntity<?> consultarDetalleOportunidad(@RequestBody String params) {
		logger.info("###### OportunidadController - consultarOportunidades");
		ServiceResponseResult response = oportunidadService.consultarDetalleOportunidad(params);
		if(response.getResult() instanceof Integer) {
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}

}
