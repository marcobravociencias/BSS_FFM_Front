package com.mx.totalplay.ffm.cloudweb.utilerias.utils;

import java.io.Serializable;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import lombok.Data;

@Component
@Data
public class ConstTercerosGeneric implements Serializable{

	private static final long serialVersionUID = 1L;
	
	@Value("${consultaCatalogoEstatusTerceros}")
	private String consultaCatalogoEstatusTerceros;
	
	@Value("${consultaCatalogoEstadoTerceros}")
	private String consultaCatalogoEstadoTerceros;
	
	@Value("${consultaCatalogoDistanciaTerceros}")
	private String consultaCatalogoDistanciaTerceros;
	
	@Value("${consultaCatalogoTiempoTerceros}")
	private String consultaCatalogoTiempoTerceros;
	
	@Value("${guardaDictamenTerceros}")
	private String guardaDictamenTerceros;
}