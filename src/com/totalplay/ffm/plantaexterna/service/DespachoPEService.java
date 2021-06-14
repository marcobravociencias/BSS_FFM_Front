package com.totalplay.ffm.plantaexterna.service;

import com.totalplay.ffm.utilerias.model.ServiceResponseResult;

public interface DespachoPEService {
	
	public ServiceResponseResult consultarFiltrosPE(String params);
	public ServiceResponseResult consultarOperariosPE(String params);
	public ServiceResponseResult consultarOrdenesPendientesPE(String params);
	public ServiceResponseResult consultarOrdenesAsignadasPE(String params);
	public ServiceResponseResult consultarDetalleOTInspector(String params);
	public ServiceResponseResult consultarOtsTrabajadasInspector(String params);
}
