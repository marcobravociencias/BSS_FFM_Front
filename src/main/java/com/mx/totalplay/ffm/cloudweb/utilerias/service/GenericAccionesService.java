package com.mx.totalplay.ffm.cloudweb.utilerias.service;

import javax.servlet.http.HttpServletRequest;

import com.mx.totalplay.ffm.cloudweb.plantainterna.model.consultaOTPI.ParamConsultaOTPI;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.DataTableResponse;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;

public interface GenericAccionesService {
	
	public ServiceResponseResult creacionOrdenTrabajoGeneric(String params) ;

    ServiceResponseResult agregarMensajeAccionSession(String params);

    ServiceResponseResult consultarAccionesRecientesSession(String params);
    
    ServiceResponseResult getAutentificacionJerarquia(String params);

    ServiceResponseResult agregarMensajeAccionService(String params, HttpServletRequest request);
    
    ServiceResponseResult consultarAccionesRecientesService(String params);
    
    ServiceResponseResult consultarReporteLogGeneral(String params);
    
	public DataTableResponse consultarLogGeneral(ParamConsultaOTPI params);
	
	ServiceResponseResult agregarMensajeAccionServiceLogin(String params, String token);

}
