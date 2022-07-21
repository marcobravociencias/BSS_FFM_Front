package com.mx.totalplay.ffm.cloudweb.projectmanager.service.impl;

import java.util.HashMap;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.mx.totalplay.ffm.cloudweb.projectmanager.service.OportunidadService;
import com.mx.totalplay.ffm.cloudweb.projectmanager.utils.ConstOportunidades;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.LoginResult;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.ConstantesGeneric;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.ConsumeRest;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.UtileriaGeneral;

@Service
public class ImplOportunidadService implements OportunidadService{
	
	private final Logger logger = LogManager.getLogger(ImplOportunidadService.class.getName());
    private final ConsumeRest restCaller;
    private ServiceResponseResult response;
    private final Environment environment;
    private final UtileriaGeneral utilerias;
    private Gson gson = new Gson();
    private final ConstantesGeneric constantesGeneric;
    private final ConstOportunidades constOportunidades;
    
    @Autowired
	public ImplOportunidadService(ConsumeRest restCaller, Environment environment, UtileriaGeneral utilerias,
			ConstantesGeneric constantesGeneric, ConstOportunidades constOportunidades) {
		this.restCaller = restCaller;
		this.environment = environment;
		this.utilerias = utilerias;
		this.constantesGeneric = constantesGeneric;
		this.constOportunidades = constOportunidades;
	}

	@Override
	public ServiceResponseResult consultarOportunidades(String params) {
		logger.info("ImplOportunidadService.class consultarOportunidades(): \n" + params);
        LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
        String tokenAcces = principalDetail.getAccess_token();
        String urlRequest = principalDetail.getDireccionAmbiente().concat(constOportunidades.getConsultarOportunidades());
        logger.info("###URL consultarOportunidades(): "+ urlRequest);
        ServiceResponseResult response = restCaller.callPostBearerTokenRequest(
                params,
                urlRequest,
                ServiceResponseResult.class,
                tokenAcces);
        logger.info("### RESULT consultarOportunidades(): " + gson.toJson(response));
        return response;
	}

	@Override
	public ServiceResponseResult consultarDetalleOportunidad(String params) {
		logger.info("ImplOportunidadService.class consultarDetalleOportunidad(): \n" + params);
		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
        String tokenAcces = principalDetail.getAccess_token();
        String urlRequest = principalDetail.getDireccionAmbiente().concat(constOportunidades.getConsultarDetalleOportunidad());
        logger.info("###URL consultarOportunidades(): "+ urlRequest);
        Map<String, String> paramsRequestGet = new HashMap<>();
        paramsRequestGet.put("oportunidad", jsonObject.get("oportunidad").getAsString());
        ServiceResponseResult response = restCaller.callGetBearerTokenRequest(
                paramsRequestGet,
                urlRequest,
                ServiceResponseResult.class,
                tokenAcces);
        logger.info("### RESULT consultarDetalleOportunidad(): " + gson.toJson(response));
        return response;
	}

}
