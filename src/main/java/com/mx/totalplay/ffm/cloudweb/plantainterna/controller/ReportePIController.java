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
    if (dataTableResponse.getResult() instanceof Integer){
      return new ResponseEntity<DataTableResponse>(dataTableResponse, HttpStatus.FORBIDDEN);
    }
    return new ResponseEntity<DataTableResponse>(dataTableResponse, HttpStatus.ACCEPTED);
  }
  
  @PostMapping("/consultaReporteTecnico")
  public ResponseEntity<DataTableResponse> consultaReporteTecnico(@ModelAttribute ParamConsultaOTPI params) {
    logger.info("*** Objeto: " + gson.toJson(params));
    dataTableResponse = reportePIService.consultaReporteTecnico(params);
    if (dataTableResponse.getResult() instanceof Integer){
      return new ResponseEntity<DataTableResponse>(dataTableResponse, HttpStatus.FORBIDDEN);
    }
    return new ResponseEntity<DataTableResponse>(dataTableResponse, HttpStatus.ACCEPTED);
  }
  
  @PostMapping("/consultaReporteDespacho")
  public ResponseEntity<DataTableResponse> consultaReporteDespacho(@ModelAttribute ParamConsultaOTPI params) {
    logger.info("*** Objeto: " + gson.toJson(params));
    dataTableResponse = reportePIService.consultaReporteDespacho(params);
    if (dataTableResponse.getResult() instanceof Integer){
      return new ResponseEntity<DataTableResponse>(dataTableResponse, HttpStatus.FORBIDDEN);
    }
    return new ResponseEntity<DataTableResponse>(dataTableResponse, HttpStatus.ACCEPTED);
  }
  
  @PostMapping("/consultaReporteAuxiliar")
  public ResponseEntity<DataTableResponse> consultaReporteAuxiliar(@ModelAttribute ParamConsultaOTPI params) {
    logger.info("*** Objeto: " + gson.toJson(params));
    dataTableResponse = reportePIService.consultaReporteAuxiliar(params);
    if (dataTableResponse.getResult() instanceof Integer){
      return new ResponseEntity<DataTableResponse>(dataTableResponse, HttpStatus.FORBIDDEN);
    }
    return new ResponseEntity<DataTableResponse>(dataTableResponse, HttpStatus.ACCEPTED);
  }
  
  
  }
