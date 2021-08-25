package com.mx.totalplay.ffm.cloudweb.plantainterna.service;

import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;

public interface UsuariosPIService {
	
	public ServiceResponseResult consultaCompanias();
	public ServiceResponseResult consultaPuestos();
	public ServiceResponseResult consultaPermisos();
	public ServiceResponseResult consultaUsuarioPorId(String params);
	public ServiceResponseResult consultaUsuariosPorGeoCompPuestos(String params);
	
	public ServiceResponseResult consultarRegionesEstructura();
	public ServiceResponseResult consultarClasificacionUsuario();
	public ServiceResponseResult consultarIntervencionesPorPropietarios(String params);
	public ServiceResponseResult consultarArbolesCiudades();
	public ServiceResponseResult consultarOperariosPorCiudad(String params);
	public ServiceResponseResult consultarCiudadesEstructura(String params);
	
	public ServiceResponseResult consultarUsuarios(String params);
	
	
}
