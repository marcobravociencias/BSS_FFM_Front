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

import com.google.gson.Gson;
import com.mx.totalplay.ffm.cloudweb.plantainterna.service.BandejasSalesforceService;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;

@RestController
@RequestMapping("/req")
public class BandejasSalesforceController {
	
	private final Logger logger = LogManager.getLogger(BandejasSalesforceController.class.getName());
	private final BandejasSalesforceService bandejasSalesforceService;
	private ServiceResponseResult result;
	private Gson gson = new Gson();
	
	@Autowired
	public BandejasSalesforceController (BandejasSalesforceService bandejasSalesforceService) {
		this.bandejasSalesforceService = bandejasSalesforceService;
	}
	
	@PostMapping("/consultarPendientesActivarBandejasSF")
	public ResponseEntity<?> consultarPendientesActivarBandejasSF(@RequestBody String params) {
		logger.info("###### BandejasSalesforceController - consultarPendientesActivarBandejasSF");
		ServiceResponseResult response = bandejasSalesforceService.consultarPendientesActivarBandejasSF(params);
		if(response.getResult() instanceof Integer) {
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}
	
	@PostMapping("/consultarPendientesAgendarBandejasSF")
	public ResponseEntity<?> consultarPendientesAgendarBandejasSF(@RequestBody String params) {
		logger.info("###### BandejasSalesforceController - consultarPendientesAgendarBandejasSF");
		ServiceResponseResult response = bandejasSalesforceService.consultarPendientesAgendarBandejasSF(params);
		if(response.getResult() instanceof Integer) {
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}
	
	@PostMapping("/consultarRescataventasBandejasSF")
	public ResponseEntity<?> consultarRescataventasBandejasSF(@RequestBody String params) {
		logger.info("###### BandejasSalesforceController - consultarRescataventasBandejasSF");
		ServiceResponseResult response = bandejasSalesforceService.consultarRescataventasBandejasSF(params);
		if(response.getResult() instanceof Integer) {
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}
	

	@PostMapping("/consultarFactibilidadEmpresarialBandejasSF")
	public ResponseEntity<?> consultarFactibilidadEmpresarialBandejasSF(@RequestBody String params) {
		logger.info("###### BandejasSalesforceController - consultarFactibilidadEmpresarialBandejasSF");
		ServiceResponseResult response = bandejasSalesforceService.consultarFactibilidadEmpresarialBandejasSF(params);
		if(response.getResult() instanceof Integer) {
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}

}
