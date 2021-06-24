package com.mx.totalplay.ffm.cloudweb.plantainterna.service.impl;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.mx.totalplay.ffm.cloudweb.plantainterna.service.SkillsAdminService;
import com.mx.totalplay.ffm.cloudweb.plantainterna.utils.ConstDespachoPI;
import com.mx.totalplay.ffm.cloudweb.plantainterna.utils.ConstSkills;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.LoginResult;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.ConstantesGeneric;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.ConsumeRest;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.UtileriaGeneral;

@Service
public class ImplSkillsAdminService implements SkillsAdminService{
	private  final Logger logger = LogManager.getLogger(ImplSkillsAdminService.class.getName());
	
	@Autowired
    ConstantesGeneric constantesAmbiente;
	
	@Autowired
	ConstSkills constSkills;
	
	@Autowired
	private ConsumeRest restCaller;
	
	@Autowired
	private UtileriaGeneral utilerias;
	
	@Autowired
	private Environment env;
	
	Gson gson=new Gson();
	
	
	@Override
	public ServiceResponseResult busqueda(String params) {
		logger.info("ImplSkillsAdminService.class [metodo = busqueda() ]\n");
		LoginResult principalDetail=utilerias.obtenerObjetoPrincipal();
		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		String tokenAcces=principalDetail.getAccess_token();
		logger.info("json object params## "+jsonObject.toString());	 
		String url="http://94.74.70.52:8149"+constSkills.getUsuariosTipoOrdenes();
		ServiceResponseResult response= restCaller.callPostBearerTokenRequest(
				jsonObject.toString(),
				url,
				ServiceResponseResult.class,
				tokenAcces);
		logger.info("RESULT busqueda"+gson.toJson(response));
		return response;
	}

	@Override
	public ServiceResponseResult consultarArbolesCiudades() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ServiceResponseResult guardarSkills(String params) {
		logger.info("ImplSkillsAdminService.class [metodo = guardarSkills() ]\n");
		LoginResult principalDetail=utilerias.obtenerObjetoPrincipal();
		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		String tokenAcces=principalDetail.getAccess_token() ;
		logger.info("json object params## "+jsonObject.toString());
		String url="http://94.74.70.52:8149"+constSkills.getGuardarSkillSimple();
		ServiceResponseResult response=restCaller.callPatchBearerTokenRequest(jsonObject.toString(), url, ServiceResponseResult.class, tokenAcces);
		logger.info("RESULT guardarSkills"+gson.toJson(response));
		return null;
	}

}
