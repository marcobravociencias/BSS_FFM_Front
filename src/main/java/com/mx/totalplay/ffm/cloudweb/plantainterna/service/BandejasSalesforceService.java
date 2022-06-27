package com.mx.totalplay.ffm.cloudweb.plantainterna.service;

import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;

public interface BandejasSalesforceService {
	
	public ServiceResponseResult consultarPendientesAgendarBandejasSF(String params);
	
	public ServiceResponseResult consultarRescataventasBandejasSF(String params);
	
	public ServiceResponseResult consultarPendientesActivarBandejasSF(String params);
	
	public ServiceResponseResult consultarFactibilidadEmpresarialBandejasSF(String params);
	
	public ServiceResponseResult consultarInfoSitioInstalacion(String params);
	
	public ServiceResponseResult guardarContactoSalesforce(String params);
	
	public ServiceResponseResult actualizarFactibilidadSitio(String params);	

	public ServiceResponseResult agendarOrdenSalesforce(String params);
	
	public ServiceResponseResult consultarDetalleEquiposBandejasSF(String params);
	
	public ServiceResponseResult consultarValidacionCSPBandejasSF(String params);
	
	public ServiceResponseResult agendarPendienteBandejaSF(String params);
}
