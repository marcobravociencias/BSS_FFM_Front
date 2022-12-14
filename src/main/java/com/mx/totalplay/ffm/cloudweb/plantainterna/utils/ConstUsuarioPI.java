package com.mx.totalplay.ffm.cloudweb.plantainterna.utils;

import java.io.Serializable;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import lombok.Data;

@Data
@Component
public class ConstUsuarioPI implements Serializable{
	private static final long serialVersionUID = 1L;

	@Value("${consultaCompanias}")
	private String consultaCompanias;
	
	@Value("${consultaPuestos}")
	private String consultaPuestos;
	
	@Value("${consultaPermisos}")
	private String consultaPermisos;
	
	@Value("${consultaUsuarioPorId}")
	private String consultaUsuarioPorId;
	
	@Value("${consultaUsuariosPorGeoCompPuestos}")
	private String consultaUsuariosPorGeoCompPuestos;
	
	@Value("${consultarcatalogogeografiageneral}")
	private String consultaGeografias;
	
	@Value("${consultarcatalogoTipoOrdenesConfig}")
	private String consultaIntervenciones;
	
	@Value("${guardarUsuario}")
	private String guardarUsuario;
	
	@Value("${consultarUsuariosPorTipoUsuario}")
	private String consultarUsuariosPorTipoUsuario;
	
	@Value("${modificarUsuario}")
	private String modificarUsuario;
	
	@Value("${eliminarUsuario}")
	private String eliminarUsuario;
	
	@Value("${validarUsuarioExistente}")
	private String validarUsuarioExistente;
	
	@Value("${consultarCuadrillasGestionUsuarios}")
	private String consultarCuadrillasGestionUsuarios;
	
}
