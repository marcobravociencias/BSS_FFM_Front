package com.mx.totalplay.ffm.cloudweb.plantainterna.service;

import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;

public interface GestionTecnicosService {
	
	public ServiceResponseResult consultaMotivosGestionTecnicos();
	
	public ServiceResponseResult consultaTecnicosGestionTecnicos(String params);
	
	public ServiceResponseResult consultaDisponibilidadTecGestionTecnicos(String params);
	
	public ServiceResponseResult consultaDisponibilidadAuxGestionTecnicos(String params);
	

}
