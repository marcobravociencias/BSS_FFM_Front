package com.mx.totalplay.ffm.cloudweb.plantainterna.service;

import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;

public interface VistaAuditoriaService {

	public ServiceResponseResult consultaAuditoriasVistaAuditoria(String params);

	public ServiceResponseResult consultaDetalleAuditoriaTecnicoVistaAuditoria(String params);

	public ServiceResponseResult consultaDetalleAuditoriaVistaAuditoria(String params);
}
