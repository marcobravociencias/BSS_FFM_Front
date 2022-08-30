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
  
}