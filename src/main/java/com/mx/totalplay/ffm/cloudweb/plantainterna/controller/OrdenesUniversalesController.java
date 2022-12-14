package com.mx.totalplay.ffm.cloudweb.plantainterna.controller;

import java.util.ArrayList;
import java.util.List;

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
	private final Logger logger = LogManager.getLogger(OrdenesUniversalesController.class.getName());
	private final OrdenesUniversalesService ordenesUniversalesService;
	
	@Autowired
	public OrdenesUniversalesController(OrdenesUniversalesService ordenesUniversalesService) {
		this.ordenesUniversalesService = ordenesUniversalesService;
	}
	
	@PostMapping("/consultarCuentaAsignadaGenerica")
	public ResponseEntity<?> consultarCuentaAsignadaGenerica(@RequestBody String params) {
		logger.info("##### CONSULTANDO consultarCuentaAsignadaGenerica");
//		ServiceResponseResult response = ordenesUniversalesService.consultarCuentaAsignadaGenerica(params);
		ServiceResponseResult response = null;
//		if (response.getResult() instanceof Integer){
//			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
//		}
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}
	
	@PostMapping("/consultarCatalogoUniversales")
	public ResponseEntity<?> consultarCatalogoUniversales() {
		    logger.info("##### CONSULTANDO CATALOGO UNIVERSALES");
	        ServiceResponseResult response = ordenesUniversalesService.consultarCatalogosOrdenesUniversales();
	        if (response.getResult() instanceof Integer) {
	            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
	        }
	        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}
	
	
	@PostMapping("/consultarPerfilesPorUsuario")
	public ResponseEntity<?> consultarPerfilesPorUsuarioContr() {
		    logger.info("##### CONSULTANDO CATALOGO PERFILES USUARIO");
	        ServiceResponseResult response = ordenesUniversalesService.consultarPerfilesPorUsuarioServ();
	        if (response.getResult() instanceof Integer) {
	            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
	        }
	        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}
	
	@PostMapping("/consultarPerfilesGeneral")
	public ResponseEntity<?> consultarPerfilesGeneralContr() {
		    logger.info("##### CONSULTANDO CATALOGO PERFILES GENERAL");
	        ServiceResponseResult response = ordenesUniversalesService.consultarPerfilesGeneralServ();
	        if (response.getResult() instanceof Integer) {
	            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
	        }
	        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}

	@PostMapping("/consultaPaqueteOrdenesUniversales")
	public ResponseEntity<?> consultaPaqueteOrdenesUniversales() {
		logger.info("##### CONSULTANDO CATALOGO DE PAQUETES ");
		ServiceResponseResult response = ordenesUniversalesService.consultaPaqueteOrdenesUniversales();
		if (response.getResult() instanceof Integer) {
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}

	@PostMapping("/consultaCanalVentas")
	public ResponseEntity<?> consultaCanalVentas() {
		logger.info("##### CONSULTANDO CATALOGO DE CANAL DE VENTA ");
		ServiceResponseResult response = ordenesUniversalesService.consultaCanalVentas();
		if (response.getResult() instanceof Integer) {
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}
	
	@PostMapping("/consultarInfoCliente")
	public ResponseEntity<?> consultarInfoCliente(@RequestBody String params) {
		logger.info("##### CONSULTANDO INFO DEL CLIENTE DE LA CUENTA-FACTURA ");
		ServiceResponseResult response = ordenesUniversalesService.consultarInfoCliente(params);
		if (response.getResult() instanceof Integer) {
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}
}
