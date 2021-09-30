package com.mx.totalplay.ffm.cloudweb.plantaexterna.utils;

import java.io.Serializable;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import lombok.Data;

@Data
@Component
public class ConstInspectorCobertura {
    private static final long serialVersionUID = 1L;
	
	@Value("${consultaFallasInspectorCoberturaPE}")
	private String consultaFallasInspectorCoberturaPE;

    @Value("${consultaFiltrosInspectorCoberturaPE}")
	private String consultaFiltrosInspectorCoberturaPE;

    @Value("${consultaIncidenciasInspectorCoberturaPE}")
	private String consultaIncidenciasInspectorCoberturaPE;

}
