package com.mx.totalplay.ffm.cloudweb.utilerias.service.impl;

import java.util.HashMap;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.mx.totalplay.ffm.cloudweb.plantainterna.utils.ConstDespachoPI;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.LoginResult;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;
import com.mx.totalplay.ffm.cloudweb.utilerias.service.GenericAccionesService;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.ConstantesGeneric;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.ConsumeRest;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.UtileriaGeneral;

@Service
public class ImplGenericAccionesService implements GenericAccionesService{
	private final Logger logger = LogManager.getLogger(ImplGenericAccionesService.class.getName());
    private Gson gson = new Gson();

    
    private final ConsumeRest restCaller;
    private final UtileriaGeneral utilerias;
    private final ConstantesGeneric constantesAmbiente;

    @Autowired
    public ImplGenericAccionesService(ConstantesGeneric constantesAmbiente, ConstDespachoPI constDespachoPI, ConsumeRest restCaller, UtileriaGeneral utilerias, Environment env) {
        this.constantesAmbiente = constantesAmbiente;
        this.restCaller = restCaller;
        this.utilerias = utilerias;
    }
	public ServiceResponseResult creacionOrdenTrabajoGeneric(String params) {
	        logger.info("ImplDespachoPIService.class [metodo = creacionOrdenTrabajoGeneric() ]\n" + params);
	      	        	        
	        LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
	        JsonObject jsonObject = gson.fromJson(params, JsonObject.class);

	        jsonObject.addProperty("idunidadNegocio", principalDetail.getIdUnidadNegocio());
	        jsonObject.addProperty("idPropietario", principalDetail.getIdPropietario());
	        
	        String tokenAcces = principalDetail.getAccess_token();
	        
	        logger.info("json object params## " + jsonObject.toString());

	        String urlRequest = principalDetail.getDireccionAmbiente()
	                .concat(constantesAmbiente.getGuardarOrdenesUniversales());
	       
	        ServiceResponseResult response = restCaller.callPostBearerTokenRequest(
	                jsonObject.toString(),
	                urlRequest,
	                ServiceResponseResult.class,
	                tokenAcces);
	        
	        return response;
	}
}
