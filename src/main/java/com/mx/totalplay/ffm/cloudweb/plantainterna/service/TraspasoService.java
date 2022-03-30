package com.mx.totalplay.ffm.cloudweb.plantainterna.service;

import com.mx.totalplay.ffm.cloudweb.plantainterna.model.consultaOTPI.ParamConsultaOTPI;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.DataTableResponse;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;

public interface TraspasoService {


	public DataTableResponse consultaTraspasosOt(ParamConsultaOTPI paramsOT);

    public ServiceResponseResult consultaEvidenciaTraspaso(String params);
    
	public ServiceResponseResult consultaInformacionDetalleTraspaso(String params);
	
	public DataTableResponse consultaTraspasos(ParamConsultaOTPI paramsOT);
	
	public ServiceResponseResult consultarReporteOts(String params);
	
	public ServiceResponseResult consultarReporteTraspasos(String params);
	
	public ServiceResponseResult actualizarFactibilidad(String params);
	
	public ServiceResponseResult consultarFactibilidadRes(String params);
	
	public ServiceResponseResult consultarFactibilidadEmp(String params);
	
	public ServiceResponseResult agendarTraspasoOt(String params);
}
