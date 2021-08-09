package com.mx.totalplay.ffm.cloudweb.plantainterna.service;

import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;

public interface OrdenesUniversalesService {
	
	public ServiceResponseResult consultarCatalogoOrdenesUniversales(String params);
	public ServiceResponseResult consultarCuentaAsignadaGenerica(String params);
	public ServiceResponseResult getcatsdispacherintegrador(String params);
	public ServiceResponseResult getDisponibilidadServicioRest(String params);
	public ServiceResponseResult creacionAsignacionGenerica(String params);
	
}
