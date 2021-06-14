package com.totalplay.ffm.plantaexterna.controller;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.totalplay.ffm.plantaexterna.service.DespachoPEService;
import com.totalplay.ffm.plantainterna.controller.DespachoPIController;
import com.totalplay.ffm.utilerias.model.ServiceResponseResult;


@RestController
@RequestMapping("/req")
public class DespachoPEController {
	
	private  final Logger logger = LogManager.getLogger(DespachoPIController.class.getName());
	
	@Autowired
	DespachoPEService despachoService;
	
	@PostMapping("/consultarFiltrosPE")
	public ServiceResponseResult consultarFiltrosPE(@RequestBody String params) {
		logger.info("##### DespachoPEController.class - method: consultarFiltrosPE() " + params);
		ServiceResponseResult response = despachoService.consultarFiltrosPE(params);;
		return response;
	}
	
	@PostMapping("/consultarOperariosPE")
	public ServiceResponseResult consultarOperariosPE(@RequestBody String params ) {
		logger.info("##### DespachoPEController.class - method: consultarOperariosPE() " + params);
		ServiceResponseResult response = despachoService.consultarOperariosPE(params);
		return response;
	}
	
	@PostMapping("/consultarOrdenesPendientesPE")
	public ServiceResponseResult consultarOrdenesPendientesPE(@RequestBody String params) {
		logger.info("##### DespachoPEController.class - method: consultarOrdenesPendientesPE() " + params);
		ServiceResponseResult response = despachoService.consultarOrdenesPendientesPE(params);
		return response;
	}
	
	@PostMapping("/consultarOrdenesAsignadasPE")
	public ServiceResponseResult consultarOrdenesAsignadasPE(@RequestBody String params) {
		logger.info("##### DespachoPEController.class - method: consultarOrdenesPendientesPE() " + params);
		ServiceResponseResult response = despachoService.consultarOrdenesAsignadasPE(params);
		return response;
	}
	
	@PostMapping("/consultarDetalleOTInspector")
	public ServiceResponseResult consultarDetalleOTInspector(@RequestBody String params) {
		logger.info("##### DespachoPEController.class - method: consultarDetalleOTInspector() " + params);
		ServiceResponseResult response = despachoService.consultarOrdenesAsignadasPE(params);
		return response;
	}
	
	@PostMapping("/consultarOtsTrabajadasInspector")
	public ServiceResponseResult consultarOtsTrabajadasInspector(@RequestBody String params) {
		logger.info("##### DespachoPEController.class - method: consultarOtsTrabajadasInspector() " + params);
		ServiceResponseResult response = despachoService.consultarOtsTrabajadasInspector(params);
		return response;
	}
	
}
