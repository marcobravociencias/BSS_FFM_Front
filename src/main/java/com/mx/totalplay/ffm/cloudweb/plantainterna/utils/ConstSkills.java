package com.mx.totalplay.ffm.cloudweb.plantainterna.utils;

import java.io.Serializable;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import lombok.Data;

@Data
@Component
public class ConstSkills implements Serializable{
	private static final long serialVersionUID = 1L;
	
	@Value("${consultausuariostiposordenes}")
	private String usuariosTipoOrdenes;
	@Value("${guardarskillSimple}")
	private String guardarSkillSimple;
	@Value("${urlfiltrosskills}")
	private String filtrosSkillsPI;
	@Value("${consultarcatalogogeografiageneral}")
	private String consultarCatalogoGeografiaGeneralPI;
	@Value("${consultarcatalogogeografiausuario}")
	private String consultarCatalogoGeografiaUsuarioPI;
	@Value("${guardarSkillsMultiple}")
	private String guardarSkillsMultiple;

}
