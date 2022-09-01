package com.mx.totalplay.ffm.cloudweb.plantainterna.utils;
 
import java.io.Serializable;
 
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
 
import lombok.Data;
 
@Data
@Component
public class ConstReporteSF implements Serializable{
  private static final long serialVersionUID = 1L;
  
  @Value("${consultaReporteBacklog}")
  private String consultaReporteBacklog;
  
  @Value("${consultaReporteIngresoSoporte}")
  private String consultaReporteIngresoSoporte;
  
  @Value("${consultaReporteIngresoSoporteExporte}")
  private String consultaReporteIngresoSoporteExporte;
  
  
  @Value("${consultaReporteIngresoResidencial}")
  private String consultaReporteIngresoResidencial;
  
  @Value("${consultaReporteIngresoEmpresarial}")
  private String consultaReporteIngresoEmpresarial;
  
  @Value("${consultaReporteIngresoEmpresarialSinAgenda}")
  private String consultaReporteIngresoEmpresarialSinAgenda;
  
  @Value("${consultaReporteCompletosSoporte}")
  private String consultaReporteCompletosSoporte;
  
  @Value("${consultaReporteCompletosResidencial}")
  private String consultaReporteCompletosResidencial;
  
  @Value("${consultaReporteCompletosEmpresarial}")
  private String consultaReporteCompletosEmpresarial;
  
  @Value("${consultaReporteSitiosFibrados}")
  private String consultaReporteSitiosFibrados;
  
  @Value("${exportaReporteSitiosFibrados}")
  private String exportaReporteSitiosFibrados;
  
  @Value("${consultaReporteRedesSociales}")
  private String consultaReporteRedesSociales;
  
  @Value("${exportaReporteRedesSociales}")
  private String exportaReporteRedesSociales;
  
  @Value("${consultaReporteGenerados}")
  private String consultaReporteGenerados;
  
  @Value("${exportaReporteGenerados}")
  private String exportaReporteGenerados;
  
  @Value("${consultaReportePlanningAgenda}")
  private String consultaReportePlanningAgenda;
  
  @Value("${exportaReportePlanningAgenda}")
  private String exportaReportePlanningAgenda;
  
  @Value("${consultaReportePlanningAddon}")
  private String consultaReportePlanningAddon;
  
  @Value("${exportaReportePlanningAddon}")
  private String exportaReportePlanningAddon;
  
  @Value("${consultaReporteCompletosProactivos}")
  private String consultaReporteCompletosProactivos;
  
  @Value("${exportaReporteCompletosProactivos}")
  private String exportaReporteCompletosProactivos;
  
  @Value("${consultaReporteCompletosCambioDomicilio}")
  private String consultaReporteCompletosCambioDomicilio;
  
  @Value("${exportaReporteCompletosCambioDomicilio}")
  private String exportaReporteCompletosCambioDomicilio;
  
  @Value("${consultaReporteCompletosSoporteEmpresarial}")
  private String consultaReporteCompletosSoporteEmpresarial;
  
  @Value("${exportaReporteCompletosSoporteEmpresarial}")
  private String exportaReporteCompletosSoporteEmpresarial;
  
  @Value("${consultaReporteBacklogProactivos}")
  private String consultaReporteBacklogProactivos;
  
  @Value("${exportaReporteBacklogProactivos}")
  private String exportaReporteBacklogProactivos;
  
}