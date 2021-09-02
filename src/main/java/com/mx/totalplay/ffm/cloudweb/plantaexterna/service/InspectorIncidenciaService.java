package com.mx.totalplay.ffm.cloudweb.plantaexterna.service;

import com.mx.totalplay.ffm.cloudweb.utilerias.model.DataTableResponse;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;

public interface InspectorIncidenciaService {
	
	public ServiceResponseResult consultarFallasInspectorIncidenciaPE(String params);
	
	public DataTableResponse consultarIncidenciasInspectorPE(String params);

}
