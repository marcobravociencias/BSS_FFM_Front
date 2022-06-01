package com.mx.totalplay.ffm.cloudweb.plantainterna.service.impl;

import com.google.gson.Gson;
import com.google.gson.JsonObject;

import java.util.HashMap;
import java.util.Map;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import com.mx.totalplay.ffm.cloudweb.plantainterna.service.VistaChecklistService;
import com.mx.totalplay.ffm.cloudweb.plantainterna.utils.ConstVistaChecklist;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.LoginResult;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.ConstantesGeneric;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.ConsumeRest;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.UtileriaGeneral;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ImplVistaChecklistService implements VistaChecklistService{
    private  final Logger logger = LogManager.getLogger(ImplDespachoPIService.class.getName());
	private final ConstantesGeneric constantesAmbiente;
	private final ConstVistaChecklist constVistaChecklist;
	private final ConsumeRest restCaller;
	private final UtileriaGeneral utilerias;
	private Gson gson=new Gson();
	
	@Autowired
	public ImplVistaChecklistService(ConstantesGeneric constantesAmbiente, ConsumeRest restCaller, UtileriaGeneral utilerias, ConstVistaChecklist constVistaChecklist) {
		this.constantesAmbiente = constantesAmbiente;
		this.restCaller = restCaller;
		this.utilerias = utilerias;
		this.constVistaChecklist = constVistaChecklist;
	}
	
    @Override
	public ServiceResponseResult consultaEvidenciasChecklist(String params) {
		logger.info("ImplVistaChecklistService.class [metodo = consultaEvidenciasChecklist() ]\n");
        LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();

        JsonObject jsonObject = gson.fromJson(params, JsonObject.class);

        String tokenAcces = principalDetail.getAccess_token();
        String urlRequest = principalDetail.getDireccionAmbiente().concat(constVistaChecklist.getConsultaEvidenciasChecklist());
        logger.info("URL ##+" + urlRequest);

        Map<String, String> paramsRequestGet = new HashMap<String, String>();
        //paramsRequestGet.put("fechaInicio", jsonObject.get("fechaInicio").getAsString());

        ServiceResponseResult response = restCaller.callGetBearerTokenRequest(paramsRequestGet, urlRequest,
                ServiceResponseResult.class, tokenAcces);
        return response;
	}
    
    @Override
	public ServiceResponseResult consultaDetalleEvidenciaChecklist(String params) {
		logger.info("ImplVistaChecklistService.class [metodo = consultaDetalleEvidenciaChecklist() ]\n");
        LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();

        JsonObject jsonObject = gson.fromJson(params, JsonObject.class);

        String tokenAcces = principalDetail.getAccess_token();
        String urlRequest = principalDetail.getDireccionAmbiente().concat(constVistaChecklist.getConsultaDetalleEvidenciaChecklist());
        logger.info("URL ##+" + urlRequest);

        Map<String, String> paramsRequestGet = new HashMap<String, String>();
        paramsRequestGet.put("idOt", jsonObject.get("idOt").getAsString());
        paramsRequestGet.put("idUsuario", jsonObject.get("idUsuario").getAsString());

        ServiceResponseResult response = restCaller.callGetBearerTokenRequest(paramsRequestGet, urlRequest,
                ServiceResponseResult.class, tokenAcces);
        return response;
	}
    
    @Override
   	public ServiceResponseResult guardarEvidenciaChecklist(String params) {
   		logger.info("ImplVistaChecklistService.class [metodo = guardarEvidenciaChecklist() ]\n");
           LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();

           JsonObject jsonObject = gson.fromJson(params, JsonObject.class);

           String tokenAcces = principalDetail.getAccess_token();
           String urlRequest = principalDetail.getDireccionAmbiente().concat(constVistaChecklist.getGuardarEvidenciaChecklist());
           logger.info("URL ##+" + urlRequest);

           ServiceResponseResult response = restCaller.callPatchBearerTokenRequest(params, urlRequest,
                   ServiceResponseResult.class, tokenAcces);
           return response;
   	}
}
