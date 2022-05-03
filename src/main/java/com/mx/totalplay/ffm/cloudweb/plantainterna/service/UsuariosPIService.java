package com.mx.totalplay.ffm.cloudweb.plantainterna.service;

import com.mx.totalplay.ffm.cloudweb.plantainterna.model.usuario.ObjConsultaUsuario;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.DataTableResponse;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;

public interface UsuariosPIService {
	
	//MAPEADOS 
	public ServiceResponseResult consultaCompanias();
	public ServiceResponseResult consultaPuestos();
	public ServiceResponseResult consultaPermisos();
	public ServiceResponseResult consultaUsuarioPorId(String params);
	public DataTableResponse consultaUsuariosPorGeoCompPuestos(ObjConsultaUsuario params);
	public ServiceResponseResult consultaGeografias();
	public ServiceResponseResult consultaIntervenciones();
	public ServiceResponseResult guardarUsuario(String params);
	public ServiceResponseResult consultarUsuariosPorTipoUsuario(String params);
	public ServiceResponseResult modificarUsuario(String params);
	public ServiceResponseResult eliminarUsuario(String params);
	public ServiceResponseResult validarUsuarioExistente(String params);
	
}
