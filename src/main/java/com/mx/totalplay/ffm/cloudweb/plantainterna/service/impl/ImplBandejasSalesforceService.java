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
import com.mx.totalplay.ffm.cloudweb.plantainterna.service.BandejasSalesforceService;
import com.mx.totalplay.ffm.cloudweb.plantainterna.utils.ConstBandejasSalesforce;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.LoginResult;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.ConstantesGeneric;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.ConsumeRest;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.UtileriaGeneral;

@Service
public class ImplBandejasSalesforceService implements BandejasSalesforceService {
	
	private final Logger logger = LogManager.getLogger(ImplBandejasSalesforceService.class.getName());
	private final ConsumeRest restCaller;
    private final ConstantesGeneric constantesGeneric;
    private final Environment env;
    private final ConstBandejasSalesforce constBandejasSalesforce;
    private final UtileriaGeneral utilerias;
    Gson gson = new Gson();
    
    @Autowired
    public ImplBandejasSalesforceService (ConsumeRest restCaller, ConstantesGeneric constantesGeneric,  Environment env, ConstBandejasSalesforce constBandejasSalesforce, UtileriaGeneral utilerias) {
    	this.restCaller = restCaller;
    	this.constantesGeneric = constantesGeneric;
    	this.env = env;
    	this.constBandejasSalesforce = constBandejasSalesforce;
    	this.utilerias = utilerias;
    }

	@Override
	public ServiceResponseResult consultarPendientesAgendarBandejasSF(String params) {
		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		logger.info("ImplBandejasSalesforceService.class [metodo = consultarPendientesAgendarBandejasSF() ] \n" + jsonObject);
		
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
		String tokenAccess = principalDetail.getAccess_token();
		logger.info("consultarPendientesAgendarBandejasSF## "+tokenAccess);
		
		String urlRequest = principalDetail.getDireccionAmbiente().concat(constBandejasSalesforce.getConsultaPendientesAgendarBandejasSF());
		logger.info("URL## " + urlRequest);
		
		ServiceResponseResult response = restCaller.callPostBearerTokenRequest(jsonObject.toString(), urlRequest, ServiceResponseResult.class, tokenAccess);
		
		return response;
	}

	@Override
	public ServiceResponseResult consultarRescataventasBandejasSF(String params) {
		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		logger.info("ImplBandejasSalesforceService.class [metodo = consultarRescataventasBandejasSF() ] \n" + jsonObject);
		
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
		String tokenAccess = principalDetail.getAccess_token();
		logger.info("consultarRescataventasBandejasSF## "+tokenAccess);
		
		String urlRequest = principalDetail.getDireccionAmbiente().concat(constBandejasSalesforce.getConsultaRescataventasBandejasSF());
		logger.info("URL## " + urlRequest);
		
		ServiceResponseResult response = restCaller.callPostBearerTokenRequest(jsonObject.toString(), urlRequest, ServiceResponseResult.class, tokenAccess);
		
		return response;
	}

	@Override
	public ServiceResponseResult consultarPendientesActivarBandejasSF(String params) {
		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		logger.info("ImplBandejasSalesforceService.class [metodo = consultarPendientesActivarBandejasSF() ] \n" + jsonObject);
		
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
		String tokenAccess = principalDetail.getAccess_token();
		logger.info("consultarPendientesActivarBandejasSF## "+tokenAccess);
		
		String urlRequest = principalDetail.getDireccionAmbiente().concat(constBandejasSalesforce.getConsultaPendientesActivarBandejasSF());
		logger.info("URL## " + urlRequest);
		
		ServiceResponseResult response = restCaller.callPostBearerTokenRequest(jsonObject.toString(), urlRequest, ServiceResponseResult.class, tokenAccess);
		
		return response;
	}

	@Override
	public ServiceResponseResult consultarFactibilidadEmpresarialBandejasSF(String params) {
		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		logger.info("ImplBandejasSalesforceService.class [metodo = consultarFactibilidadEmpresarialBandejasSF() ] \n" + jsonObject);
		
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
		String tokenAccess = principalDetail.getAccess_token();
		logger.info("consultarPendientesActivarBandejasSF## "+tokenAccess);
		
		String urlRequest = principalDetail.getDireccionAmbiente().concat(constBandejasSalesforce.getConsultaFactibilidadEmpresarialBandejasSF());
		logger.info("URL## " + urlRequest);
		
		Map<String, String> paramsRequestGet = new HashMap<String, String>();
		paramsRequestGet.put("latitud", jsonObject.get("latitud").getAsString());
		paramsRequestGet.put("longitud", jsonObject.get("longitud").getAsString());
		
		logger.info(paramsRequestGet);

		ServiceResponseResult response = restCaller.callGetBearerTokenRequest(paramsRequestGet, urlRequest,
				ServiceResponseResult.class, tokenAccess);
		return response;
	}
    
    
}
