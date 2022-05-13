package com.mx.totalplay.ffm.cloudweb.utilerias.service;

import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;

public interface GenericAccionesService {
	
	public ServiceResponseResult creacionOrdenTrabajoGeneric(String params) ;

    ServiceResponseResult agregarMensajeAccionSession(String params);

    ServiceResponseResult consultarAccionesRecientesSession(String params);
}
