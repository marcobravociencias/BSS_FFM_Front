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
import com.mx.totalplay.ffm.cloudweb.plantainterna.service.GestionTecnicosService;
import com.mx.totalplay.ffm.cloudweb.plantainterna.utils.ConstGestionTecnicos;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.LoginResult;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.ConstantesGeneric;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.ConsumeRest;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.UtileriaGeneral;

@Service
public class ImplGestionTecnicosService implements GestionTecnicosService {

	private final Logger logger = LogManager.getLogger(ImplGestionTecnicosService.class.getName());
	private final ConsumeRest restCaller;
	private ServiceResponseResult response;
	private final Environment environment;
	private final UtileriaGeneral utilerias;
	private Gson gson = new Gson();
	private final ConstantesGeneric constantesGeneric;
	private final ConstGestionTecnicos constGestionTecnicos;

	@Autowired
	public ImplGestionTecnicosService(ConsumeRest restCaller, Environment environment, UtileriaGeneral utilerias,
			ConstantesGeneric constantesGeneric, ConstGestionTecnicos constGestionTecnicos) {
		this.restCaller = restCaller;
		this.environment = environment;
		this.utilerias = utilerias;
		this.constantesGeneric = constantesGeneric;
		this.constGestionTecnicos = constGestionTecnicos;
	}

	@Override
	public ServiceResponseResult consultaMotivosGestionTecnicos() {
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
		String tokenAccess = principalDetail.getAccess_token();
		logger.info("consultarMotivosGestionTecnicos ## " + tokenAccess);
		String urlRequest = principalDetail.getDireccionAmbiente().concat(constGestionTecnicos.getConsultaMotivosGestionTecnicos());
		logger.info("### URL consultarMotivosGestionTecnicos():" + urlRequest);
		
		Map<String, String> paramsRequestGet = new HashMap<String, String>();
		ServiceResponseResult response = restCaller.callGetBearerTokenRequest(
				paramsRequestGet, 
				urlRequest,
				ServiceResponseResult.class, 
				tokenAccess);
		logger.info("### RESULT consultarMotivosGestionTecnicos(): " + gson.toJson(response));
		return response;
	}

	@Override
	public ServiceResponseResult consultaTecnicosGestionTecnicos(String params) {
		logger.info("ImplSoporteGestionTecnicos.class [metodo = consultaTecnicosGestionTecnicos() ] \n"+ gson.toJson(params));
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
		String tokenAccess = principalDetail.getAccess_token();
		logger.info("consultaTecnicosGestionTecnicos ## " + tokenAccess);
		String urlRequest = principalDetail.getDireccionAmbiente().concat(constGestionTecnicos.getConsultaTecnicosGestionTecnicos());
		logger.info("### URL consultaTecnicosGestionTecnicos():" + urlRequest);
		
		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		Map<String, String> paramsRequest = new HashMap<String, String>();
		ServiceResponseResult response = restCaller.callGetBearerTokenRequest(
				paramsRequest, 
				urlRequest,
				ServiceResponseResult.class, 
				tokenAccess);
		logger.info("### RESULT consultaTecnicosGestionTecnicos(): " + gson.toJson(response));
		return response;
	}

	@Override
	public ServiceResponseResult consultaDisponibilidadTecGestionTecnicos(String params) {
		logger.info("ImplSoporteGestionTecnicos.class [metodo = consultaDisponibilidadTecGestionTecnicos() ] \n"+ gson.toJson(params));
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
		String tokenAccess = principalDetail.getAccess_token();
		logger.info("consultaDisponibilidadTecGestionTecnicos ## " + tokenAccess);
		String urlRequest = principalDetail.getDireccionAmbiente().concat(constGestionTecnicos.getConsultaDisponibilidadTecGestionTecnicos());
		logger.info("### URL consultaDisponibilidadTecGestionTecnicos():" + urlRequest);
		
		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		Map<String, String> paramsRequest = new HashMap<String, String>();
		ServiceResponseResult response = restCaller.callGetBearerTokenRequest(
				paramsRequest, 
				urlRequest,
				ServiceResponseResult.class, 
				tokenAccess);
		logger.info("### RESULT consultaDisponibilidadTecGestionTecnicos(): " + gson.toJson(response));
		return response;
	}

	@Override
	public ServiceResponseResult consultaDisponibilidadAuxGestionTecnicos(String params) {
		logger.info("ImplSoporteGestionTecnicos.class [metodo = consultaDisponibilidadAuxGestionTecnicos() ] \n"+ gson.toJson(params));
		
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
		String tokenAccess = principalDetail.getAccess_token();
		logger.info("consultaDisponibilidadAuxGestionTecnicos ## " + tokenAccess);
		String urlRequest = principalDetail.getDireccionAmbiente().concat(constGestionTecnicos.getConsultaDisponibilidadAuxGestionTecnicos());
		logger.info("### URL consultaDisponibilidadAuxGestionTecnicos():" + urlRequest);
		
		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		Map<String, String> paramsRequest = new HashMap<String, String>();
		ServiceResponseResult response = restCaller.callGetBearerTokenRequest(
				paramsRequest, 
				urlRequest,
				ServiceResponseResult.class, 
				tokenAccess);
		logger.info("### RESULT consultaDisponibilidadAuxGestionTecnicos(): " + gson.toJson(response));
		return response;
	}
}
