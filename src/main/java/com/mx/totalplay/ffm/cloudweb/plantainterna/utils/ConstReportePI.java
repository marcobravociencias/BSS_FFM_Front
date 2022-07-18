package com.mx.totalplay.ffm.cloudweb.plantainterna.utils;
 
import java.io.Serializable;
 
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
 
import lombok.Data;
 
@Data
@Component
public class ConstReportePI implements Serializable{
  private static final long serialVersionUID = 1L;
  
  @Value("${urlconstconsultaot}")
  private String filtrosConsultaOT;
  
  @Value("${consultaImagenesOt}")
  private String consultaImagenesOt;
  
  @Value("${consultaOtInfoGeneral}")
  private String consultaOtInfoGeneral;
  
  @Value("${consultaMaterialesOt}")
  private String consultaMaterialesOt;
  @Value("${consultaComentariosOtOperario}")
  private String consultaComentariosOtOperario;
  
  @Value("${consultaHistoricoOtOperario}")
  private String consultaHistoricoOtOperario;
  
  @Value("${consultaActividad}")
  private String consultaActividad;
  
  @Value("${consultaInformacionRed}")
  private String consultaInformacionRed;
  
  @Value("${consultaCambioEquipo}")
  private String consultaCambioEquipo;
  
  @Value("${consultaGeneralOt}")
  private String consultaGeneralOt;
  
  @Value("${busquedaDetalleGralConstante}")
  private String busquedaDetalleGralConstante;
  
  @Value("${consultarBandejaFFM}")
  private String consultarBandejaFFM;
  
  @Value("${consultaReporteSeguimientoDiario}")
  private String consultarReporteDiario;
 
  @Value("${consultaCierreDiario}")
  private String consultarCierreDiario;
  
  @Value("${consultaAsignadasCompensacion}")
  private String consultarAsignadasCompensacion;
  
  @Value("${consultarTecnicosTiposOrdenes}")
  private String consultarTecnicosTiposOrdenes;
  
}