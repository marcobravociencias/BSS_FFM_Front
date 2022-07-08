package com.mx.totalplay.ffm.cloudweb.utilerias.service.impl;

import java.util.*;
import java.util.stream.Collectors;

import com.mx.totalplay.ffm.cloudweb.utilerias.model.Accion;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.jasypt.util.text.AES256TextEncryptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
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

import javax.servlet.http.HttpSession;

@Service
public class ImplGenericAccionesService implements GenericAccionesService{
	private final Logger logger = LogManager.getLogger(ImplGenericAccionesService.class.getName());
    private Gson gson = new Gson();
	private final HttpSession session;
	private final Environment env;

    private final ConsumeRest restCaller;
    private final UtileriaGeneral utilerias;
    private final ConstantesGeneric constantesAmbiente;

    @Autowired
    public ImplGenericAccionesService(ConstantesGeneric constantesAmbiente, ConstDespachoPI constDespachoPI, ConsumeRest restCaller, UtileriaGeneral utilerias, Environment env, HttpSession session) {
        this.constantesAmbiente = constantesAmbiente;
        this.restCaller = restCaller;
        this.utilerias = utilerias;
		this.session = session;
		this.env = env;
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

	@Override
	public ServiceResponseResult agregarMensajeAccionSession(String params) {
		ServiceResponseResult response = ServiceResponseResult.builder().isRespuesta(true).result(null).build();
		JsonObject object = gson.fromJson(params, JsonObject.class);
		List<Accion> accionesList;
		if (session.getAttribute("MODULO_MENSAJES_ACCIONES_RECIENTES") != null)
			accionesList = (List<Accion>) session.getAttribute("MODULO_MENSAJES_ACCIONES_RECIENTES");
		else
			accionesList = new ArrayList<>();

		Accion accion = Accion.builder()
				.identificadorModulo(object.get("identificadorModulo").getAsString())
				.mensaje(object.get("mensaje").getAsString())
				.tipoMensaje(object.get("tipoMensaje").getAsString())
				.hora(object.get("hora").getAsString())
				.fecha(object.get("fecha").getAsString())
				.sysdateJs(new Date())
				.build();
		logger.info("Objeto acciones:" + gson.toJson(accion));
		accionesList.add(accion);
		session.setAttribute("MODULO_MENSAJES_ACCIONES_RECIENTES", accionesList);

		return response;
	}

	@Override
	public ServiceResponseResult consultarAccionesRecientesSession(String params) {
		ServiceResponseResult response = ServiceResponseResult.builder().isRespuesta(true).result(null).build();
		JsonObject object = gson.fromJson(params, JsonObject.class);
		List<Accion> accionesList;
		if (session.getAttribute("MODULO_MENSAJES_ACCIONES_RECIENTES") != null)
			accionesList = (List<Accion>) session.getAttribute("MODULO_MENSAJES_ACCIONES_RECIENTES");
		else
			accionesList = new ArrayList<>();

		List<Accion> actionList = accionesList.stream()
						.filter(e ->object.get("identificadorModulo").equals(e.getIdentificadorModulo()))
								.collect(Collectors.toList());

		session.setAttribute("MODULO_MENSAJES_ACCIONES_RECIENTES", actionList);

		return response;
	}
	
	@Override
	public ServiceResponseResult getAutentificacionJerarquia(String params) {	
		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		String us = jsonObject.get("usdta").getAsString();
		String crdospas = jsonObject.get("pwdta").getAsString();
		
		logger.info("jgetAutentificacion## "+us+" -- "+crdospas);
		
		ServiceResponseResult response = ServiceResponseResult.builder().isRespuesta(true).result(null).build();

		AES256TextEncryptor textEncryptor = new AES256TextEncryptor();
		textEncryptor.setPassword(env.getProperty("jwt.secret.amb"));
		crdospas = textEncryptor.decrypt(crdospas);
		
		String urlService=env.getProperty("dep.envirom.web").concat(":8151").concat(env.getProperty("ws.url.validausrffm"));		
		LoginResult responseLog = (LoginResult) restCaller.callPostReturnClassBasicAuthXwwwUrlFormed(
				urlService ,  us, crdospas, LoginResult.class
		);
		
		logger.info("RESULT" + gson.toJson(responseLog.getAccess_token()));
		response.setResult(responseLog.getAccess_token());
		return response;
	}
	
	@Override
	public ServiceResponseResult agregarMensajeAccionService(String params) {
		logger.info("ImplGenericAccionesService.class [metodo = agregarMensajeAccionService() ]\n" + params);
        LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
        JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
        String tokenAcces = principalDetail.getAccess_token();
        logger.info("json object params## " + jsonObject.toString());
        String urlRequest = principalDetail.getDireccionAmbiente()
                .concat(constantesAmbiente.getRegistrarAccionesRealizadas());
        ServiceResponseResult response = restCaller.callPostBearerTokenRequest(
                jsonObject.toString(),
                urlRequest,
                ServiceResponseResult.class,
                tokenAcces);
        
        return response;
	}
	
	@Override
	public ServiceResponseResult consultarAccionesRecientesService(String params) {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		logger.info("ImplGenericAccionesService.class [metodo = consultarAccionesRecientesService() ]\n" + params);
        JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
        LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
        String tokenAcces = principalDetail.getAccess_token();
        logger.info("consultarAccionesRecientesService ##+" + tokenAcces);
        String urlRequest = principalDetail.getDireccionAmbiente().concat(constantesAmbiente.getConsultarAccionesRealizadas());
        logger.info("url--- " + urlRequest);
        Map<String, String> paramsRequestGet = new HashMap<String, String>();
        paramsRequestGet.put("fechaInicio", jsonObject.get("fechaInicio").getAsString());
        paramsRequestGet.put("fechaFin", jsonObject.get("fechaFin").getAsString());
        paramsRequestGet.put("idUsuario", ""+principalDetail.getIdUsuario());
        ServiceResponseResult response = restCaller.callGetBearerTokenRequest(
                paramsRequestGet,
                urlRequest,
                ServiceResponseResult.class,
                tokenAcces);
        logger.info("RESULT" + gson.toJson(response));
        return response;
	}
}
