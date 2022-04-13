package com.mx.totalplay.ffm.cloudweb.plantainterna.service;

import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;

public interface BandejasSalesforceService {
	
	public ServiceResponseResult consultarPendientesAgendarBandejasSF(String params);
	
	public ServiceResponseResult consultarRescataventasBandejasSF(String params);
	
	public ServiceResponseResult consultarPendientesActivarBandejasSF(String params);

}
