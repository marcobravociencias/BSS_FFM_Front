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
import com.mx.totalplay.ffm.cloudweb.plantainterna.service.VistaAuditoriaService;
import com.mx.totalplay.ffm.cloudweb.plantainterna.utils.ConstVistaAuditoria;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.LoginResult;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.ConstantesGeneric;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.ConsumeRest;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.UtileriaGeneral;

@Service
public class ImplVistaAuditoriaService implements VistaAuditoriaService{
	
	private final Logger logger = LogManager.getLogger(ImplVistaAuditoriaService.class.getName());
	private final ConsumeRest restCaller;
    private ServiceResponseResult response;
    private final Environment environment;
    private final UtileriaGeneral utilerias;
    private Gson gson = new Gson();
    private final ConstantesGeneric constantesGeneric;
    private final ConstVistaAuditoria constVistaAuditoria;
    
    @Autowired
    public ImplVistaAuditoriaService(ConsumeRest restCaller, Environment environment, UtileriaGeneral utilerias, ConstantesGeneric constantesGeneric, ConstVistaAuditoria constVistaAuditoria) {
    	this.restCaller = restCaller;
        this.environment = environment;
        this.utilerias = utilerias;
        this.constantesGeneric = constantesGeneric;
        this.constVistaAuditoria = constVistaAuditoria;
    }

	@Override
	public ServiceResponseResult consultaAuditoriasVistaAuditoria(String params) {
		logger.info("ImplVistaAuditoriaService.class [metodo = consultaAuditoriasVistaAuditoria() ] \n"+ gson.toJson(params));
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();		
		String tokenAcces = principalDetail.getAccess_token();
        logger.info("consultaAuditoriasVistaAuditoria ## " + tokenAcces);
        String urlRequest = principalDetail.getDireccionAmbiente().concat(constVistaAuditoria.getConsultaAuditoriasVistaAuditoria());
        logger.info("URL ##+" + urlRequest);
        
        JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
        Map<String, String> paramsRequest = new HashMap<>(); 
		
        ServiceResponseResult response = restCaller.callGetBearerTokenRequest(
        		paramsRequest, urlRequest,
                ServiceResponseResult.class, tokenAcces);
        
        logger.info("response#### "+gson.toJson(response));
        
        return response;
	}

	@Override
	public ServiceResponseResult consultaDetalleAuditoriaTecnicoVistaAuditoria(String params) {
		logger.info("ImplVistaAuditoriaService.class [metodo = consultaDetalleAuditoriaTecnicoVistaAuditoria() ] \n"+ gson.toJson(params));
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();		
		String tokenAcces = principalDetail.getAccess_token();
        logger.info("consultaDetalleAuditoriaTecnicoVistaAuditoria ## " + tokenAcces);
        String urlRequest = principalDetail.getDireccionAmbiente().concat(constVistaAuditoria.getConsultaAuditoriasVistaAuditoria());
        logger.info("URL ##+" + urlRequest);
        
        JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
        Map<String, String> paramsRequest = new HashMap<>(); 
		
        ServiceResponseResult response = restCaller.callGetBearerTokenRequest(
        		paramsRequest, urlRequest,
                ServiceResponseResult.class, tokenAcces);
        
        logger.info("response#### "+gson.toJson(response));
        
        return response;
	}

	@Override
	public ServiceResponseResult consultaDetalleAuditoriaVistaAuditoria(String params) {
		logger.info("ImplVistaAuditoriaService.class [metodo = consultaDetalleAuditoriaVistaAuditoria() ] \n"+ gson.toJson(params));
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();		
		String tokenAcces = principalDetail.getAccess_token();
        logger.info("consultaDetalleAuditoriaVistaAuditoria ## " + tokenAcces);
        String urlRequest = principalDetail.getDireccionAmbiente().concat(constVistaAuditoria.getConsultaAuditoriasVistaAuditoria());
        logger.info("URL ##+" + urlRequest);
        
        JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
        Map<String, String> paramsRequest = new HashMap<>(); 
		
        ServiceResponseResult response = restCaller.callGetBearerTokenRequest(
        		paramsRequest, urlRequest,
                ServiceResponseResult.class, tokenAcces);
        
        logger.info("response#### "+gson.toJson(response));
        
        return response;
	}
}
