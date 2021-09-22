package com.mx.totalplay.ffm.cloudweb.plantaexterna.service;

import com.mx.totalplay.ffm.cloudweb.utilerias.model.DataTableResponse;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;

public interface InspectorIncidenciaService {
	
	public ServiceResponseResult consultarFallasInspectorPE(String params);
	
	public ServiceResponseResult consultarStatusFallasInspectorPE(String params);
	
	public ServiceResponseResult consultarIncidenciasInspectorPE(String params);

}
