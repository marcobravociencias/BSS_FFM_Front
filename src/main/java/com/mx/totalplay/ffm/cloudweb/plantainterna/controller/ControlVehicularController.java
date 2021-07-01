package com.mx.totalplay.ffm.cloudweb.plantainterna.controller;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mx.totalplay.ffm.cloudweb.plantainterna.service.ControlVehicularService;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;

@RestController
@RequestMapping("/req")
public class ControlVehicularController {
	private final Logger logger = LogManager.getLogger(ControlVehicularController.class.getName());
	
	@Autowired
	private ControlVehicularService controlVehicularService;
	
	@GetMapping("/consultarMarcas")
	public ServiceResponseResult consultarMarcas() {
		logger.info("##### CONSULTANDO consultarMarcas");
		ServiceResponseResult response = controlVehicularService.consultarMarcas();
		return response;
	}

	@GetMapping("/consultarColores")
	public ServiceResponseResult consultarColores() {
		logger.info("##### CONSULTANDO consultarColores");
		ServiceResponseResult response = controlVehicularService.consultarColores();
		return response;
	}

	@GetMapping("/consultarSeguros")
	public ServiceResponseResult consultarSeguros() {
		logger.info("##### CONSULTANDO consultarSeguros");
		ServiceResponseResult response = controlVehicularService.consultarSeguros();
		return response;
	}

	@GetMapping("/consultarEstatus")
	public ServiceResponseResult consultarEstatus() {
		logger.info("##### CONSULTANDO consultarEstatus");
		ServiceResponseResult response = controlVehicularService.consultarEstatus();
		return response;
	}
	 
}
