package com.mx.totalplay.ffm.cloudweb.utilerias.service;

import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;

public interface GestionNoticiasService {
	
	public ServiceResponseResult consultarNoticia();
	public ServiceResponseResult registrarNoticia(String params);
	public ServiceResponseResult actualizarNoticia(String params);
	public ServiceResponseResult eliminarNoticia(String params);

}
