package com.mx.totalplay.ffm.cloudweb.plantainterna.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.google.gson.Gson;
import com.mx.totalplay.ffm.cloudweb.plantainterna.model.consultaOTPI.ParamConsultaOTPI;
import com.mx.totalplay.ffm.cloudweb.plantainterna.service.ConsultaOTService;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.DataTableResponse;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

@RestController
@RequestMapping("/req")
public class ConsultaOTController {

	private final Logger logger = LogManager.getLogger(ConsultaOTController.class.getName());
	private final ConsultaOTService consultaOTService;
	private ParamConsultaOTPI paramsOT;
	private ServiceResponseResult result;
	private DataTableResponse dataTableResponse;
	private Gson gson = new Gson();

	@Autowired
	public ConsultaOTController(ConsultaOTService consultaOTService) {
		this.consultaOTService = consultaOTService;
	}

	@PostMapping("/consultaOT")
	public ResponseEntity<DataTableResponse> consultaOT(@ModelAttribute ParamConsultaOTPI params) {
		logger.info("*** Objeto: " + gson.toJson(params));
		dataTableResponse = consultaOTService.consultaOT(params);
		if (dataTableResponse.getResult() instanceof Integer){
			return new ResponseEntity<DataTableResponse>(dataTableResponse, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<DataTableResponse>(dataTableResponse, HttpStatus.ACCEPTED);
	}
	
	@PostMapping("/consultaInformacionDetalleOt")
	public ResponseEntity<?> consultaInformacionDetalleOt(@RequestBody String params) {
		logger.info("*** ConsultaOTController.class *** Metodo consultaInformacionDetalleOt *** Objecto: " + params);
		result = consultaOTService.consultaInformacionDetalleOt(params);
		if (result.getResult() instanceof Integer){
			return new ResponseEntity<>(result, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(result, HttpStatus.ACCEPTED);
	}
	
	@PostMapping("/consultaMaterialesOts")
	public ResponseEntity<?> consultaMaterialesOts(@RequestBody String params) {
		logger.info("*** ConsultaOTController.class *** Metodo consultaMaterialesOts *** Objecto: " + params);
		result = consultaOTService.consultaMaterialesOts(params);
		if (result.getResult() instanceof Integer){
			return new ResponseEntity<>(result, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(result, HttpStatus.ACCEPTED);
	}
	
	@PostMapping("/consultaInfoTrayectoria")
	public ResponseEntity<?> consultaInfoTrayectoria(@RequestBody String params) {
		logger.info("*** ConsultaOTController.class *** Metodo consultaInfoTrayectoria *** Objecto: " + params);
		result = consultaOTService.consultaInfoTrayectoria(params);
		if (result.getResult() instanceof Integer){
			return new ResponseEntity<>(result, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(result, HttpStatus.ACCEPTED);
	}
	
	@PostMapping("/consultaReporteConsultaOt")
	public ResponseEntity<?> consultaReporteConsultaOt(@RequestBody String params) {
		logger.info("*** ConsultaOTController.class *** Metodo consultaReporteConsultaOt *** Objecto: " + params);
		result = consultaOTService.consultaReporteConsultaOt(params);
		if (result.getResult() instanceof Integer){
			return new ResponseEntity<>(result, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(result, HttpStatus.ACCEPTED);
	}

	@PostMapping("/consultaDetallePostVenta")
	public ResponseEntity<?> consultaDetallePostVenta(@RequestBody String params){
		logger.info("#### CONSULTANDO consultaDetallePostVenta: " + params);
		ServiceResponseResult response = consultaOTService.consultaDetallePostVenta(params);
		if (response.getResult() instanceof Integer) {
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}

	@PostMapping("/consultaPagos")
	public ResponseEntity<?> consultaPagos(@RequestBody String params){
		logger.info("#### CONSULTANDO consultaPagos: " + params);
		ServiceResponseResult response = consultaOTService.consultaPagos(params);
		if (response.getResult() instanceof Integer) {
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}

	@PostMapping("/consultaEvidencia")
	public ResponseEntity<?> consultaEvidencia(@RequestBody String params){
		logger.info("#### CONSULTANDO consultaEvidencia: " + params);
		ServiceResponseResult response = consultaOTService.consultaEvidencia(params);
		if (response.getResult() instanceof Integer) {
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}

	@PostMapping("/consultaDispositivos")
	public ResponseEntity<?> consultaDispositivos(@RequestBody String params){
		logger.info("#### CONSULTANDO consultaDispositivos: " + params);
		ServiceResponseResult response = consultaOTService.consultaDispositivos(params);
		if (response.getResult() instanceof Integer) {
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}

	@PostMapping("/consultaRecoleccionConsultaOt")
	public ResponseEntity<?> consultaRecoleccionConsultaOt(@RequestBody String params){
		logger.info("#### CONSULTANDO consultaRecoleccionConsultaOt: " + params);
		ServiceResponseResult response = consultaOTService.consultaRecoleccionConsultaOt(params);
		if (response.getResult() instanceof Integer) {
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}
	
	@PostMapping("/consultaOrdenesPlantaExternaOt")
	public ResponseEntity<?> consultaOrdenesPlantaExternaOt(@RequestBody String params){
		logger.info("#### CONSULTANDO consultaOrdenesPlantaExternaOt: " + params);
		ServiceResponseResult response = consultaOTService.consultaOrdenesPlantaExternaOt(params);
		if (response.getResult() instanceof Integer) {
			return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}
}
