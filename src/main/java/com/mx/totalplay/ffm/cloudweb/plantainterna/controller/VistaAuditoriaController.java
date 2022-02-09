package com.mx.totalplay.ffm.cloudweb.plantainterna.controller;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.mx.totalplay.ffm.cloudweb.plantainterna.service.VistaAuditoriaService;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;

@RestController
@RequestMapping("/req")
public class VistaAuditoriaController {

	private final Logger logger = LogManager.getLogger(VistaAuditoriaController.class.getName());
	private final VistaAuditoriaService vistaAuditoriaService;
	private Gson gson = new Gson();

	public VistaAuditoriaController(VistaAuditoriaService vistaAuditoriaService) {
		this.vistaAuditoriaService = vistaAuditoriaService;
	}

	@PostMapping("/consultaAuditoriasVistaAuditoria")
	public ResponseEntity<?> consultaAuditoriasVistaAuditoria(@RequestBody String params) {
		logger.info("#### consultaAuditoriasVistaAuditoria ### \n" + params);
		ServiceResponseResult response = vistaAuditoriaService.consultaAuditoriasVistaAuditoria(params);
		if (response.getResult() instanceof Integer) {
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}
	
	@PostMapping("/consultaDetalleAuditoriaTecnicoVistaAuditoria")
	public ResponseEntity<?> consultaDetalleAuditoriaTecnicoVistaAuditoria(@RequestBody String params) {
		logger.info("#### consultaDetalleAuditoriaTecnicoVistaAuditoria ### \n" + params);
		ServiceResponseResult response = vistaAuditoriaService.consultaDetalleAuditoriaTecnicoVistaAuditoria(params);
		if (response.getResult() instanceof Integer) {
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}
	
	@PostMapping("/consultaDetalleAuditoriaVistaAuditoria")
	public ResponseEntity<?> consultaDetalleAuditoriaVistaAuditoria(@RequestBody String params) {
		logger.info("#### consultaDetalleAuditoriaVistaAuditoria ### \n" + params);
		ServiceResponseResult response = vistaAuditoriaService.consultaDetalleAuditoriaVistaAuditoria(params);
		if (response.getResult() instanceof Integer) {
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}

}
