package com.mx.totalplay.ffm.cloudweb.generic.service;

import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;

public interface GestionModulosService {
	public ServiceResponseResult consultarPropietarios();
	public ServiceResponseResult consultarUnidadesNegocio();
	public ServiceResponseResult consultarModulosPermisos(String params);
	public ServiceResponseResult guardarModuloPermiso(String params);
	public ServiceResponseResult modificarModuloPermiso(String params);
	public ServiceResponseResult eliminarModuloPermiso(String params);
}
