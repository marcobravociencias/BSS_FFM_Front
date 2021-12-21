package com.mx.totalplay.ffm.cloudweb.parametrosasignacion.component;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.mx.totalplay.ffm.cloudweb.plantaexterna.utils.ConstConsultaOTPE;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Component
public class ParametrosEndpoints {
	@Value("${endpoint.server}")
	private String endpointServer;
	
	@Value("${endpoint.parametros}")
	private String endpointParametros;
	
	@Value("${endpoint.parametros.save}")
	private String endpointParametrosGuardar;
	
	@Value("${endpoint.parametros.data}")
	private String endpointParametrosData;
	
	@Value("${endpoint.versiones.data}")
	private String endpointVersionesData;
	
	@Value("${endpoint.rollback.data}")
	private String endpointRollbackData;
	
	@Value("${endpoint.modulos}")
	private String endpointModulos;
	
	@Value("${endpoint.modulos.data}")
	private String endpointModulosData;
	
	@Value("${endpoint.modulos.max}")
	private String endpointModulosMax;
	
	@Value("${endpoint.inactivos}")
	private String endpointInactivos;
	
	@Value("${endpoint.eliminar}")
	private String endpointEliminar;
	
	@Value("${endpoint.activar}")
	private String endpointActivar;
	
	@Value("${endpoint.log}")
	private String endpointLog;
	
	@Value("${endpoint.empresas}")
	private String endpointEmpresas;
	
	@Value("${endpoint.unidades}")
	private String endpointUnidades;
}
