package com.mx.totalplay.ffm.cloudweb.plantaexterna.service;

import com.mx.totalplay.ffm.cloudweb.utilerias.model.DataTableResponse;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;

public interface InspectorIncidenciaService {
	
	public ServiceResponseResult consultarFallas(String params);
	
	public DataTableResponse consultarIncidenciasInspector(String params);

}
