package com.mx.totalplay.ffm.cloudweb.plantainterna.controller;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.mx.totalplay.ffm.cloudweb.plantainterna.model.consultaOTPI.ParamConsultaOTPI;
import com.mx.totalplay.ffm.cloudweb.plantainterna.service.ReporteSFService;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.DataTableResponse;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;

@RestController
@RequestMapping("/req")
public class ReporteSFController {

	private final Logger logger = LogManager.getLogger(ReporteSFController.class.getName());

	private final ReporteSFService reporteSFService;
	private ServiceResponseResult result;
	private ParamConsultaOTPI paramsOT;
	private DataTableResponse dataTableResponse;
	private Gson gson = new Gson();

	@Autowired
	public ReporteSFController(ReporteSFService reporteSFService) {
		this.reporteSFService = reporteSFService;
	}
	
	@PostMapping("/consultarReporteBacklog")
	public ResponseEntity<?> consultarReporteBacklog(@RequestBody String params) {
		logger.info("#### Metodo consultarReporteBacklog: " + params);
		ServiceResponseResult response =reporteSFService.consultarReporteBacklog(params);
		if (response.getResult() instanceof Integer){
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}
	
	@PostMapping("/consultarReporteIngresoSoporte")
	public ResponseEntity<?> consultarReporteIngresoSoporte(@RequestBody String params) {
		logger.info("#### Metodo consultarReporteIngresoSoporte: " + params);
		ServiceResponseResult response =reporteSFService.consultaReporteIngresoSoporte(params);
		if (response.getResult() instanceof Integer){
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}
	
	@PostMapping("/consultarReporteIngresoResidencial")
	public ResponseEntity<?> consultarReporteIngresoResidencial(@RequestBody String params) {
		logger.info("#### Metodo consultarReporteIngresoResidencial: " + params);
		ServiceResponseResult response =reporteSFService.consultaReporteIngresoResidencial(params);
		if (response.getResult() instanceof Integer){
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}
	
	@PostMapping("/consultarReporteIngresoEmpresarial")
	public ResponseEntity<?> consultarReporteIngresoEmpresarial(@RequestBody String params) {
		logger.info("#### Metodo consultarReporteIngresoEmpresarial: " + params);
		ServiceResponseResult response =reporteSFService.consultaReporteIngresoEmpresarial(params);
		if (response.getResult() instanceof Integer){
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}
	
	@PostMapping("/consultarEmpresarialSinAgenda")
	public ResponseEntity<?> consultarReporteIngresoEmpresarialSinAgenda(@RequestBody String params) {
		logger.info("#### Metodo consultarReporteBacklog: " + params);
		ServiceResponseResult response =reporteSFService.consultaReporteIngresoEmpresarialSinAgenda(params);
		if (response.getResult() instanceof Integer){
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}
	
	@PostMapping("/consultarReporteCompletosSoporte")
	public ResponseEntity<?> consultarReporteCompletosSoporte(@RequestBody String params) {
		logger.info("#### Metodo consultarReporteCompletosSoporte: " + params);
		ServiceResponseResult response =reporteSFService.consultaReporteCompletosSoporte(params);
		if (response.getResult() instanceof Integer){
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}
	
	@PostMapping("/consultarReporteCompletosResidencial")
	public ResponseEntity<?> consultarReporteCompletosResidencial(@RequestBody String params) {
		logger.info("#### Metodo consultarReporteCompletosResidencial: " + params);
		ServiceResponseResult response =reporteSFService.consultaReporteCompletosResidencial(params);
		if (response.getResult() instanceof Integer){
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}
	
	@PostMapping("/consultarReporteCompletosEmpresarial")
	public ResponseEntity<?> consultarReporteCompletosEmpresarial(@RequestBody String params) {
		logger.info("#### Metodo consultarReporteCompletosEmpresarial: " + params);
		ServiceResponseResult response =reporteSFService.consultaReporteCompletosEmpresarial(params);
		if (response.getResult() instanceof Integer){
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}
	
	@PostMapping("/consultarReporteSitiosFibrados")
	public ResponseEntity<?> consultarReporteSitiosFibrados(@RequestBody String params) {
		logger.info("#### Metodo consultarReporteCompletosEmpresarial: " + params);
		ServiceResponseResult response =reporteSFService.consultarReporteSitiosFibrados(params);
		if (response.getResult() instanceof Integer){
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}
	
	@PostMapping("/consultarReporteRedesSociales")
	public ResponseEntity<?> consultarReporteRedesSociales(@RequestBody String params) {
		logger.info("#### Metodo consultarReporteCompletosEmpresarial: " + params);
		ServiceResponseResult response =reporteSFService.consultarReporteRedesSociales(params);
		if (response.getResult() instanceof Integer){
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}
	
	@PostMapping("/consultarReporteGenerados")
	public ResponseEntity<?> consultarReporteGenerados(@RequestBody String params) {
		logger.info("#### Metodo consultarReporteCompletosEmpresarial: " + params);
		ServiceResponseResult response =reporteSFService.consultarReporteGenerados(params);
		if (response.getResult() instanceof Integer){
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}
	
}
