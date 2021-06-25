package com.mx.totalplay.ffm.cloudweb.plantainterna.controller;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.mx.totalplay.ffm.cloudweb.plantainterna.service.DespachoPIService;
import com.mx.totalplay.ffm.cloudweb.plantainterna.service.SkillsAdminService;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;

@RestController
@RequestMapping("/req")
public class SkillsAdminController {
	private final Logger logger = LogManager.getLogger(SkillsAdminController.class.getName());
	

		
	@Autowired
	private SkillsAdminService skillsAdmin;
	
	Gson gson = new Gson();
	
	@PostMapping("/consultarBusquedaSkills")
	public Object consultarBusquedaSkills(@RequestBody String params) {
		logger.info("*** Objeto: " + params);
		//ParamsSkills paramsRep = new Gson().fromJson(params, ParamsSkills.class);
		ServiceResponseResult result = skillsAdmin.busqueda(params);
		return result;
	}
	
	@PatchMapping("/guardarSkillsTecn")
	public ServiceResponseResult guardarSkills(@RequestBody String params) {
		logger.info("######## GUARDAR SKILLS");
		ServiceResponseResult response=skillsAdmin.guardarSkills(params);
		return null;
		
	}
	@PostMapping("/consultarArbolesCiudadesS")
	public ServiceResponseResult consultarArbolesCiudades() {
		logger.info("##### SkillsAdminController.class - method: consultarArbolesCiudades()");
		ServiceResponseResult response = skillsAdmin.consultarArbolesCiudades();
		return response;
	}
	@PostMapping("/consultaCatalogoGeografiaGeneralDespacho")
    public ServiceResponseResult consultarCatalogoSkills() {
		logger.info("##### CONSULTANDO CATALGOS");
		ServiceResponseResult response =skillsAdmin.consultarCatalogoGeografiaGeneral();
        return response;
    }
}
