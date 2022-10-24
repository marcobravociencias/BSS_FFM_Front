package com.mx.totalplay.ffm.cloudweb.projectmanager.service;

import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;

public interface OportunidadService {

	public ServiceResponseResult consultarOportunidades(String params);
	public ServiceResponseResult consultarDetalleOportunidad(String params);

	ServiceResponseResult consultarLiderTorreControlList(String params);

	ServiceResponseResult consultarEnImplementacion(String params);

	ServiceResponseResult updateTorreControl(String params);
}
