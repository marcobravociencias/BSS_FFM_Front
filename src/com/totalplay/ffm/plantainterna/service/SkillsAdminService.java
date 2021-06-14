package com.totalplay.ffm.plantainterna.service;

import java.util.List;


import com.totalplay.ffm.plantainterna.model.ParamsSkills;
import com.totalplay.ffm.plantainterna.model.TecnicoSoporteTemp;
import com.totalplay.ffm.utilerias.model.ServiceResponseResult;

public interface SkillsAdminService {
	public ServiceResponseResult busqueda();
	public ServiceResponseResult consultarCatalogosPI(String params);
	public ServiceResponseResult guardarSkills(TecnicoSoporteTemp params);
	public ServiceResponseResult consultarArbolesCiudades();
	public ServiceResponseResult consultarArbolCiudades2(String prop);
	public ServiceResponseResult GuadaInfoSkillsTec(List<TecnicoSoporteTemp> skills);
}
