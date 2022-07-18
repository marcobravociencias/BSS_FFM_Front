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
import com.mx.totalplay.ffm.cloudweb.plantainterna.service.ReportePIService;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.DataTableResponse;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;

@RestController
@RequestMapping("/req")
public class ReportePIController {

	private final Logger logger = LogManager.getLogger(ReportePIController.class.getName());

	private final ReportePIService reportePIService;
	private ServiceResponseResult result;
	private ParamConsultaOTPI paramsOT;
	private DataTableResponse dataTableResponse;
	private Gson gson = new Gson();

	@Autowired
	public ReportePIController(ReportePIService reportePIService) {
		this.reportePIService = reportePIService;
	}

	@PostMapping("/consultaReporteOrdenes")
	public ResponseEntity<DataTableResponse> consultaReporteOrdenes(@ModelAttribute ParamConsultaOTPI params) {
		logger.info("*** Objeto: " + gson.toJson(params));
		dataTableResponse = reportePIService.consultaReporteOrdenes(params);
		if (dataTableResponse.getResult() instanceof Integer) {
			return new ResponseEntity<DataTableResponse>(dataTableResponse, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<DataTableResponse>(dataTableResponse, HttpStatus.ACCEPTED);
	}

	@PostMapping("/consultaReporteTecnico")
	public ResponseEntity<DataTableResponse> consultaReporteTecnico(@ModelAttribute ParamConsultaOTPI params) {
		logger.info("*** Objeto: " + gson.toJson(params));
		dataTableResponse = reportePIService.consultaReporteTecnico(params);
		if (dataTableResponse.getResult() instanceof Integer) {
			return new ResponseEntity<DataTableResponse>(dataTableResponse, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<DataTableResponse>(dataTableResponse, HttpStatus.ACCEPTED);
	}

	@PostMapping("/consultaReporteDespacho")
	public ResponseEntity<DataTableResponse> consultaReporteDespacho(@ModelAttribute ParamConsultaOTPI params) {
		logger.info("*** Objeto: " + gson.toJson(params));
		dataTableResponse = reportePIService.consultaReporteDespacho(params);
		if (dataTableResponse.getResult() instanceof Integer) {
			return new ResponseEntity<DataTableResponse>(dataTableResponse, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<DataTableResponse>(dataTableResponse, HttpStatus.ACCEPTED);
	}

	@PostMapping("/consultaReporteAuxiliar")
	public ResponseEntity<DataTableResponse> consultaReporteAuxiliar(@ModelAttribute ParamConsultaOTPI params) {
		logger.info("*** Objeto: " + gson.toJson(params));
		dataTableResponse = reportePIService.consultaReporteAuxiliar(params);
		if (dataTableResponse.getResult() instanceof Integer) {
			return new ResponseEntity<DataTableResponse>(dataTableResponse, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<DataTableResponse>(dataTableResponse, HttpStatus.ACCEPTED);
	}

	@PostMapping("/consultarReporteInspector")
	public ResponseEntity<DataTableResponse> consultaReporteInspector(@ModelAttribute ParamConsultaOTPI params) {
		logger.info("*** Objeto: " + gson.toJson(params));
		dataTableResponse = reportePIService.consultaReporteInspector(params);
		if (dataTableResponse.getResult() instanceof Integer) {
			return new ResponseEntity<DataTableResponse>(dataTableResponse, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<DataTableResponse>(dataTableResponse, HttpStatus.ACCEPTED);
	}
	
	@PostMapping("/consultarReporteSeguimientoDiario")
	public ResponseEntity<DataTableResponse> consultaReporteSeguimientoDiario(@ModelAttribute ParamConsultaOTPI params) {
		logger.info("*** Objeto: " + gson.toJson(params));
		dataTableResponse = reportePIService.consultarReporteDiario(params);
		if (dataTableResponse.getResult() instanceof Integer) {
			return new ResponseEntity<DataTableResponse>(dataTableResponse, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<DataTableResponse>(dataTableResponse, HttpStatus.ACCEPTED);
	}
	
	@PostMapping("/consultarReporteCierreDiario")
	public ResponseEntity<DataTableResponse> consultaReporteCierreDiario(@ModelAttribute ParamConsultaOTPI params) {
		logger.info("*** Objeto: " + gson.toJson(params));
		dataTableResponse = reportePIService.consultarReporteCierreDiario(params);
		if (dataTableResponse.getResult() instanceof Integer) {
			return new ResponseEntity<DataTableResponse>(dataTableResponse, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<DataTableResponse>(dataTableResponse, HttpStatus.ACCEPTED);
	}
	
	@PostMapping("/consultarReporteAsignadasCompensacion")
	public ResponseEntity<DataTableResponse> consultaReporteAsignadasCompensacion(@ModelAttribute ParamConsultaOTPI params) {
		logger.info("*** Objeto: " + gson.toJson(params));
		dataTableResponse = reportePIService.consultarReporteAsignadasCompensacion(params);
		if (dataTableResponse.getResult() instanceof Integer) {
			return new ResponseEntity<DataTableResponse>(dataTableResponse, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<DataTableResponse>(dataTableResponse, HttpStatus.ACCEPTED);
	}
	
    @PostMapping("/consultaRepoCierreDiarioEx")
    public ResponseEntity<?> consultaRepoCierreDiarioEx(@RequestBody String params){
        logger.info("#### CONSULTANDO consultaRepoDiarioEx: " + params);
        ServiceResponseResult response = reportePIService.consultarReporteCierreDiarioEx(params);
        if (response.getResult() instanceof Integer) {
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }

    
    @PostMapping("/consultaRepoAsignadasEx")
    public ResponseEntity<?> consultaRepoAsignadasEx(@RequestBody String params){
        logger.info("#### CONSULTANDO consultaRepoDiarioEx: " + params);
        ServiceResponseResult response = reportePIService.consultarReporteAsignadasEx(params);
        if (response.getResult() instanceof Integer) {
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }

    @PostMapping("/consultarTecnicosTiposOrdenes")
    public ResponseEntity<?> consultarTecnicosTiposOrdenes(@RequestBody String params) {
        ServiceResponseResult result = reportePIService.consultarTecnicosTiposOrdenes(params);
        if (result.getResult() instanceof Integer){
            return new ResponseEntity<>(result, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(result, HttpStatus.ACCEPTED);
    }
    
    @PostMapping("/generarReporteTecnicosTiposOrdenes")
    public ResponseEntity<?> generarReporteTecnicosTiposOrdenes(@RequestBody String params) {
    	ServiceResponseResult result = reportePIService.generarReporteTecnicosTiposOrdenes(params);
        if (result.getResult() instanceof Integer){
            return new ResponseEntity<>(result, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(result, HttpStatus.ACCEPTED);
    }

}
