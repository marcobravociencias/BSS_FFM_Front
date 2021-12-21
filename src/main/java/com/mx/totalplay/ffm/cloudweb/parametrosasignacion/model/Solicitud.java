package com.mx.totalplay.ffm.cloudweb.parametrosasignacion.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Solicitud {
	String key;
	String url;
	String method;
//	String datosPost;
	ParametroVO datosPost;
//	String POST;
	String datosGET;
	String token;
}