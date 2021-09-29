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
import com.mx.totalplay.ffm.cloudweb.plantaexterna.service.InspectorIncidenciaService;
import com.mx.totalplay.ffm.cloudweb.plantaexterna.utils.ConstInspectorIncidencia;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.DataTableResponse;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.LoginResult;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.ConstantesGeneric;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.ConsumeRest;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.UtileriaGeneral;

@Service
public class ImplInspectorIncidenciaService implements InspectorIncidenciaService{
	
	private final Logger logger = LogManager.getLogger(ImplInspectorIncidenciaService.class.getName());
	private final ConsumeRest restCaller;
    private final ConstantesGeneric constantesGeneric;
    private final Environment env;
    private final ConstInspectorIncidencia constInspectorIncidencia;
    private final UtileriaGeneral utilerias;
    Gson gson = new Gson();

    @Autowired
    public ImplInspectorIncidenciaService(ConsumeRest restCaller, ConstantesGeneric constantesGeneric,  Environment env, ConstInspectorIncidencia constInspectorIncidencia, UtileriaGeneral utilerias) {
    	this.restCaller = restCaller;
    	this.constantesGeneric = constantesGeneric;
    	this.env = env;
    	this.constInspectorIncidencia = constInspectorIncidencia;
    	this.utilerias = utilerias;
    }
    
	@Override
	public ServiceResponseResult consultarFallasInspectorPE(String params) {
		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		logger.info("ImplInspectorIncidencia.class [metodo = consultarFallasInspectorPE() ]\n" + jsonObject);
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
		
		String idPropietario = principalDetail.getPropietario();
		
		String tokenAccess = principalDetail.getAccess_token();
	    logger.info("consultarFallas ##+" + tokenAccess);
	    String urlRequest = principalDetail.getDireccionAmbiente().concat(constInspectorIncidencia.getConsultaOTTipoOrdenesPorUsuario());
	    logger.info("URL ##+" + urlRequest);
	     
	    Map<String, String> paramsRequestGet = new HashMap<String, String>();
	
	    ServiceResponseResult response = restCaller.callGetBearerTokenRequest(paramsRequestGet, urlRequest, ServiceResponseResult.class, tokenAccess);
	     
		return response;
	}
	
	@Override
	public ServiceResponseResult consultarStatusFallasInspectorPE(String params) {
		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		logger.info("ImplInspectorIncidencia.class [metodo = consultarStatusFallasInspectorPE() ]\n" + jsonObject);
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
		
		String idPropietario = principalDetail.getPropietario();
		
		String tokenAccess = principalDetail.getAccess_token();
	    logger.info("consultarStatusFallas ##+" + tokenAccess);
	    String urlRequest = principalDetail.getDireccionAmbiente().concat(constInspectorIncidencia.getConsultaOTTipoOrdenesPorUsuario());
	    logger.info("URL ##+" + urlRequest);
	     
	    Map<String, String> paramsRequestGet = new HashMap<String, String>();
	
	    ServiceResponseResult response = restCaller.callGetBearerTokenRequest(paramsRequestGet, urlRequest, ServiceResponseResult.class, tokenAccess);
	     
		return response;
	}

	@Override
	public ServiceResponseResult consultarIncidenciasInspectorPE(String params) {
		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		logger.info("ImplInspectorIncidencia.class [metodo = consultarIncidenciasInspectorPE() ] \n" + jsonObject);
				
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
		String tokenAccess = principalDetail.getAccess_token();
		logger.info("consultarIncidenciasInspectorPE ## "+tokenAccess);
		
		String urlRequest = principalDetail.getDireccionAmbiente().concat(constInspectorIncidencia.getConsultaOTTipoOrdenesPorUsuario());
		logger.info("URL ##" + urlRequest);
		
		Map<String, String> paramsRequestGet = new HashMap<String, String>();
		
		ServiceResponseResult response = restCaller.callGetBearerTokenRequest(paramsRequestGet, urlRequest, ServiceResponseResult.class, tokenAccess);
		
		return response;
	}

	@Override
	public ServiceResponseResult consultarDetalleIncidenciaInspectorPE(String params) {
		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		logger.info("ImplInspectorIncidencia.class [metodo = consultarDetalleIncidenciaInspectorPE() ] \n"+ jsonObject);
		
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
		String tokenAccess = principalDetail.getAccess_token();
		logger.info("consultarDetalleIncidenciaInspectorPE ## "+ tokenAccess);
		
		String urlRequest = principalDetail.getDireccionAmbiente().concat(constInspectorIncidencia.getConsultaOTTipoOrdenesPorUsuario());
		logger.info("URL ##"+ urlRequest);
		
		Map<String, String> paramsRequestGet = new HashMap<String, String>();
		
		ServiceResponseResult response = restCaller.callGetBearerTokenRequest(paramsRequestGet, urlRequest, ServiceResponseResult.class, tokenAccess);
		
		return response;
	}

	@Override
	public ServiceResponseResult consultarCatalogoRechazoIncidenciaInspectorPE(String params) {
		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		logger.info("ImplInspectorIncidencia.class [metodo = consultarCatalogoRechazoIncidenciaInspectorPE() ] \n"+ jsonObject);
		
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
		String idPropietario = principalDetail.getPropietario();
		String tokenAccess = principalDetail.getAccess_token();
		logger.info("consultarCatalogoRechazoIncidenciaInspectorPE ## "+ tokenAccess);
		
		String urlRequest = principalDetail.getDireccionAmbiente().concat(constInspectorIncidencia.getConsultaOTTipoOrdenesPorUsuario());
		logger.info("URL ##"+ urlRequest);
		
		Map<String, String> paramsRequestGet = new HashMap<String, String>();
		
		ServiceResponseResult response = restCaller.callGetBearerTokenRequest(paramsRequestGet, urlRequest, ServiceResponseResult.class, tokenAccess);
		
		return response;
	}

	@Override
	public ServiceResponseResult cambiarStatusIncidenciaInspectorPE(String params) {
		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		logger.info("ImplInspectorIncidencia.class [metodo = cambiarStatusIncidenciaInspectorPE() ] \n"+ jsonObject);
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
		String tokenAccess = principalDetail.getAccess_token();
		logger.info("cambiarStatusIncidenciaInspectorPE ## "+ tokenAccess);
		
		String urlRequest = principalDetail.getDireccionAmbiente().concat(constInspectorIncidencia.getConsultaOTTipoOrdenesPorUsuario());
		logger.info("URL ##"+ urlRequest);
		
		Map<String, String> paramsRequestGet = new HashMap<String, String>();
		
		ServiceResponseResult response = restCaller.callGetBearerTokenRequest(paramsRequestGet, urlRequest, ServiceResponseResult.class, tokenAccess);
		
		return response;
	}

}