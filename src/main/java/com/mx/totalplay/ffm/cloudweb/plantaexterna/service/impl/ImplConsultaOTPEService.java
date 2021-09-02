package com.mx.totalplay.ffm.cloudweb.plantaexterna.service.impl;

import com.mx.totalplay.ffm.cloudweb.plantaexterna.service.ConsultaOTPEService;
import com.mx.totalplay.ffm.cloudweb.plantaexterna.utils.ConstConsultaOTPE;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.LoginResult;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.ConstantesGeneric;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.ConsumeRest;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.UtileriaGeneral;

import java.util.HashMap;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;
import com.google.gson.JsonObject;


@Service
public class ImplConsultaOTPEService implements ConsultaOTPEService{
	private  final Logger logger = LogManager.getLogger(ImplConsultaOTPEService.class.getName());
	private final ConstantesGeneric constantesAmbiente;
	private final ConstConsultaOTPE constConsultaOTPE;
	private final ConsumeRest restCaller;
	private final UtileriaGeneral utilerias;
	private final Environment env;
	private Gson gson = new Gson();
	
	@Autowired
	public ImplConsultaOTPEService(ConstantesGeneric constantesAmbiente, ConstConsultaOTPE constConsultaOTPE, ConsumeRest restCaller, UtileriaGeneral utilerias, Environment env) {
		this.constantesAmbiente = constantesAmbiente;
		this.constConsultaOTPE = constConsultaOTPE;
		this.restCaller = restCaller;
		this.utilerias = utilerias;
		this.env = env;
	}

	@Override
	public ServiceResponseResult consultaOTInspector(String params) {
		logger.info("ImplConsultaOTPEService.class [metodo = consultaOTInspector() ]\n"+params);
		JsonObject jsonObject=gson.fromJson(params, JsonObject.class);
		LoginResult principalDetail=utilerias.obtenerObjetoPrincipal();
		String tokenAcces=principalDetail.getAccess_token() ;
		logger.info("consultaOTInspector ##+"+tokenAcces);
		String urlRequest=principalDetail.getDireccionAmbiente().concat( constConsultaOTPE.getConsultaOTTipoOrdenesPorUsuario() );	
	    logger.info("url--- "+urlRequest);
	    Map<String, String> paramsRequestGet = new HashMap<String, String>();
		ServiceResponseResult response= restCaller.callGetBearerTokenRequest( 
																			paramsRequestGet,
																			urlRequest,
																			ServiceResponseResult.class , 
																			tokenAcces );
	    logger.info("RESULT"+gson.toJson(response));
		return response;

	}

	@Override
	public ServiceResponseResult consultaOTMasivo(String params) {
		logger.info("ImplConsultaOTPEService.class [metodo = consultaOTMasivo() ]\n"+params);
		JsonObject jsonObject=gson.fromJson(params, JsonObject.class);
		LoginResult principalDetail=utilerias.obtenerObjetoPrincipal();
		String tokenAcces=principalDetail.getAccess_token() ;
		logger.info("consultaOTMasivo ##+"+tokenAcces);
		String urlRequest=principalDetail.getDireccionAmbiente().concat( constConsultaOTPE.getConsultaOTTipoOrdenesPorUsuario() );	
	    logger.info("url--- "+urlRequest);
	    Map<String, String> paramsRequestGet = new HashMap<String, String>();
		ServiceResponseResult response= restCaller.callGetBearerTokenRequest( 
																			paramsRequestGet,
																			urlRequest,
																			ServiceResponseResult.class , 
																			tokenAcces );
	    logger.info("RESULT"+gson.toJson(response));
		return response;
	}

	@Override
	public ServiceResponseResult consultaOTDiario(String params) {
		logger.info("ImplConsultaOTPEService.class [metodo = consultaOTDiario() ]\n"+params);
		JsonObject jsonObject=gson.fromJson(params, JsonObject.class);
		LoginResult principalDetail=utilerias.obtenerObjetoPrincipal();
		String tokenAcces=principalDetail.getAccess_token() ;
		logger.info("consultaOTDiario ##+"+tokenAcces);
		String urlRequest=principalDetail.getDireccionAmbiente().concat( constConsultaOTPE.getConsultaOTTipoOrdenesPorUsuario() );	
	    logger.info("url--- "+urlRequest);
	    Map<String, String> paramsRequestGet = new HashMap<String, String>();
		ServiceResponseResult response= restCaller.callGetBearerTokenRequest( 
																			paramsRequestGet,
																			urlRequest,
																			ServiceResponseResult.class , 
																			tokenAcces );
	    logger.info("RESULT"+gson.toJson(response));
		return response;
	}

	@Override
	public ServiceResponseResult consultarHistorico(String params) {
		logger.info("ImplConsultaOTPEService.class [metodo = consultarHistorico() ]\n"+params);
		JsonObject jsonObject=gson.fromJson(params, JsonObject.class);
		LoginResult principalDetail=utilerias.obtenerObjetoPrincipal();
		String tokenAcces=principalDetail.getAccess_token() ;
		logger.info("consultaOTDiario ##+"+tokenAcces);
		String urlRequest=principalDetail.getDireccionAmbiente().concat( constConsultaOTPE.getConsultaOTTipoOrdenesPorUsuario() );	
	    logger.info("url--- "+urlRequest);
	    Map<String, String> paramsRequestGet = new HashMap<String, String>();
		ServiceResponseResult response= restCaller.callGetBearerTokenRequest( 
																			paramsRequestGet,
																			urlRequest,
																			ServiceResponseResult.class , 
																			tokenAcces );
	    logger.info("RESULT"+gson.toJson(response));
		return response;
	}

	@Override
	public ServiceResponseResult consultarMateriales(String params) {
		logger.info("ImplConsultaOTPEService.class [metodo = consultarMateriales() ]\n"+params);
		JsonObject jsonObject=gson.fromJson(params, JsonObject.class);
		LoginResult principalDetail=utilerias.obtenerObjetoPrincipal();
		String tokenAcces=principalDetail.getAccess_token() ;
		logger.info("consultaOTDiario ##+"+tokenAcces);
		String urlRequest=principalDetail.getDireccionAmbiente().concat( constConsultaOTPE.getConsultaOTTipoOrdenesPorUsuario() );	
	    logger.info("url--- "+urlRequest);
	    Map<String, String> paramsRequestGet = new HashMap<String, String>();
		ServiceResponseResult response= restCaller.callGetBearerTokenRequest( 
																			paramsRequestGet,
																			urlRequest,
																			ServiceResponseResult.class , 
																			tokenAcces );
	    logger.info("RESULT"+gson.toJson(response));
		return response;
	}

	@Override
	public ServiceResponseResult consultarFallas(String params) {
		logger.info("ImplConsultaOTPEService.class [metodo = consultarFallas() ]\n"+params);
		JsonObject jsonObject=gson.fromJson(params, JsonObject.class);
		LoginResult principalDetail=utilerias.obtenerObjetoPrincipal();
		String tokenAcces=principalDetail.getAccess_token() ;
		logger.info("consultaOTDiario ##+"+tokenAcces);
		String urlRequest=principalDetail.getDireccionAmbiente().concat( constConsultaOTPE.getConsultaOTTipoOrdenesPorUsuario() );	
	    logger.info("url--- "+urlRequest);
	    Map<String, String> paramsRequestGet = new HashMap<String, String>();
		ServiceResponseResult response= restCaller.callGetBearerTokenRequest( 
																			paramsRequestGet,
																			urlRequest,
																			ServiceResponseResult.class , 
																			tokenAcces );
	    logger.info("RESULT"+gson.toJson(response));
		return response;
	}

}
