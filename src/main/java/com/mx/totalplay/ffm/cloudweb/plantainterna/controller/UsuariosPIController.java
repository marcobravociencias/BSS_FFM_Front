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
import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;

@RestController
@RequestMapping("/req")
public class UsuariosPIController {
	private  final Logger logger = LogManager.getLogger(UsuariosPIController.class.getName());
	
	@PostMapping("/consultarCompanias")
	public ResponseEntity<?> consultarCompanias() {
		logger.info("##### CONSULTANDO consultarCompanias  ");
		//ServiceResponseResult response = ordenesUniversalesService.consultarCatalogoOrdenesUniversales(params);
		ServiceResponseResult response = null;
		
		/*
		if (response.getResult() instanceof Integer){
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		*/
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}
	
	@PostMapping("/consultarPuestos")
	public ResponseEntity<?> consultarPuestos() {
		logger.info("##### CONSULTANDO consultarPuestos  ");
		//ServiceResponseResult response = ordenesUniversalesService.consultarCatalogoOrdenesUniversales(params);
		ServiceResponseResult response = null;
		
		/*
		if (response.getResult() instanceof Integer){
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		*/
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}
	
	@PostMapping("/consultarRegionesEstructura")
	public ResponseEntity<?> consultarRegionesEstructura() {
		logger.info("##### CONSULTANDO consultarRegionesEstructura  ");
		//ServiceResponseResult response = ordenesUniversalesService.consultarCatalogoOrdenesUniversales(params);
		ServiceResponseResult response = null;
		
		/*
		if (response.getResult() instanceof Integer){
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		*/
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}
	
	@PostMapping("/consultarCiudadesEstructura")
	public ResponseEntity<?> consultarCiudadesEstructura() {
		logger.info("##### CONSULTANDO consultarCiudadesEstructura  ");
		//ServiceResponseResult response = ordenesUniversalesService.consultarCatalogoOrdenesUniversales(params);
		ServiceResponseResult response = null;
		
		/*
		if (response.getResult() instanceof Integer){
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		*/
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}
	
	@PostMapping("/consultarArbolesCiudades")
	public ResponseEntity<?> consultarArbolesCiudades() {
		logger.info("##### CONSULTANDO consultarArbolesCiudades  ");
		//ServiceResponseResult response = ordenesUniversalesService.consultarCatalogoOrdenesUniversales(params);
		ServiceResponseResult response = null;
		
		/*
		if (response.getResult() instanceof Integer){
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		*/
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}
	
	@PostMapping("/consultarClasificacionUsuario")
	public ResponseEntity<?> consultarClasificacionUsuario() {
		logger.info("##### CONSULTANDO consultarClasificacionUsuario  ");
		//ServiceResponseResult response = ordenesUniversalesService.consultarCatalogoOrdenesUniversales(params);
		ServiceResponseResult response = null;
		
		/*
		if (response.getResult() instanceof Integer){
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		*/
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}
	
	@PostMapping("/consultarOperariosPorCiudad")
	public ResponseEntity<?> consultarOperariosPorCiudad() {
		logger.info("##### CONSULTANDO consultarOperariosPorCiudad  ");
		//ServiceResponseResult response = ordenesUniversalesService.consultarCatalogoOrdenesUniversales(params);
		ServiceResponseResult response = null;
		
		/*
		if (response.getResult() instanceof Integer){
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		*/
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}
	
	@PostMapping("/consultarIntervencionesPorPropietarios")
	public ResponseEntity<?> consultarIntervencionesPorPropietarios() {
		logger.info("##### CONSULTANDO consultarIntervencionesPorPropietarios  ");
		//ServiceResponseResult response = ordenesUniversalesService.consultarCatalogoOrdenesUniversales(params);
		ServiceResponseResult response = null;
		
		/*
		if (response.getResult() instanceof Integer){
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		*/
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}
	
	@PostMapping("/consultarPrivilegios")
	public ResponseEntity<?> consultarPrivilegios() {
		logger.info("##### CONSULTANDO consultarPrivilegios  ");
		//ServiceResponseResult response = ordenesUniversalesService.consultarCatalogoOrdenesUniversales(params);
		ServiceResponseResult response = null;
		
		/*
		if (response.getResult() instanceof Integer){
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		*/
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}
	
	@PostMapping("/consultarUsuarios")
	public ResponseEntity<?> consultarUsuarios() {
		logger.info("##### CONSULTANDO consultarUsuarios  ");
		//ServiceResponseResult response = ordenesUniversalesService.consultarCatalogoOrdenesUniversales(params);
		ServiceResponseResult response = null;
		
		/*
		if (response.getResult() instanceof Integer){
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		*/
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}
	
}
