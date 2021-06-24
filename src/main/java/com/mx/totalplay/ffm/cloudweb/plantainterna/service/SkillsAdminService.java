package com.mx.totalplay.ffm.cloudweb.plantainterna.service;

import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;

public interface SkillsAdminService {
	public ServiceResponseResult busqueda(String params);
	public ServiceResponseResult consultarArbolesCiudades();
	public ServiceResponseResult guardarSkills(String params);
}
