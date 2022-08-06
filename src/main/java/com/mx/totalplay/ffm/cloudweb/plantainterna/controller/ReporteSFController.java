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
	
}
