package com.totalplay.ffm.plantainterna.controller;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.totalplay.ffm.plantainterna.service.DisponibilidadService;
import com.totalplay.ffm.utilerias.model.ServiceResponseResult;

@RestController
@RequestMapping("/req")
public class DisponibilidadController {
	
	private  final Logger logger = LogManager.getLogger(DisponibilidadController.class.getName());
	
	@Autowired
	private DisponibilidadService disponibilidadService;
	
	@PostMapping("/insertarDisponibilidad")
	public Object insertarDisponibilidad(@RequestBody String params) {
		logger.info("#### AGREGANDO DISPONIBILIDAD ###");
		ServiceResponseResult response = disponibilidadService.insertarDisponibilidad(params);
		return response;
	}
	
	@PostMapping("/consultarDisponibilidad")
	public Object consultarDisponibilidad(@RequestBody String params) {
		logger.info("#### CONSULTANDO DISPONIBILIDAD ***consultarDisponibilidad: " + params);
		ServiceResponseResult response = disponibilidadService.consultarDisponibilidad(params);
		return response;
	}
	
	@PostMapping("/actualizarDisponibilidad")
	public Object actualizarDisponibilidad(@RequestBody String params) {
		logger.info("#### ACTUALIZANDO DISPONIBILIDAD ###");
		ServiceResponseResult response = disponibilidadService.actualizarDisponibilidad(params);
		return response;
	}
	
	@GetMapping("/consultarIntervenciones")
	public Object consultarIntervenciones() {
		logger.info("#### CONSULTAR INTERVENCIONES ###");
		ServiceResponseResult response = disponibilidadService.consultarIntervenciones();
		return response;
	}
	
}

