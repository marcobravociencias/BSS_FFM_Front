package com.mx.totalplay.ffm.cloudweb.parametrosasignacion.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ParametroVO {
	private int FAPA_ID;
	private int FCEM_ID_EMPRESA;
	private int FCUN_ID_NEGOCIO;
	private int FAPA_NUMERO;
	private String FAPA_COMENTARIO;
	private int FAPA_STATUS;
	private String FAPA_FECHA_ACTUALIZACION;
	private int FUSU_ID_USUARIOS;
	private String FAPA_VALOR_01;
	private String FAPA_VALOR_02;
	private String FAPA_VALOR_03;
	private String FCEM_NOMBRE;
	private String FCUN_NOMBRE;
	private String FAPA_MODULO;
}