package com.mx.totalplay.ffm.cloudweb.plantainterna.utils;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import lombok.Data;

@Data
@Component
public class ConstOrdenesUniversales {
	
	 @Value("${consultarCatalogoOrdenesUniversales}")
	 private String consultarCatalogoOrdenesUniversales;

	 @Value("${consultarPerfilesGeneral}")
	 private String consultarPerfilesGeneral;
	 
	 @Value("${consultarPerfilesPorUsuario}")
	 private String consultarPerfilesPorUsuario;

	@Value("${consultarPaquetesOrdenesUniversales}")
	private String consultarPaquetesOrdenesUniversales;

	@Value("${consultarCanalVentaOredenesUniversales}")
	private String consultarCanalVentaOredenesUniversales;
}
