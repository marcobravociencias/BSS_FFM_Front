package com.mx.totalplay.ffm.cloudweb.plantainterna.service;

import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;
 
public interface ReporteSFService {
 
  public ServiceResponseResult consultarReporteBacklog(String params);
  
  public ServiceResponseResult consultaReporteIngresoSoporte(String params);
  
  public ServiceResponseResult consultaReporteIngresoResidencial(String params);
  
  public ServiceResponseResult consultaReporteIngresoEmpresarial(String params);
  
  public ServiceResponseResult consultaReporteIngresoEmpresarialSinAgenda(String params);
  
  public ServiceResponseResult consultaReporteCompletosSoporte(String params);
  
  public ServiceResponseResult consultaReporteCompletosResidencial(String params);
  
  public ServiceResponseResult consultaReporteCompletosEmpresarial(String params);
  
  public ServiceResponseResult consultarReporteSitiosFibrados(String params);
  
  public ServiceResponseResult consultarReporteRedesSociales(String params);
  
  public ServiceResponseResult consultarReporteGenerados(String params);

  
}