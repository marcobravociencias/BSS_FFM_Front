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
	public ServiceResponseResult consultarComentariosJustificacion(String params);
	public ServiceResponseResult agregarComentarioJustificacion(String params);

}
