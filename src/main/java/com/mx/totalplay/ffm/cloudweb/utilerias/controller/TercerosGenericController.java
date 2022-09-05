package com.mx.totalplay.ffm.cloudweb.utilerias.controller;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;
import com.mx.totalplay.ffm.cloudweb.utilerias.service.TercerosGenericService;

@RestController
@RequestMapping("/req")
public class TercerosGenericController {
	private final Logger logger = LogManager.getLogger(TercerosGenericController.class.getName());
	private final TercerosGenericService tercerosGenericService;

	@Autowired
	public TercerosGenericController(TercerosGenericService tercerosGenericService) {
		this.tercerosGenericService = tercerosGenericService;
	}

	@GetMapping("/consultarEstatusTerceros")
	public ResponseEntity<?> consultarEstatusTerceros() {
		logger.info("##### CONSULTANDO consultarEstatusTerceros");
		ServiceResponseResult response = tercerosGenericService.consultarCatEstatus();
		if (response.getResult() instanceof Integer){
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}
	
	@GetMapping("/consultarEstadoTerceros")
	public ResponseEntity<?> consultarEstadoTerceros() {
		logger.info("##### CONSULTANDO consultarEstatusTerceros");
		ServiceResponseResult response = tercerosGenericService.consultarCatEstado();
		if (response.getResult() instanceof Integer){
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED); 
	}
	
	@GetMapping("/consultarTiempoTerceros")
	public ResponseEntity<?> consultarTiempoTerceros() { 
		logger.info("##### CONSULTANDO consultarEstatusTerceros");
		ServiceResponseResult response = tercerosGenericService.consultarCatTiempo();
		if (response.getResult() instanceof Integer){
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}
	
	@GetMapping("/consultarDistanciaTerceros")
	public ResponseEntity<?> consultarDistanciaTerceros() {
		logger.info("##### CONSULTANDO consultarEstatusTerceros");
		ServiceResponseResult response = tercerosGenericService.consultarCatDistancia();
		if (response.getResult() instanceof Integer){
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}
	
	@PostMapping("/guardarDictamenTerceros")
    public ResponseEntity<?> guardarDictamenTerceros(@RequestBody String params){
        logger.info("#### GUARDANDO guardarDictamenTerceros");
        ServiceResponseResult response = tercerosGenericService.guardarDictamenTerceros(params);
        if (response.getResult() instanceof Integer) {
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }
}
