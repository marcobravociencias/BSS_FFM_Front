package com.mx.totalplay.ffm.cloudweb.plantainterna.service;

import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;

public interface GestionTecnicosService {
	
	public ServiceResponseResult consultaTecnicosGestionTecnicos(String params);
	public ServiceResponseResult consultaAuxiliaresGestionTecnicos(String params);
	public ServiceResponseResult consultaTecnicosPorDespacho(String params);
	public ServiceResponseResult consultaOrdenesTecnicoPorFecha(String params);
	public ServiceResponseResult consultaOrdenesAuxiliarPorFecha(String params);
	public ServiceResponseResult consultaDisponibilidadTecnico(String params);
	public ServiceResponseResult consultaDiasTrabajadosTecnicoPorFecha(String params);
	public ServiceResponseResult consultaDiasTrabajadosAuxiliarPorFecha(String params);
	public ServiceResponseResult consultaJustificacionesTecnico(String params);
	public ServiceResponseResult consultaMotivosJustificaciones();
	public ServiceResponseResult guardarJustificacionTecnico(String params);
	public ServiceResponseResult eliminarJustificacionTecnico(String params);
	public ServiceResponseResult modificarJustificacionTecnico(String params);
	
//	public ServiceResponseResult consultaMotivosGestionTecnicos();
//	
//	public ServiceResponseResult consultaTecnicosGestionTecnicos(String params); //SI
//	
//	public ServiceResponseResult consultaDisponibilidadTecGestionTecnicos(String params); //SI
//	
//	public ServiceResponseResult consultaDisponibilidadAuxGestionTecnicos(String params);
//	
//	public ServiceResponseResult consultaDetalleJustificacionGestionTec(String params);
//	
//	public ServiceResponseResult consultaDetalleMesGestionTec(String params);
//	
//	public ServiceResponseResult consultaComentariosJustificacionGestionTec(String params);
//	
//	public ServiceResponseResult consultaArchivosJustificacionGestionTec(String params);
//	
//	public ServiceResponseResult agregarJustificacionGestionTec(String params);
//	
//	public ServiceResponseResult editarJustificacionGestionTec(String params);
//	
//	public ServiceResponseResult eliminarJustificacionGestionTec(String params);
//	
//	public ServiceResponseResult agregarArchivoJustificacionGestionTec(String params);
//	
//	public ServiceResponseResult eliminarArchivoJustificacionGestionTec(String params);

}
