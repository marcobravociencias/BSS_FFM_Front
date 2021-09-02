package com.mx.totalplay.ffm.cloudweb.plantaexterna.service;

import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;

public interface ConsultaOTPEService {
	public ServiceResponseResult consultaOTInspector(String params);
	
	public ServiceResponseResult consultaOTMasivo(String params);
	
	public ServiceResponseResult consultaOTDiario(String params);
	
	public ServiceResponseResult consultarHistorico(String params);
	
	public ServiceResponseResult consultarMateriales(String params);
	
	public ServiceResponseResult consultarFallas(String params);

}
