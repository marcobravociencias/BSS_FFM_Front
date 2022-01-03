package com.mx.totalplay.ffm.cloudweb.utilerias.utils;

import java.io.Serializable;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import lombok.Data;

@Component
@Data
public class ConstantesGeneric implements Serializable{

	private static final long serialVersionUID = 1L;

	@Value("${isip}")
	private String textIpUsuario;
	
	@Value("${isuser}")
	private String textCredUs;
	
	@Value("${ispass}")
	private String textCredPad;
	
	@Value("${ws.url.validausrffm}")
	private String wsUrlValidausrffm;
	
	@Value("${googlekeyapidata}")
	private String googAccLLaevATok;
	
	@Value("${dirip.inicio.service}")
	private String dirIpInicioService;
	
	@Value("${basicauth-user}")
	private String authbasicUser;
	
	@Value("${basicauth-cred}")
	private String authbasicCred;
	
	@Value("${guardarOrdenesUniversales}")
	private String guardarOrdenesUniversales;
	
	@Value("${gestionNoticiasGeneric}")
	private String gestionNoticiasGeneric;
}
