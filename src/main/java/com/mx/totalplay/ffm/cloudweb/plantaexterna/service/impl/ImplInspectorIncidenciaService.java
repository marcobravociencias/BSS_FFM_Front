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
	public ServiceResponseResult consultarFallas(String params) {
		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		logger.info("ImplInspectorIncidencia.class [metodo = consultarFallas() ]\n" + jsonObject);
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
		
		String idPropietario = jsonObject.get("idPropietario").getAsString();
		
		String tokenAcces = principalDetail.getAccess_token();
	    logger.info("consultarFallas ##+" + tokenAcces);
	    String urlRequest = principalDetail.getDireccionAmbiente().concat(constInspectorIncidencia.getConsultarFallas());
	    logger.info("URL ##+" + urlRequest);
	     
	    Map<String, String> paramsRequestGet = new HashMap<String, String>();
	       paramsRequestGet.put("idPropietario", idPropietario);
	
	    ServiceResponseResult response = restCaller.callGetBearerTokenRequest(paramsRequestGet, urlRequest, ServiceResponseResult.class, tokenAcces);
	     
		return response;
	}

	@Override
	public DataTableResponse consultarIncidenciasInspector(String params) {
		// TODO Auto-generated method stub
		return null;
	}

	

}
