package com.mx.totalplay.ffm.cloudweb.plantainterna.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.google.gson.Gson;
import com.mx.totalplay.ffm.cloudweb.plantainterna.model.consultaOTPI.ParamConsultaOTPI;
import com.mx.totalplay.ffm.cloudweb.plantainterna.service.TraspasoService;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.DataTableResponse;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

@RestController
@RequestMapping("/req")
public class TraspasoController {

	private final Logger logger = LogManager.getLogger(TraspasoController.class.getName());
	private final TraspasoService traspasoService;
	private ParamConsultaOTPI paramsOT;
	private ServiceResponseResult result;
	private DataTableResponse dataTableResponse;
	private Gson gson = new Gson();

	@Autowired
	public TraspasoController(TraspasoService traspasoService) {
		this.traspasoService = traspasoService;
	}

	@PostMapping("/consultaTraspasoOt")
	public ResponseEntity<DataTableResponse> consultaOT(@ModelAttribute ParamConsultaOTPI params) {
		logger.info("*** Objeto: " + gson.toJson(params));
		dataTableResponse = traspasoService.consultaTraspasosOt(params);
		if (dataTableResponse.getResult() instanceof Integer){
			return new ResponseEntity<DataTableResponse>(dataTableResponse, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<DataTableResponse>(dataTableResponse, HttpStatus.ACCEPTED);
	}

	
	@PostMapping("/consultaInformacionDetalleTraspaso")
	public ResponseEntity<?> consultaInformacionDetalleOt(@RequestBody String params) {
		logger.info("*** TraspasoController.class *** Metodo consultaInformacionDetalleTraspaso *** Objecto: " + params);
		result = traspasoService.consultaInformacionDetalleTraspaso(params);
		if (result.getResult() instanceof Integer){
			return new ResponseEntity<>(result, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(result, HttpStatus.ACCEPTED);
	}

	@PostMapping("/consultaEvidenciaTraspaso")
	public ResponseEntity<?> consultaEvidencia(@RequestBody String params){
		logger.info("#### CONSULTANDO consultaEvidenciaTraspaso: " + params);
		ServiceResponseResult response = traspasoService.consultaEvidenciaTraspaso(params);
		if (response.getResult() instanceof Integer) {
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}
	
	@PostMapping("/consultaTraspasos")
	public ResponseEntity<DataTableResponse> consultaTraspasos(@ModelAttribute ParamConsultaOTPI params) {
		logger.info("*** Objeto: " + gson.toJson(params));
		dataTableResponse = traspasoService.consultaTraspasos(params);
		if (dataTableResponse.getResult() instanceof Integer){
			return new ResponseEntity<DataTableResponse>(dataTableResponse, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<DataTableResponse>(dataTableResponse, HttpStatus.ACCEPTED);
	}
	
	@PostMapping("/consultaReporteOts")
	public ResponseEntity<?> consultaReporteOts(@RequestBody String params) {
		logger.info("*** TraspasoController.class *** Metodo consultaReporteConsultaOt *** Objecto: " + params);
		result = traspasoService.consultarReporteOts(params);
		if (result.getResult() instanceof Integer){
			return new ResponseEntity<>(result, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(result, HttpStatus.ACCEPTED);
	}
	
	@PostMapping("/consultaReporteTraspasos")
	public ResponseEntity<?> consultaReporteTraspasos(@RequestBody String params) {
		logger.info("*** TraspasoController.class *** Metodo consultaReporteTraspasos *** Objecto: " + params);
		result = traspasoService.consultarReporteTraspasos(params);
		if (result.getResult() instanceof Integer){
			return new ResponseEntity<>(result, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(result, HttpStatus.ACCEPTED);
	}
	
	
	@PostMapping("/consultaFactibilidadResidencial")
	public ResponseEntity<?> consultaFactibilidadTraspasos(@RequestBody String params) {
		logger.info("*** TraspasoController.class *** Metodo consultaFactibilidadResidencial *** Objecto: " + params);
		result = traspasoService.consultarFactibilidadRes(params);
		if (result.getResult() instanceof Integer){
			return new ResponseEntity<>(result, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(result, HttpStatus.ACCEPTED);
	}
	
	@PostMapping("/consultaFactibilidadEmpresarial")
	public ResponseEntity<?> consultaFactibilidadEmpresarial(@RequestBody String params) {
		logger.info("*** TraspasoController.class *** Metodo consultaFactibilidadEmpresarial *** Objecto: " + params);
		result = traspasoService.consultarFactibilidadEmp(params);
		if (result.getResult() instanceof Integer){
			return new ResponseEntity<>(result, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(result, HttpStatus.ACCEPTED);
	}
	
	@PostMapping("/agendarTraspasoOt")
	public ResponseEntity<?> agendarTraspasoOt(@RequestBody String params) {
		logger.info("*** TraspasoController.class *** Metodo agendarTraspasoOt *** Objecto: " + params);
		result = traspasoService.agendarTraspasoOt(params);
		if (result.getResult() instanceof Integer){
			return new ResponseEntity<>(result, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(result, HttpStatus.ACCEPTED);
	}
	
	@PostMapping("/consultarMotivosTraspasos")
	public ResponseEntity<?> consultarMotivos() {
		logger.info("*** TraspasoController.class *** Metodo consultarMotivos ***");
		result = traspasoService.consultarMotivos();
		if (result.getResult() instanceof Integer){
			return new ResponseEntity<>(result, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(result, HttpStatus.ACCEPTED);
	}
	
	@PostMapping("/consultaCrmDisponibilidad")
	public ResponseEntity<?> consultaCrmDisponibilidad(@RequestBody String params) {
		logger.info("*** Objeto: " + gson.toJson(params));
		result = traspasoService.consultarCrmDisponibilidad(params);
		if (result.getResult() instanceof Integer){
			return new ResponseEntity<>(result, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(result, HttpStatus.ACCEPTED);
	}
}
