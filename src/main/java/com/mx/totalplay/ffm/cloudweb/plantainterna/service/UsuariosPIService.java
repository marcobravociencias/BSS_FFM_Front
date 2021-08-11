package com.mx.totalplay.ffm.cloudweb.plantainterna.service;

import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;

public interface UsuariosPIService {
	
	public ServiceResponseResult consultarCompanias();
	public ServiceResponseResult consultarPuestos();
	public ServiceResponseResult consultarRegionesEstructura();
	public ServiceResponseResult consultarClasificacionUsuario();
	public ServiceResponseResult consultarIntervencionesPorPropietarios(String params);
	public ServiceResponseResult consultarArbolesCiudades();
	public ServiceResponseResult consultarOperariosPorCiudad(String params);
	public ServiceResponseResult consultarCiudadesEstructura(String params);
	public ServiceResponseResult consultarPrivilegios(String params);
	
	public ServiceResponseResult consultarUsuarios(String params);
	
	
}
