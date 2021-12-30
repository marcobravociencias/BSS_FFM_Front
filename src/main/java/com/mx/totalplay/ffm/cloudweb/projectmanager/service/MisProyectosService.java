package com.mx.totalplay.ffm.cloudweb.projectmanager.service;

import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;

public interface MisProyectosService {
	
	public ServiceResponseResult consultarProyectos(String params);
	public ServiceResponseResult consultarActividadesPMS(String params);

}
