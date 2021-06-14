package com.totalplay.ffm.plantainterna.controller;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.totalplay.ffm.plantainterna.model.ParamsReporteCoorPi;
import com.totalplay.ffm.plantainterna.model.ParamsReporteOTPI;
import com.totalplay.ffm.plantainterna.model.ParamsReportesPI;
import com.totalplay.ffm.plantainterna.model.ParamsReporteOrdenesPI;
import com.totalplay.ffm.plantainterna.service.ReportesPIService;
import com.totalplay.ffm.utilerias.model.ServiceResponseResult;

@RestController
@RequestMapping("/req")
public class ReportesPIController {
	private final Logger logger = LogManager.getLogger(ReportesPIController.class.getName());
	
	@Autowired
	private ReportesPIService reportePIService;
	
	Gson gson = new Gson();

	@PostMapping("/consultarReporteTecnico")
	public Object consultarReporteTecnico(@RequestBody String params) {
		logger.info("*** Objeto: " + params);
		ParamsReportesPI paramsRep = new Gson().fromJson(params, ParamsReportesPI.class);
		ServiceResponseResult result = reportePIService.consultarReporteTecnico(paramsRep);
		return result;
	}
	
	@PostMapping("/consultarReporteTecnicoAux")
	public Object consultarReporteTecnicoAux(@RequestBody String params) {
		logger.info("*** Objeto: " + params);
		ParamsReportesPI paramsRep = new Gson().fromJson(params, ParamsReportesPI.class);
		ServiceResponseResult result = reportePIService.consultarReporteTecnicoAux(paramsRep);
		return result;
	}
	
	@PostMapping("/consultarReporteOTSPI")
	public Object consultarReporteOTSPI(@RequestBody String params) {
		logger.info("*** Objeto: " + params);
		ParamsReporteOTPI paramsRep = new Gson().fromJson(params, ParamsReporteOTPI.class);
		ServiceResponseResult result = reportePIService.consultarReporteOTSPT(paramsRep);
		return result;
	}
	
	@PostMapping("/consultarReporteCoordinador")
	public Object consultarReporteCoordinador(@RequestBody String params) {
		logger.info("*** Objeto: " + params);
		ParamsReporteCoorPi paramsRep = new Gson().fromJson(params, ParamsReporteCoorPi.class);
		ServiceResponseResult result = reportePIService.consultarReporteCoordinador(paramsRep);
		return result;
	}
	
	@PostMapping("/consultarOrdenesTerminadas")
	public Object consultarOrdenesTerminadas(@RequestBody String params) {
		logger.info("*** Objeto: " + params);
		ParamsReporteOrdenesPI paramsRep = new Gson().fromJson(params, ParamsReporteOrdenesPI.class);
		ServiceResponseResult result = reportePIService.consultarReporteOrdenesTerminadas(paramsRep);
		return result;
	}
	
	@PostMapping("/consultarOrdenesIntegrador")
	public Object consultarOrdenesIntegrador(@RequestBody String params) {
		logger.info("*** Objeto: " + params);
		ParamsReporteOrdenesPI paramsRep = new Gson().fromJson(params, ParamsReporteOrdenesPI.class);
		ServiceResponseResult result = reportePIService.consultarReporteOrdenesIntegrador(paramsRep);
		return result;
	}
}
