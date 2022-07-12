package com.mx.totalplay.ffm.cloudweb.plantainterna.utils;

import java.io.Serializable;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import lombok.Data;

@Data
@Component
public class ConstControlVehicular implements Serializable{
	
	private static final long serialVersionUID = 1L; 

    @Value("${consultarMarcasControlVehicular}")
	private String consultarMarcasControlVehicular;

	@Value("${consultarColoresControlVehicular}")
	private String consultarColoresControlVehicular;

	@Value("${consultarSegurosControlVehicular}") 
	private String consultarSegurosControlVehicular;

	@Value("${consultarEstatusControlVehicular}") 
	private String consultarEstatusControlVehicular;

	@Value("${consultarEncierrosControlVehicular}")
	private String consultarEncierrosControlVehicular;

	@Value("${crearVehiculoCV}") 
	private String crearVehiculoCV;

	@Value("${consultarVehiculoPlacaCV}")
	private String consultarVehiculoPlacaCV;
	
	@Value("${consultarVehiculoUnicoCV}")
	private String consultarVehiculoUnicoCV;
	
	@Value("${consultarVehiculosCV}")
	private String consultarVehiculosCV;
	
	@Value("${editarVehiculoCV}")
	private String editarVehiculoCV;
	
	@Value("${consultarHistorialCV}")
	private String consultarHistorialCV;

	@Value("${eliminarVehiculoCV}")
	private String eliminarVehiculoCV;
	
	@Value("${consultarOperacionesControlVehicular}")
	private String consultarOperacionesControlVehicular;
	
	@Value("${consultarCuadrillaControlVehicular}")
	private String consultarCuadrillaControlVehicular;
	
	@Value("${consultarEmpresasControlVehicular}")
	private String consultarEmpresasControlVehicular;
	
	@Value("${consultarCostosControlVehicular}")
	private String consultarCostosControlVehicular;
	
	@Value("${reporteControlVehicular}")
	private String reporteControlVehicular;
	
}