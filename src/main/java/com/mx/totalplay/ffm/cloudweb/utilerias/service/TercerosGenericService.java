package com.mx.totalplay.ffm.cloudweb.utilerias.service;

import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;

public interface TercerosGenericService {
	
	public ServiceResponseResult consultarCatEstatus();
	public ServiceResponseResult consultarCatEstado();
	public ServiceResponseResult consultarCatDistancia();
	public ServiceResponseResult consultarCatTiempo();
	public ServiceResponseResult guardarDictamenTerceros(String params);
}
