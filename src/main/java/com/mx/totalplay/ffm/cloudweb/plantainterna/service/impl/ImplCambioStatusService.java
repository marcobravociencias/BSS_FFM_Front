package com.mx.totalplay.ffm.cloudweb.plantainterna.service.impl;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.mx.totalplay.ffm.cloudweb.plantainterna.service.CambioStatusService;
import com.mx.totalplay.ffm.cloudweb.plantainterna.utils.ConstCambioStatus;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.LoginResult;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.ConsumeRest;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.UtileriaGeneral;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class ImplCambioStatusService implements CambioStatusService {
    private final Logger logger = LogManager.getLogger(ImplCambioStatusService.class.getName());
    private Gson gson = new Gson();
    private ServiceResponseResult response;
    private final ConstCambioStatus constCambioStatus;
    private final Environment environment;
    private final ConsumeRest rest;
    private final UtileriaGeneral utilerias;

    @Autowired
    public ImplCambioStatusService(ConstCambioStatus constCambioStatus, Environment environment, ConsumeRest rest, UtileriaGeneral utilerias) {
        this.constCambioStatus = constCambioStatus;
        this.environment = environment;
        this.rest = rest;
        this.utilerias = utilerias;
    }

    @Override
    public ServiceResponseResult cambioStatusOts(String params) {
        JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
        LoginResult login = utilerias.obtenerObjetoPrincipal();
        String urlRequest = "";
        String requestTipo = "";
        String token = login.getAccess_token();
        Map<String, String> paramUri = new HashMap<String, String>(){{
            put("idOrden", jsonObject.get("ot").getAsString());
        }};
        
		LoginResult principalDetail=utilerias.obtenerObjetoPrincipal();
		
		jsonObject.addProperty("idUsuarioDespacho", principalDetail.getIdUsuario());
		jsonObject.addProperty("geer", "asdsassda");


 /**       JsonObject paramsObject = new JsonObject();
        paramsObject.addProperty("folioSistema", jsonObject.get("folioSistema").getAsString());
        paramsObject.addProperty("idFlujo", jsonObject.get("idFlujo").getAsInt());
        paramsObject.addProperty("idTipoOrden", jsonObject.get("idTipoOrden").getAsInt());
        paramsObject.addProperty("idSubTipoOrden", jsonObject.get("idSubTipoOrden").getAsInt());
        paramsObject.addProperty("idOrigenSistema", jsonObject.get("idOrigenSistema").getAsInt());
        paramsObject.addProperty("idUsuarioDespacho", principalDetail.getIdUsuario());
        paramsObject.addProperty("idUsuarioTecnico", jsonObject.get("idUsuarioTecnico").getAsInt());
        paramsObject.addProperty("latitud", jsonObject.get("latitud").getAsInt());
        paramsObject.addProperty("longitud", jsonObject.get("longitud").getAsInt());
        paramsObject.addProperty("comentarios", jsonObject.get("comentarios").getAsString());**/
        
        
        switch (jsonObject.get("tipo").getAsString()) {
            case "reagendamiento":
                requestTipo = "patch";
                urlRequest = login.getDireccionAmbiente().concat(constCambioStatus.getCambioDeStatusOts()).concat(environment.getProperty("param.textus.reagendamiento"));
                break;
            case "calendariza":
                requestTipo = "patch";
                urlRequest = login.getDireccionAmbiente().concat(constCambioStatus.getCambioDeStatusOts()).concat(environment.getProperty("param.textus.calendariza"));
                break;
            case "termina":
                requestTipo = "patch";
                urlRequest = login.getDireccionAmbiente().concat(constCambioStatus.getCambioDeStatusOts()).concat(environment.getProperty("param.textus.termina"));
                break;
            case "desasigna":
                requestTipo = "patch";
                urlRequest = "http://94.74.70.52".concat(constCambioStatus.getCambioDeStatusOts()).concat(environment.getProperty("param.textus.desasigna"));
                break;
            case "cancela":
                requestTipo = "patch";
                urlRequest = login.getDireccionAmbiente().concat(constCambioStatus.getCambioDeStatusOts()).concat(environment.getProperty("param.textus.cancela"));

                break;
            case "reasigna":
                requestTipo = "patch";
                urlRequest = login.getDireccionAmbiente().concat(constCambioStatus.getCambioDeStatusOts()).concat(environment.getProperty("param.textus.reasigna"));
            /**    paramsObject.addProperty("fechaHoraInicio", jsonObject.get("idMotivo").getAsString());
                paramsObject.addProperty("fechaHoraFin", jsonObject.get("idTurno").getAsString());
                paramsObject.addProperty("idtipoAsignacion", jsonObject.get("idtipoAsignacion").getAsInt());
             	**/
                break;
            case "asigna":
                requestTipo = "post";
                //urlRequest = login.getDireccionAmbiente().concat(constCambioStatus.getCambioDeStatusOts()).concat(environment.getProperty("param.textus.asigna"));
                urlRequest = "http://94.74.70.52".concat(constCambioStatus.getCambioDeStatusOts()).concat(environment.getProperty("param.textus.asigna"));
                http://94.74.70.52/
                break;
        }
        logger.info("#### URL #### \n" + urlRequest);
        logger.info("### PARAM ### " + paramUri);
        logger.info("### PARAM OBJECT ### " + gson.toJson(jsonObject));

        if (requestTipo.equals("patch")) {
            response = rest.callPatchBearerTokenRequestURL(paramUri, gson.toJson(jsonObject), urlRequest, ServiceResponseResult.class, token);
        } else {
            response = rest.callPostBearerTokenRequestURL2(paramUri,gson.toJson(jsonObject), urlRequest, ServiceResponseResult.class, token);
        }
        logger.info("#### RESULT cambioStatusOts(): \n" + gson.toJson(response));

        return response;
    }
    /**
	@Override
	public ServiceResponseResult cambiarEstatusTecnicoPI(String params) {
		logger.info("ImplDespachoPIService.class [metodo = cambiarEstatusTecnicoPI() ]\n"+params);
	
		JsonObject jsonObject=gson.fromJson(params, JsonObject.class);
		
		String idUsuario=jsonObject.get("idUsuario").getAsString();
		String idEstatus=jsonObject.get("idEstatusUsuario").getAsString();
		
	    LoginResult principalDetail=utilerias.obtenerObjetoPrincipal();
	    
	    logger.info("json object params## "+jsonObject.toString()); 
	    
	    String tokenAcces=principalDetail.getAccess_token();
	    String url=principalDetail.getDireccionAmbiente().concat(constDespachoPI.getCambiarEstatusTecPi());
	    logger.info("URL ##+" + url);
	    
	    Map<String, String> paramsRequestGet = new HashMap<String, String>();
        paramsRequestGet.put("idUsuario", idUsuario);
        paramsRequestGet.put("idEstatusUsuario", idEstatus);
	    
	    ServiceResponseResult response= restCaller.callPostBearerTokenRequestURL(paramsRequestGet, url,
	    		ServiceResponseResult.class, tokenAcces);
	    logger.info("##### RESULT"+gson.toJson(response)+" #######");
		return response;
	}**/
}
