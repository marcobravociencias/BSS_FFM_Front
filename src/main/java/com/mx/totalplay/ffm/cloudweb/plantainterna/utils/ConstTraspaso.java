package com.mx.totalplay.ffm.cloudweb.plantainterna.utils;

import java.io.Serializable;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import lombok.Data;

@Data
@Component
public class ConstTraspaso implements Serializable{

private static final long serialVersionUID = 1L;
	
	@Value("${consultaGeneralTraspasosOt}")
	private String consultaGeneralTraspasosOt;

	@Value("${consultaEvidenciaTraspasos}")
	private String consultaEvidenciaTraspasos;
	
	@Value("${consultaInfoGeneralTraspaso}")
	private String consultaInfoGeneralTraspaso;
	
	@Value("${consultaGeneralTraspasos}")
	private String consultaGeneralTraspasos;

	
	@Value("${consultaMotivosTraspasos}")
	private String consultarMotivos;
	
	@Value("${crmDisponibilidad}")
	private String crmDisponibilidad;
	
	@Value("${agendarTraspasoOt}")
	private String agendarTraspasoOt;
	
	@Value("${consultaGeneralHistorico}")
	private String consultaGeneralHistorico;
	
	@Value("${consultarTransferidas}")
	private String consultarTransferidas;
	
}
