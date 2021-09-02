package com.mx.totalplay.ffm.cloudweb.plantainterna.service;

import com.mx.totalplay.ffm.cloudweb.plantainterna.model.consultaOTPI.ParamConsultaOTPI;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.DataTableResponse;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;
 
public interface ReportePIService {
  
  
 
  public DataTableResponse consultaReporteOrdenes(ParamConsultaOTPI paramsOT);
  
  public DataTableResponse consultaReporteTecnico(ParamConsultaOTPI paramsOT);
  
  public DataTableResponse consultaReporteDespacho(ParamConsultaOTPI paramsOT);
  
  public DataTableResponse consultaReporteAuxiliar(ParamConsultaOTPI paramsOT);
  
  public DataTableResponse consultaReporteInspector(ParamConsultaOTPI paramsOT);
 
}