package com.mx.totalplay.ffm.cloudweb.plantainterna.service;

import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;

public interface GestionTecnicosService {
	
	public ServiceResponseResult consultaMotivosGestionTecnicos();
	
	public ServiceResponseResult consultaTecnicosGestionTecnicos(String params);
	
	public ServiceResponseResult consultaDisponibilidadTecGestionTecnicos(String params);
	
	public ServiceResponseResult consultaDisponibilidadAuxGestionTecnicos(String params);
	
	public ServiceResponseResult consultaDetalleJustificacionGestionTec(String params);
	
	public ServiceResponseResult consultaDetalleMesGestionTec(String params);
	
	public ServiceResponseResult consultaComentariosJustificacionGestionTec(String params);
	
	public ServiceResponseResult consultaArchivosJustificacionGestionTec(String params);
	
	public ServiceResponseResult agregarJustificacionGestionTec(String params);
	
	public ServiceResponseResult editarJustificacionGestionTec(String params);
	
	public ServiceResponseResult eliminarJustificacionGestionTec(String params);
	
	public ServiceResponseResult agregarArchivoJustificacionGestionTec(String params);
	
	public ServiceResponseResult eliminarArchivoJustificacionGestionTec(String params);

}
