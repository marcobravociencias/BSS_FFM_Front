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
  
  public ServiceResponseResult consultarReporteFactibilidadCerrados(String params);
  
  public ServiceResponseResult consultarReporteFactibilidadCancelados(String params);
  
  public ServiceResponseResult consultarReportePlanningAgendas(String params);
  
  public ServiceResponseResult consultarReportePlanningAddon(String params);
  
  public ServiceResponseResult consultarReporteCompletosProactivo(String params);
  
  public ServiceResponseResult consultarReporteCompletosDomicilio(String params);
  
  public ServiceResponseResult consultarReporteCompletosSoporteEmpresarial(String params);
  
  public ServiceResponseResult consultarReporteBackLogProactivo(String params);
  
  public ServiceResponseResult consultarReporteIngresoProactivo(String params);
  
  public ServiceResponseResult consultarReporteRecoleccionGeneradas(String params);
  
  public ServiceResponseResult consultarReporteRecoleccionCerradas(String params);
  
  public ServiceResponseResult consultarReporteRecoleccionAgendadas(String params);
  
  public ServiceResponseResult consultarReporteBackLogFactibilidades(String params);
  
  public ServiceResponseResult consultarReporteBackLogVoluntarias(String params);
  
  public ServiceResponseResult consultarReporteVentas(String params);
  
  public ServiceResponseResult consultarReportePlanningNuevoAddon(String params);
  
  public ServiceResponseResult consultarReportePlanningCompletosOrdenes(String params);
  
  public ServiceResponseResult consultarReportePlanningCompletosAddon(String params);
  
  public ServiceResponseResult consultarReporteVentasInstalacion(String params);

  
}