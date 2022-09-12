package com.mx.totalplay.ffm.cloudweb.generic.service.impl;

import java.util.HashMap;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.mx.totalplay.ffm.cloudweb.generic.service.GestionModulosService;
import com.mx.totalplay.ffm.cloudweb.generic.utils.ConstGestionModulos;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.LoginResult;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.ConstantesGeneric;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.ConsumeRest;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.UtileriaGeneral;

@Service
public class ImplGestionModulosService implements GestionModulosService {
	private  final Logger logger = LogManager.getLogger(ImplGestionModulosService.class.getName());
	private final ConstGestionModulos constGestionModulos;
	private final ConsumeRest restCaller;
	private final UtileriaGeneral utilerias;
	private Gson gson=new Gson();
	
	@Autowired
	public ImplGestionModulosService(ConstGestionModulos constGestionModulos, ConsumeRest restCaller, UtileriaGeneral utilerias) {
		this.constGestionModulos = constGestionModulos;
		this.restCaller = restCaller;
		this.utilerias = utilerias;
	}
	
	@Override
	public ServiceResponseResult consultarPropietarios() {
		logger.info("ImplGestionModulosService.class [metodo = consultarPropietarios() ]\n");
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
		Map<String, String> paramsRequestGet = new HashMap<String, String>();
		String tokenAcces = principalDetail.getAccess_token(); 
		String url = principalDetail.getDireccionAmbiente().concat(constGestionModulos.getConsultarPropietarios());
//		String url = "http://localhost".concat(constGestionModulos.getConsultarPropietarios());
		ServiceResponseResult response= restCaller.callGetBearerTokenRequest(paramsRequestGet, url, ServiceResponseResult.class, tokenAcces);
		logger.info("RESULT consultarPropietarios: " + gson.toJson(response));
		return response;
	}
	
	@Override
	public ServiceResponseResult consultarUnidadesNegocio() {
		logger.info("ImplGestionModulosService.class [metodo = consultarUnidadesNegocio() ]\n");
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
		Map<String, String> paramsRequestGet = new HashMap<String, String>();
		String tokenAcces = principalDetail.getAccess_token(); 
		String url = principalDetail.getDireccionAmbiente().concat(constGestionModulos.getConsultarUnidadesNegocio());
//		String url = "http://localhost".concat(constGestionModulos.getConsultarUnidadesNegocio());
		ServiceResponseResult response= restCaller.callGetBearerTokenRequest(paramsRequestGet, url, ServiceResponseResult.class, tokenAcces);
		logger.info("RESULT consultarUnidadesNegocio: " + gson.toJson(response));
		return response;
	}
	
	@Override
	public ServiceResponseResult consultarModulosPermisos(String params) {
		logger.info("ImplGestionModulosService.class [metodo = consultarModulosPermisos() ]\n");
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		Map<String, String> paramsRequestGet = new HashMap<String, String>();
		paramsRequestGet.put("idPropietario", jsonObject.get("idPropietario").getAsString());
		paramsRequestGet.put("idUnidadNegocio", jsonObject.get("idUnidadNegocio").getAsString());
		logger.info("json object params## "+ params);
		String tokenAcces = principalDetail.getAccess_token();
		String url = principalDetail.getDireccionAmbiente().concat(constGestionModulos.getConsultarModulosPermisos());
//		String url = "http://localhost".concat(constGestionModulos.getConsultarModulosPermisos());
		ServiceResponseResult response= restCaller.callGetBearerTokenRequest(paramsRequestGet, url, ServiceResponseResult.class, tokenAcces);
		logger.info("RESULT consultarModulosPermisos: " + gson.toJson(response));
		return response;
	}
	
	@Override
	public ServiceResponseResult guardarModuloPermiso(String params) {
		logger.info("ImplGestionModulosService.class [metodo = guardarModuloPermiso() ]\n");
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		String tokenAcces = principalDetail.getAccess_token(); 
		logger.info("json object params##-> " + jsonObject.toString());	
		String url = principalDetail.getDireccionAmbiente().concat(constGestionModulos.getGuardarModuloPermiso());
//		String url = "http://localhost".concat(constGestionModulos.getGuardarModuloPermiso());
		ServiceResponseResult response= restCaller.callPostBearerTokenRequest(jsonObject.toString(), url, ServiceResponseResult.class, tokenAcces);
		logger.info("RESULT guardarModuloPermiso: " + gson.toJson(response));
		return response;
	}
	
	@Override
	public ServiceResponseResult modificarModuloPermiso(String params) {
		logger.info("ImplGestionModulosService.class [metodo = modificarModuloPermiso() ]\n");
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		Map<String, String> paramsRequestGet = new HashMap<String, String>();
		String tokenAcces = principalDetail.getAccess_token(); 
		logger.info("json object params##-> " + jsonObject.toString());	
		String url = principalDetail.getDireccionAmbiente().concat(constGestionModulos.getModificarModuloPermiso());
//		String url = "http://localhost".concat(constGestionModulos.getModificarModuloPermiso());
		ServiceResponseResult response= restCaller.callPatchBearerTokenRequestURL(paramsRequestGet,jsonObject.toString(), url, ServiceResponseResult.class, tokenAcces);
		logger.info("RESULT modificarModuloPermiso: " + gson.toJson(response));
		return response;
	}
	
	@Override
	public ServiceResponseResult eliminarModuloPermiso(String params) {
		logger.info("ImplGestionModulosService.class [metodo = eliminarModuloPermiso() ]\n");
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		Map<String, String> paramsRequestGet = new HashMap<String, String>();
		paramsRequestGet.put("idPermiso", jsonObject.get("idPermiso").getAsString());
		String tokenAcces = principalDetail.getAccess_token(); 
		logger.info("json object params##-> " + jsonObject.toString());	
		String url = principalDetail.getDireccionAmbiente().concat(constGestionModulos.getEliminarModuloPermiso());
//		String url = "http://localhost".concat(constGestionModulos.getEliminarModuloPermiso());
		ServiceResponseResult response= restCaller.callDeleteBearerTokenRequest(paramsRequestGet, url, ServiceResponseResult.class, tokenAcces);
		logger.info("RESULT eliminarModuloPermiso: " + gson.toJson(response));
		return response;
	}
}
