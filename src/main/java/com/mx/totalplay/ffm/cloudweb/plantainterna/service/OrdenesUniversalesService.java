package com.mx.totalplay.ffm.cloudweb.plantainterna.service;

import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;

public interface OrdenesUniversalesService {
	
	public ServiceResponseResult consultarCuentaAsignadaGenerica(String params);
	public ServiceResponseResult consultarCatalogosOrdenesUniversales();
	
	public ServiceResponseResult consultarPerfilesGeneralServ();
	public ServiceResponseResult consultarPerfilesPorUsuarioServ();

}
