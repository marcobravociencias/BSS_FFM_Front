package com.mx.totalplay.ffm.cloudweb.plantainterna.controller;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mx.totalplay.ffm.cloudweb.plantainterna.service.OrdenesUniversalesService;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;

@RestController
@RequestMapping("/req")
public class OrdenesUniversalesController {
	private final Logger logger = LogManager.getLogger(ControlVehicularController.class.getName());
	private final OrdenesUniversalesService ordenesUniversalesService;
	
	@Autowired
	public OrdenesUniversalesController(OrdenesUniversalesService ordenesUniversalesService) {
		this.ordenesUniversalesService = ordenesUniversalesService;
	}
	
	@PostMapping("/consultarCuentaAsignadaGenerica")
	public ResponseEntity<?> consultarCuentaAsignadaGenerica(@RequestBody String params) {
		logger.info("##### CONSULTANDO consultarCuentaAsignadaGenerica");
		//ServiceResponseResult response = ordenesUniversalesService.consultarCuentaAsignadaGenerica(params);
		ServiceResponseResult response = null;
		/*
		if (response.getResult() instanceof Integer){
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		*/
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}
	
	@PostMapping("/getcatsdispacherintegrador")
	public ResponseEntity<?> getcatsdispacherintegrador(@RequestBody String params) {
		logger.info("##### CONSULTANDO getcatsdispacherintegrador");
		//ServiceResponseResult response = ordenesUniversalesService.getcatsdispacherintegrador(params);
		ServiceResponseResult response = null;
		/*
		if (response.getResult() instanceof Integer){
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		*/
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}
	
	@PostMapping("/getDisponibilidadServicioRest")
	public ResponseEntity<?> getDisponibilidadServicioRest(@RequestBody String params) {
		logger.info("##### CONSULTANDO getDisponibilidadServicioRest");
		//ServiceResponseResult response = ordenesUniversalesService.getDisponibilidadServicioRest(params);
		ServiceResponseResult response = null;
		/*
		if (response.getResult() instanceof Integer){
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		*/
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}
	
	@PostMapping("/creacionAsignacionGenerica")
	public ResponseEntity<?> creacionAsignacionGenerica(@RequestBody String params) {
		logger.info("##### CONSULTANDO creacionAsignacionGenerica");
		ServiceResponseResult response = ordenesUniversalesService.creacionAsignacionGenerica(params);
		if (response.getResult() instanceof Integer){
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}

}
