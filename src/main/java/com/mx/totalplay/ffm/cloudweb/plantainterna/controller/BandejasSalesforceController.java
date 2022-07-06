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
	

	@PostMapping("/consultarFactibilidadEmprResiBandejasSF")
	public ResponseEntity<?> consultarFactibilidadEmprResiBandejasSF(@RequestBody String params) {
		logger.info("###### BandejasSalesforceController - consultarFactibilidadEmprResiBandejasSF");
		ServiceResponseResult response = bandejasSalesforceService.consultarFactibilidadEmprResiBandejasSF(params);
		if(response.getResult() instanceof Integer) {
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}
	
	@PostMapping("/consultarInfoSitioInstalacion")
	public ResponseEntity<?> consultarInfoSitioInstalacion(@RequestBody String params) {
		logger.info("###### BandejasSalesforceController - consultarInfoSitioInstalacion");
		ServiceResponseResult response = bandejasSalesforceService.consultarInfoSitioInstalacion(params);
		if(response.getResult() instanceof Integer) {
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}
	
	@PostMapping("/guardarContactoSalesforce")
	public ResponseEntity<?> guardarContactoSalesforce(@RequestBody String params) {
		logger.info("###### BandejasSalesforceController - guardarContactoSalesforce");
		ServiceResponseResult response = bandejasSalesforceService.guardarContactoSalesforce(params);
		if(response.getResult() instanceof Integer) {
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}
		
	@PostMapping("/actualizarFactibilidadSitio")
	public ResponseEntity<?> actualizarFactibilidadSitio(@RequestBody String params) {
	    logger.info("###### BandejasSalesforceController - actualizarFactibilidadSitio");
	    ServiceResponseResult response = bandejasSalesforceService.actualizarFactibilidadSitio(params);
	    if(response.getResult() instanceof Integer) {
	        return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
	    }
	    return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}
	
	@PostMapping("/agendarOrdenSalesforce")
	public ResponseEntity<?> agendarOrdenSalesforce(@RequestBody String params) {
		logger.info("###### BandejasSalesforceController - agendarOrdenSalesforce");
		ServiceResponseResult response = bandejasSalesforceService.agendarOrdenSalesforce(params);
		if(response.getResult() instanceof Integer) {
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}
	
	@PostMapping("/consultarDetalleEquiposBandejasSF")
	public ResponseEntity<?> consultarDetalleEquiposBandejasSF(@RequestBody String params) {
		logger.info("###### BandejasSalesforceController - consultarDetalleEquiposBandejasSF");
		ServiceResponseResult response = bandejasSalesforceService.consultarDetalleEquiposBandejasSF(params);
		if(response.getResult() instanceof Integer) {
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}
	

	@PostMapping("/consultarValidacionCSPBandejasSF")
	public ResponseEntity<?> consultarValidacionCSPBandejasSF(@RequestBody String params) {
		logger.info("###### BandejasSalesforceController - consultarValidacionCSPBandejasSF");
		ServiceResponseResult response = bandejasSalesforceService.consultarValidacionCSPBandejasSF(params);
		if(response.getResult() instanceof Integer) {
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}
	
	@PostMapping("/agendarPendienteBandejaSF")
	public ResponseEntity<?> agendarPendienteBandejaSF(@RequestBody String params) {
		logger.info("###### BandejasSalesforceController - agendarPendienteBandejaSF");
		ServiceResponseResult response = bandejasSalesforceService.agendarPendienteBandejaSF(params);
		if(response.getResult() instanceof Integer) {
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}
}
