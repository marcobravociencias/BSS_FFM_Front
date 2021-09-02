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
	//FIN MAPEO
	
	public ServiceResponseResult consultarRegionesEstructura();
	public ServiceResponseResult consultarClasificacionUsuario();
	public ServiceResponseResult consultarIntervencionesPorPropietarios(String params);
	public ServiceResponseResult consultarArbolesCiudades();
	public ServiceResponseResult consultarOperariosPorCiudad(String params);
	public ServiceResponseResult consultarCiudadesEstructura(String params);
	public ServiceResponseResult consultarUsuarios(String params);
	
	
}
