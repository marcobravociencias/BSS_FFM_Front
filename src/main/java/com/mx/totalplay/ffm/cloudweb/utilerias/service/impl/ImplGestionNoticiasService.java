package com.mx.totalplay.ffm.cloudweb.utilerias.service.impl;

import java.util.HashMap;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.LoginResult;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;
import com.mx.totalplay.ffm.cloudweb.utilerias.service.GestionNoticiasService;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.ConstantesGeneric;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.ConsumeRest;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.UtileriaGeneral;

@Service
public class ImplGestionNoticiasService implements GestionNoticiasService{
	
	private final Logger logger = LogManager.getLogger(ImplGenericAccionesService.class.getName());
    private Gson gson = new Gson();
    
    private final ConsumeRest restCaller;
    private final UtileriaGeneral utilerias;
    private final ConstantesGeneric constantesAmbiente;
    
    
    @Autowired
	public ImplGestionNoticiasService(ConsumeRest restCaller, UtileriaGeneral utilerias, ConstantesGeneric constantesAmbiente) {
		this.restCaller = restCaller;
		this.utilerias = utilerias;
		this.constantesAmbiente = constantesAmbiente;
	}

	@Override
	public ServiceResponseResult consultarNoticia() {
        LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
        String tokenAcces = principalDetail.getAccess_token();
        String urlRequest = principalDetail.getDireccionAmbiente().concat(constantesAmbiente.getConsultarNoticiasGeneric());
        logger.info("### URL consultarNoticia(): \n" + urlRequest);
        Map<String, String> paramsRequestGet = new HashMap<>();
        ServiceResponseResult response = restCaller.callGetBearerTokenRequest(
                paramsRequestGet,
                urlRequest,
                ServiceResponseResult.class,
                tokenAcces);

        logger.info("### RESULT consultarNoticia(): " + gson.toJson(response));
        return response;
	}

	@Override
	public ServiceResponseResult registrarNoticia(String params) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ServiceResponseResult actualizarNoticia(String params) {
		// TODO Auto-generated method stub
		return null;
	}

}
