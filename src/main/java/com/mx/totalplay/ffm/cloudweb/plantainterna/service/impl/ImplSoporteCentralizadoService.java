package com.mx.totalplay.ffm.cloudweb.plantainterna.service.impl;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.mx.totalplay.ffm.cloudweb.plantainterna.model.consultaOTPI.ParamConsultaOTPI;
import com.mx.totalplay.ffm.cloudweb.plantainterna.service.SoporteCentralizadoService;
import com.mx.totalplay.ffm.cloudweb.plantainterna.utils.ConstSoporteCentralizado;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.DataTableResponse;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.LoginResult;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.ConstantesGeneric;
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
public class ImplSoporteCentralizadoService implements SoporteCentralizadoService {
    private final Logger logger = LogManager.getLogger(ImplSoporteCentralizadoService.class.getName());
    private final ConsumeRest restCaller;
    private ServiceResponseResult response;
    private final Environment environment;
    private final UtileriaGeneral utilerias;
    private Gson gson = new Gson();
    private final ConstantesGeneric constantesGeneric;
    private final ConstSoporteCentralizado constSoporteCentralizado;
    private static final int CANTIDAD_COLUMNS_COLUMNSTICKET = 12;

    @Autowired
    public ImplSoporteCentralizadoService(ConsumeRest restCaller, Environment environment, UtileriaGeneral utilerias, ConstantesGeneric constantesGeneric, ConstSoporteCentralizado constSoporteCentralizado) {
        this.restCaller = restCaller;
        this.environment = environment;
        this.utilerias = utilerias;
        this.constantesGeneric = constantesGeneric;
        this.constSoporteCentralizado = constSoporteCentralizado;
    }

    @Override
    public ServiceResponseResult consultaSeguimientoSoporte(String params) {
        JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
        LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
        String tokenAcces = principalDetail.getAccess_token();
        String urlRequest = principalDetail.getDireccionAmbiente().concat(constSoporteCentralizado.getConsultaSeguimientoSoporte());
        logger.info("### URL consultaSeguimientoSoporte(): \n" + urlRequest);

        ServiceResponseResult response = restCaller.callPostBearerTokenRequest(
                jsonObject.toString(),
                urlRequest,
                ServiceResponseResult.class,
                tokenAcces);

        logger.info("### RESULT consultaSeguimientoSoporte(): " + gson.toJson(response));
        return response;
    }

    @Override
    public ServiceResponseResult consultaTicketSoporte(String params) {
        JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
        LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
        String tokenAcces = principalDetail.getAccess_token();
        String urlRequest = principalDetail.getDireccionAmbiente().concat(constSoporteCentralizado.getConsultaTicketSoporte());
        logger.info("### URL consultaTicketSoporte(): \n" + urlRequest);

        ServiceResponseResult response = restCaller.callPostBearerTokenRequest(
                jsonObject.toString(),
                urlRequest,
                ServiceResponseResult.class,
                tokenAcces);

        logger.info("### RESULT consultaTicketSoporte(): " + gson.toJson(response));
        return response;
    }

    @Override
    public ServiceResponseResult consultaDetalleSoporte(String params) {
        JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
        LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
        String tokenAcces = principalDetail.getAccess_token();
        String urlRequest = principalDetail.getDireccionAmbiente().concat(constSoporteCentralizado.getConsultaDetalleSoporte());
        logger.info("### URL consultaDetalleSoporte(): \n" + urlRequest);

        ServiceResponseResult response = restCaller.callPostBearerTokenRequest(
                jsonObject.toString(),
                urlRequest,
                ServiceResponseResult.class,
                tokenAcces);

        logger.info("### RESULT consultaDetalleSoporte(): " + response);
        return response;
    }

	@Override
	public ServiceResponseResult consultaFallasTicketSoporte() {
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
		String tokenAccess = principalDetail.getAccess_token();
		logger.info("consultaFallasTicketSoporte ## "+ tokenAccess);
		
		String urlRequest = principalDetail.getDireccionAmbiente().concat(constSoporteCentralizado.getConsultaFallasTicketSoporte());
		logger.info("### URL consultaFallasTicketSoporte():" + urlRequest);
		
		Map<String, String> paramsRequestGet = new HashMap<String, String>();
		ServiceResponseResult response = restCaller.callGetBearerTokenRequest(paramsRequestGet, urlRequest, ServiceResponseResult.class, tokenAccess);
		logger.info("### RESULT consultaFallasTicketSoporte(): " + gson.toJson(response));   
		return response;
	}

	@Override
	public ServiceResponseResult consultaHistoricoTicketSoporte(String params) {
		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		logger.info("ImplSoporteCentralizadoService.class [metodo = consultaHistoricoTicketSoporte() ] \n"+ jsonObject);
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
		String tokenAccess = principalDetail.getAccess_token();
		logger.info("consultaHistoricoTicketSoporte ## "+ tokenAccess);
		
		String urlRequest = principalDetail.getDireccionAmbiente().concat(constSoporteCentralizado.getConsultaHistoricoTicketSoporte());
		logger.info("URL ##"+ urlRequest);
		
		Map<String, String> paramsRequestGet = new HashMap<String, String>();
		paramsRequestGet.put("idTicket", jsonObject.get("idTicket").getAsString());
		
		ServiceResponseResult response = restCaller.callGetBearerTokenRequest(paramsRequestGet, urlRequest, ServiceResponseResult.class, tokenAccess);
		logger.info("### RESULT " + gson.toJson(response)); 
		return response;
	}

	@Override
	public ServiceResponseResult consultaTicketsSoporte(String params) {
		logger.info("ImplSoporteCentralizadoService.class [metodo = consultaTicketsSoporte() ] \n"+ gson.toJson(params));
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();		
		String tokenAcces = principalDetail.getAccess_token();
        logger.info("consultaTicketsSoporte ## " + tokenAcces);
        String urlRequest = principalDetail.getDireccionAmbiente().concat(constSoporteCentralizado.getConsultaTicketsSoporte());
        logger.info("URL ##+" + urlRequest);
        
        JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
        Map<String, String> paramsRequest = new HashMap<>(); 
        paramsRequest.put("fechaInicio", jsonObject.get("fechaInicio").getAsString());
        paramsRequest.put("fechaFin", jsonObject.get("fechaFin").getAsString());
        paramsRequest.put("tipoFecha", jsonObject.get("tipoFecha").getAsString());
        
        ServiceResponseResult response = restCaller.callGetBearerTokenRequest(
        		paramsRequest, urlRequest,
                ServiceResponseResult.class, tokenAcces);
        
        logger.info("response#### "+gson.toJson(response));
        
        return response;
	}

	@Override
	public ServiceResponseResult creaTicketSoporte(String params) {
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
		String tokenAccess = principalDetail.getAccess_token();
		logger.info("creaTicketSoporte ## "+ tokenAccess);
		
		String urlRequest = principalDetail.getDireccionAmbiente().concat(constSoporteCentralizado.getCreaTicketSoporte());
		logger.info("### URL creaTicketSoporte():" + urlRequest);
		
		ServiceResponseResult response = restCaller.callPostBearerTokenRequest(params, urlRequest, ServiceResponseResult.class, tokenAccess);
		logger.info("### RESULT" + gson.toJson(response));   
		return response;
	}

	@Override
	public ServiceResponseResult consultaPropietariosTicketSoporte() {
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
		String tokenAccess = principalDetail.getAccess_token();
		logger.info("consultaPropietariosTicketSoporte ## "+ tokenAccess);
		
		String urlRequest = principalDetail.getDireccionAmbiente().concat(constSoporteCentralizado.getConsultaPropietariosTicketSoporte());
		logger.info("### URL consultaPropietariosTicketSoporte():" + urlRequest);
		
		Map<String, String> paramsRequestGet = new HashMap<String, String>();
		ServiceResponseResult response = restCaller.callGetBearerTokenRequest(paramsRequestGet, urlRequest, ServiceResponseResult.class, tokenAccess);
		logger.info("### RESULT consultaPropietariosTicketSoporte(): " + gson.toJson(response));   
		return response;
	}

	@Override
	public ServiceResponseResult consultaCuentaClienteTicketSoporte(String params) {
		logger.info("ImplSoporteCentralizadoService.class [metodo = consultaCuentaClienteTicketSoporte() ] \n"+ gson.toJson(params));
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
		String tokenAccess = principalDetail.getAccess_token();
		logger.info("consultaCuentaClienteTicketSoporte ## "+ tokenAccess);
		
		String urlRequest = principalDetail.getDireccionAmbiente().concat(constSoporteCentralizado.getConsultaCuentaClienteTicketSoporte());
		logger.info("### URL consultaCuentaClienteTicketSoporte():" + urlRequest);
		
		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		Map<String, String> paramsRequestGet = new HashMap<String, String>();
		paramsRequestGet.put("claveCliente", jsonObject.get("claveCliente").getAsString());
		
		ServiceResponseResult response = restCaller.callGetBearerTokenRequest(paramsRequestGet, urlRequest, ServiceResponseResult.class, tokenAccess);
		logger.info("### RESULT consultaPropietariosTicketSoporte(): " + gson.toJson(response));   
		return response;
	}

	@Override
	public ServiceResponseResult asignarIngenieroTicket(String params) {
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
		String tokenAcces = principalDetail.getAccess_token();
		String urlRequest = principalDetail.getDireccionAmbiente().concat(constSoporteCentralizado.getAsignarIngenieroTicket());
		logger.info("### URL asignarIngenieroTicket(): \n" + urlRequest);

		ServiceResponseResult response = restCaller.callPatchBearerTokenRequest(
				params,
				urlRequest,
				ServiceResponseResult.class,
				tokenAcces);

		logger.info("### RESULT asignarIngenieroTicket(): \n" + gson.toJson(response));
		return response;
	}

	@Override
	public ServiceResponseResult consultarAccionesDinamicaDetalle() {
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
		String tokenAcces = principalDetail.getAccess_token();
		String urlRequest = principalDetail.getDireccionAmbiente().concat(constSoporteCentralizado.getConsultarAccionesDinamicoDetalle());
		logger.info("### URL consultarAccionesDinamicaDetalle(): \n" + urlRequest);
		Map<String, String> paramsRequestGet = new HashMap<String, String>();

		ServiceResponseResult response = restCaller.callGetBearerTokenRequest(paramsRequestGet,
				urlRequest,
				ServiceResponseResult.class,
				tokenAcces);

		logger.info("### RESULT consultarAccionesDinamicaDetalle(): \n" + gson.toJson(response));
		return response;
	}

	@Override
	public ServiceResponseResult guardarTicketDetalle(String params) {
		JsonObject jsonObject = new Gson().fromJson(params, JsonObject.class);
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
		String tokenAcces = principalDetail.getAccess_token();
		String urlRequest = principalDetail.getDireccionAmbiente().concat(constSoporteCentralizado.getGuardarTicketDetalle().concat(jsonObject.get("tipo").getAsString()));
		logger.info("### URL guardarTicketDetalle(): \n" + urlRequest);

		ServiceResponseResult response = restCaller.callPatchBearerTokenRequest(
				params,
				urlRequest,
				ServiceResponseResult.class,
				tokenAcces);

		logger.info("### RESULT guardarTicketDetalle(): \n" + gson.toJson(response));
		return response;
	}
}
