package com.mx.totalplay.ffm.cloudweb.plantainterna.service.impl;

import java.util.HashMap;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.mx.totalplay.ffm.cloudweb.plantainterna.service.CoordInstalacionesService;
import com.mx.totalplay.ffm.cloudweb.plantainterna.utils.ConstCoordInst;
import com.mx.totalplay.ffm.cloudweb.plantainterna.utils.ConstSkills;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.LoginResult;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.ConstantesGeneric;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.ConsumeRest;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.UtileriaGeneral;

@Service
public class ImplCoordInstalacionesService implements CoordInstalacionesService{
	private  final Logger logger = LogManager.getLogger(ImplCoordInstalacionesService.class.getName());
	private Gson gson=new Gson();
	private final ConstCoordInst constCoordInst;
	private final ConsumeRest restCaller;
	private final UtileriaGeneral utilerias;
	private final Environment env;
	private final ConstantesGeneric constantesAmbiente;
	
	@Autowired
	public ImplCoordInstalacionesService(ConstantesGeneric constantesAmbiente, ConstCoordInst constCoordInst, ConsumeRest restCaller, UtileriaGeneral utilerias, Environment env) {
		this.constantesAmbiente = constantesAmbiente;
		this.constCoordInst = constCoordInst;
		this.restCaller = restCaller;
		this.utilerias = utilerias;
		this.env = env;
	}
	
	@Override
	public ServiceResponseResult busquedaGral(String params) {
		logger.info("ImplCoordInstalacionesService.class [metodo = busqueda() ]\n");
		ServiceResponseResult response = null;
		try {
			logger.info("######### parametros:"+params);
			JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
			String word=jsonObject.get("word").getAsString();
			logger.info("######### parametros w:"+word);
			String cuadrilla=jsonObject.get("cuadrilla").getAsString();
			logger.info("######### parametros c:"+cuadrilla);
			logger.info("json object params## "+jsonObject.toString());	
			LoginResult principalDetail=utilerias.obtenerObjetoPrincipal();
			String tokenAcces=principalDetail.getAccess_token();
			String url="http://10.216.48.100:9010"+constCoordInst.getBusquedaGralConstante();
			Map<String, String> paramsRequestGet = new HashMap<String, String>();
	        paramsRequestGet.put("word", word);
	        paramsRequestGet.put("cuadrilla", cuadrilla);
	        
			response=restCaller.callPostBearerTokenRequestURL(paramsRequestGet, url, ServiceResponseResult.class, tokenAcces);
			logger.info("##### RESULT"+gson.toJson(response)+" #######");
		}catch(Exception ex) {
			logger.info("ImplCoordInstalacionesService.class [Error = "+ex.getMessage()+" ]\n");
			
		}
		return response;
	}
	
	
	

}
