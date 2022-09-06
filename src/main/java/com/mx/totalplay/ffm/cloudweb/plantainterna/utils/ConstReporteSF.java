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
  
  @Value("${consultaReporteFactibilidadCerrados}")
  private String consultaReporteFactibilidadCerrados;
  
  @Value("${exportaReporteFactibilidadCerrados}")
  private String exportaReporteFactibilidadCerrados;
  
  @Value("${consultaReporteFactibilidadCancelados}")
  private String consultaReporteFactibilidadCancelados;
  
  @Value("${exportaReporteFactibilidadCancelados}")
  private String exportaReporteFactibilidadCancelados;
  
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
  
  @Value("${consultaReporteIngresoProactivo}")
  private String consultaReporteIngresoProactivo;
  
  @Value("${exportaReporteIngresoProactivo}")
  private String exportaReporteIngresoProactivo;
  
  @Value("${consultaReporteRecoleccionGeneradas}")
  private String consultaReporteRecoleccionGeneradas;
  
  @Value("${exportaReporteRecoleccionGeneradas}")
  private String exportaReporteRecoleccionGeneradas;
  
  @Value("${consultaReporteRecoleccionCerradas}")
  private String consultaReporteRecoleccionCerradas;
  
  @Value("${exportaReporteRecoleccionCerradas}")
  private String exportaReporteRecoleccionCerradas;
  
  @Value("${consultaReporteRecoleccionAgendadas}")
  private String consultaReporteRecoleccionAgendadas;
  
  @Value("${exportaReporteRecoleccionAgendadas}")
  private String exportaReporteRecoleccionAgendadas;
  
  @Value("${consultaReporteBackLogFactibilidades}")
  private String consultaReporteBackLogFactibilidades;
  
  @Value("${exportaReporteBackLogFactibilidades}")
  private String exportaReporteBackLogFactibilidades;
  
  @Value("${consultaReporteBackLogVoluntarias}")
  private String consultaReporteBackLogVoluntarias;
  
  @Value("${exportaReporteBackLogVoluntarias}")
  private String exportaReporteBackLogVoluntarias;
  
  @Value("${consultaReporteVentas}")
  private String consultaReporteVentas;
  
  @Value("${exportaReporteVentas}")
  private String exportaReporteVentas;
  
  @Value("${consultaReportePlanningNuevosAddon}")
  private String consultaReportePlanningNuevosAddon;
  
  @Value("${exportaReportePlanningNuevosAddon}")
  private String exportaReportePlanningNuevosAddon;
  
  @Value("${consultaReportePlanningCompletadosOrdenes}")
  private String consultaReportePlanningCompletadosOrdenes;
  
  @Value("${exportaReportePlanningCompletadosOrdenes}")
  private String exportaReportePlanningCompletadosOrdenes;
  
  @Value("${consultaReportePlanningCompletadosAddon}")
  private String consultaReportePlanningCompletadosAddon;
  
  @Value("${exportaReportePlanningCompletadosAddon}")
  private String exportaReportePlanningCompletadosAddon;
  
  @Value("${consultaReporteVentasInstalacion}")
  private String consultaReporteVentasInstalacion;
  
  @Value("${exportaReporteVentasInstalacion}")
  private String exportaReporteVentasInstalacion;
  
}