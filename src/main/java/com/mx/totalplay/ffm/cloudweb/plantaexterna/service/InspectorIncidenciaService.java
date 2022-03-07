package com.mx.totalplay.ffm.cloudweb.plantaexterna.service;

import com.mx.totalplay.ffm.cloudweb.utilerias.model.DataTableResponse;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;

public interface InspectorIncidenciaService {
	
	public ServiceResponseResult consultarFallasInspectorPE();
	
	public ServiceResponseResult consultarIncidenciasInspectorPE(String params);
	
	public ServiceResponseResult consultarDetalleIncidenciaInspectorPE(String params);
	
	public ServiceResponseResult consultarCatalogoRechazoIncidenciaInspectorPE(String params);
	
	public ServiceResponseResult cambiarStatusIncidenciaInspectorPE(String params);
	
	public ServiceResponseResult generarOTIncidenciaInspectorPE(String params);
	
	public ServiceResponseResult consultaCatalogoEstatusInspectorPE();

}
