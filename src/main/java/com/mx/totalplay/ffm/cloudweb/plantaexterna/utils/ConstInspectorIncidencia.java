package com.mx.totalplay.ffm.cloudweb.plantaexterna.utils;

import java.io.Serializable;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import lombok.Data;

@Data
@Component
public class ConstInspectorIncidencia  implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
	@Value("${consultaCatalogoFallasInspectorPE}")
	private String consultaCatalogoFallasInspectorPE;
	
	@Value("${consultaCatalogoEstatusInspectorPE}")
	private String consultaCatalogoEstatusInspectorPE;
	
	@Value("${consultarIncidenciasInspectorPE}")
	private String consultarIncidenciasInspectorPE;

	@Value("${consultaDetalleIncidentesInspectorPE}")
	private String consultaDetalleIncidentes;
	
	@Value("${generarOTIncidenciaInspectorPE}")
	private String generarOTIncidenciaInspectorPE;
}