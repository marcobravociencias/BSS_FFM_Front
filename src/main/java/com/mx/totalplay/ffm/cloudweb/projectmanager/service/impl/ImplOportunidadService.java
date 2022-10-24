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
       // logger.info("### RESULT consultarOportunidades(): " + gson.toJson(response));
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
        //logger.info("### RESULT consultarDetalleOportunidad(): " + gson.toJson(response));
        return response;
	}

    @Override
    public ServiceResponseResult consultarLiderTorreControlList(String params) {
        logger.info("ImplOportunidadService.class consultarLiderTorreControlList(): \n" + params);
        JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
        LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
        String oportunidad = jsonObject.get("oportunidad").getAsString();
        String tokenAcces = principalDetail.getAccess_token();
        String urlRequest = principalDetail.getDireccionAmbiente().concat(constOportunidades.getConsultarLiderTecnicoTorreControlList().concat("?oportunidad="+oportunidad));
        logger.info("###URL consultarLiderTorreControlList(): "+ urlRequest);
        Map<String, String> paramsRequestGet = new HashMap<>();
        //paramsRequestGet.put("oportunidad", jsonObject.get("oportunidad").getAsString());
        ServiceResponseResult response = restCaller.callGetBearerTokenRequest(
                paramsRequestGet,
                urlRequest,
                ServiceResponseResult.class,
                tokenAcces);
        //logger.info("### RESULT consultarLiderTorreControlList(): " + gson.toJson(response));
        return response;
    }

    @Override
    public ServiceResponseResult consultarEnImplementacion(String params) {
        logger.info("ImplOportunidadService.class consultarEnImplementacion(): \n" + params);
        JsonObject jsonObject = gson.fromJson(params, JsonObject.class);

        String oportunidad = "";
        if(jsonObject.get("oportunidad") != null) oportunidad = jsonObject.get("oportunidad").getAsString();
        String region =  jsonObject.get("region").getAsString();
        String csp = jsonObject.get("csp").getAsString();
        String fecha = jsonObject.get("fecha").getAsString();
        String estatusot = jsonObject.get("estatusot").getAsString();

        LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
        String tokenAcces = principalDetail.getAccess_token();
        String urlRequest = principalDetail.getDireccionAmbiente().concat(constOportunidades.getConsultarEnImplementacion().concat("?oportunidad=" + oportunidad).concat("&region="+region).concat("&csp="+csp).concat("&fecha="+fecha).concat("&estatusot=")+estatusot);
        logger.info("###URL consultarEnImplementacion(): "+ urlRequest);
        Map<String, String> paramsRequestGet = new HashMap<>();
//        paramsRequestGet.put("oportunidad", jsonObject.get("oportunidad").getAsString());
//        paramsRequestGet.put("region", jsonObject.get("region").getAsString());
//        paramsRequestGet.put("csp", jsonObject.get("csp").getAsString());
//        paramsRequestGet.put("fecha", jsonObject.get("fecha").getAsString());
//        paramsRequestGet.put("estatusot", jsonObject.get("estatusot").getAsString());
        ServiceResponseResult response = restCaller.callGetBearerTokenRequest(
                paramsRequestGet,
                urlRequest,
                ServiceResponseResult.class,
                tokenAcces);
        //logger.info("### RESULT consultarEnImplementacion(): " + gson.toJson(response));
        return response;
    }

    @Override
    public ServiceResponseResult updateTorreControl(String params) {
        logger.info("ImplOportunidadService.class [metodo = updateTorreControl() ]\n" + params);
        LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();

        JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
        String tokenAcces = principalDetail.getAccess_token();
        String urlRequest = principalDetail.getDireccionAmbiente().concat(constOportunidades.getActualizarEnImplementacion());
        logger.info("URL ##" + urlRequest);

        Map<String, String> paramsRequestGet = new HashMap<String, String>();

        ServiceResponseResult response = restCaller.callPostBearerTokenRequest(jsonObject.toString(), urlRequest,
                ServiceResponseResult.class, tokenAcces);
        //logger.info(response);
        return response;
    }

}
