package com.mx.totalplay.ffm.cloudweb.projectmanager.utils;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import lombok.Data;

@Data
@Component
public class ConstOportunidades {

	@Value("${consultarOportunidades}")
    private String consultarOportunidades;
	
	@Value("${consultarDetalleOportunidad}")
	private String consultarDetalleOportunidad;

	@Value("${consultarLiderTecnicoTorreControlList}")
	private String consultarLiderTecnicoTorreControlList;

	@Value("${consultarLiderTecnicoTorreControl}")
	private String consultarLiderTecnicoTorreControl;

	@Value("${consultarEnImplementacion}")
	private String consultarEnImplementacion;

	@Value("${actualizarEnImplementacion}")
	private String actualizarEnImplementacion;

	@Value("${solTorreLiderTec}")
	private String actualizarEnImplementacionRechazado;
}
