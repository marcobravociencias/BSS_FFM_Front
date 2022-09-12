package com.mx.totalplay.ffm.cloudweb.generic.utils;

import java.io.Serializable;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import lombok.Data;

@Data
@Component
public class ConstGestionModulos implements Serializable{
	private static final long serialVersionUID = 1L;

	@Value("${consultarPropietarios}")
	private String consultarPropietarios;
	
	@Value("${consultarUnidadesNegocio}")
	private String consultarUnidadesNegocio;
	
	@Value("${consultarModulosPermisos}")
	private String consultarModulosPermisos;
	
	@Value("${guardarModuloPermiso}")
	private String guardarModuloPermiso;
	
	@Value("${modificarModuloPermiso}")
	private String modificarModuloPermiso;
	
	@Value("${eliminarModuloPermiso}")
	private String eliminarModuloPermiso;
}
