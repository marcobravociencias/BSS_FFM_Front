package com.mx.totalplay.ffm.cloudweb.plantaexterna.service.impl;

import java.util.HashMap;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.mx.totalplay.ffm.cloudweb.plantaexterna.service.InspectorCoberturaService;
import com.mx.totalplay.ffm.cloudweb.plantaexterna.utils.ConstInspectorCobertura;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.DataTableResponse;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.LoginResult;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.ConstantesGeneric;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.ConsumeRest;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.UtileriaGeneral;


@Service
public class ImplInspectorCoberturaService implements InspectorCoberturaService {
    private final Logger logger = LogManager.getLogger(ImplInspectorCoberturaService.class.getName());
	private final ConsumeRest restCaller;
    private final ConstInspectorCobertura constInspectorCobertura;
    private final UtileriaGeneral utilerias;
    Gson gson = new Gson();

    @Autowired
    public ImplInspectorCoberturaService(ConsumeRest restCaller, ConstInspectorCobertura constInspectorCobertura, UtileriaGeneral utilerias) {
    	this.restCaller = restCaller;
    	this.constInspectorCobertura = constInspectorCobertura;
    	this.utilerias = utilerias;
    }

    @Override
	public ServiceResponseResult consultarFallasCoberturaPE(String params) {
		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		logger.info("ImplInspectorCobertura.class [metodo = consultarFallasCoberturaPE() ]\n" + jsonObject);
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
		
		String id = jsonObject.get("id").getAsString();
		
		String tokenAccess = principalDetail.getAccess_token();
	    logger.info("consultarFallas ##+" + tokenAccess);
	    String urlRequest = principalDetail.getDireccionAmbiente().concat(constInspectorCobertura.getConsultaFallasInspectorCoberturaPE());
	    logger.info("URL ##+" + urlRequest);
	     
	    Map<String, String> paramsRequestGet = new HashMap<String, String>();
	
	    ServiceResponseResult response = restCaller.callGetBearerTokenRequest(paramsRequestGet, urlRequest, ServiceResponseResult.class, tokenAccess);
	    logger.info("RESULT" + gson.toJson(response));
		return response;
	}

	@Override
	public ServiceResponseResult consultarFiltrosCoberturaPE(String params) {
		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		logger.info("ImplInspectorCobertura.class [metodo = consultarFiltrosCoberturaPE() ]\n" + jsonObject);
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
		
		String id= jsonObject.get("id").getAsString();
		
		String tokenAccess = principalDetail.getAccess_token();
	    logger.info("consultarFiltros ##+" + tokenAccess);
	    String urlRequest = principalDetail.getDireccionAmbiente().concat(constInspectorCobertura.getConsultaFiltrosInspectorCoberturaPE());
	    logger.info("URL ##+" + urlRequest);
	     
	    Map<String, String> paramsRequestGet = new HashMap<String, String>();
	
	    ServiceResponseResult response = restCaller.callGetBearerTokenRequest(paramsRequestGet, urlRequest, ServiceResponseResult.class, tokenAccess);
	    logger.info("RESULT" + gson.toJson(response));
		return response;
	}

	@Override
	public ServiceResponseResult consultarIncidenciasCoberturaPE(String params) {
		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		logger.info("ImplInspectorCobertura.class [metodo = consultarIncidenciasCoberturaPE() ]\n" + jsonObject);
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
				
		String tokenAccess = principalDetail.getAccess_token();
	    logger.info("consultarIncidencias ##+" + tokenAccess);
	    String urlRequest = principalDetail.getDireccionAmbiente().concat(constInspectorCobertura.getConsultaIncidenciasInspectorCoberturaPE());
	    logger.info("URL ##+" + urlRequest);
	     
	    Map<String, String> paramsRequestGet = new HashMap<String, String>();
		paramsRequestGet.put("idsFallas",  jsonObject.get("idFalla").getAsString());
		paramsRequestGet.put("fechaInicio",  jsonObject.get("fechaInicio").getAsString());
		paramsRequestGet.put("fechaFin", jsonObject.get("fechaFin").getAsString() );

	    ServiceResponseResult response = restCaller.callGetBearerTokenRequest(paramsRequestGet, urlRequest, ServiceResponseResult.class, tokenAccess);
	    logger.info("RESULT" + gson.toJson(response));
		return response;
	}

	
}
