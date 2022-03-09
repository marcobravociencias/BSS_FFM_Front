package com.mx.totalplay.ffm.cloudweb.plantainterna.service;

import com.mx.totalplay.ffm.cloudweb.plantainterna.model.consultaOTPI.ParamConsultaOTPI;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.DataTableResponse;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;
 
public interface ReportePIService {
  
  
 
  public DataTableResponse consultaReporteOrdenes(ParamConsultaOTPI params);
  
  public DataTableResponse consultaReporteTecnico(ParamConsultaOTPI params);
  
  public DataTableResponse consultaReporteDespacho(ParamConsultaOTPI params);
  
  public DataTableResponse consultaReporteAuxiliar(ParamConsultaOTPI params);
  
  public DataTableResponse consultaReporteInspector(ParamConsultaOTPI params);
  
  public DataTableResponse consultarReporteDiario(ParamConsultaOTPI params);
  
  public DataTableResponse consultarReporteCierreDiario(ParamConsultaOTPI params);
  
  public ServiceResponseResult consultarReporteCierreDiarioEx(String params);
  
  public DataTableResponse consultarReporteAsignadasCompensacion(ParamConsultaOTPI params);
  
  public ServiceResponseResult consultarReporteAsignadasEx(String params);
}