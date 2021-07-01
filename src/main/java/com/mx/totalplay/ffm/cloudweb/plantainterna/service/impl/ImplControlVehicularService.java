package com.mx.totalplay.ffm.cloudweb.plantainterna.service.impl;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mx.totalplay.ffm.cloudweb.utilerias.utils.UtileriaGeneral;
import com.mx.totalplay.ffm.cloudweb.plantainterna.service.ControlVehicularService;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.LoginResult;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.ConstantesGeneric;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.ConsumeRest;
import com.mx.totalplay.ffm.cloudweb.plantainterna.utils.ConstControlVehicular;

@Service
public class ImplControlVehicularService implements ControlVehicularService {

	private final Logger logger = LogManager.getLogger(ImplControlVehicularService.class.getName());

	@Autowired
	private ConsumeRest restCaller;

	@Autowired
	ConstantesGeneric constantesAmbiente;

	@Autowired
	private UtileriaGeneral utilerias;

	@Autowired
	ConstControlVehicular constControlVehicular;
 
	Gson gson = new Gson();

	
 
	public ServiceResponseResult consultarMarcas() {
		logger.info("ImplControlVehicularService.class [metodo = consultarMarcas() ]\n");
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
		String tokenAcces = principalDetail.getAccess_token();
		String urlRequest = principalDetail.getDireccionAmbiente()
				.concat(constControlVehicular.getConsultarMarcasControlVehicular());
					
		logger.info("URL: " + urlRequest);

		Map<String, String> paramsRequestGet = new HashMap<String, String>();
		ServiceResponseResult response = restCaller.callGetBearerTokenRequest(paramsRequestGet, urlRequest,
				ServiceResponseResult.class, tokenAcces);
		return response;
	}

	public ServiceResponseResult consultarColores() {
		logger.info("ImplControlVehicularService.class [metodo = consultarColores() ]\n");

		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
		String tokenAcces = principalDetail.getAccess_token();
		String urlRequest = principalDetail.getDireccionAmbiente()
				.concat(constControlVehicular.getConsultarColoresControlVehicular());
					
		logger.info("URL: " + urlRequest);

		Map<String, String> paramsRequestGet = new HashMap<String, String>();
		ServiceResponseResult response = restCaller.callGetBearerTokenRequest(paramsRequestGet, urlRequest,
				ServiceResponseResult.class, tokenAcces);

		return response;
	}

	public ServiceResponseResult consultarSeguros() {
		logger.info("ImplControlVehicularService.class [metodo = consultarSeguros() ]\n");

		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
		String tokenAcces = principalDetail.getAccess_token();
		String urlRequest = principalDetail.getDireccionAmbiente()
				.concat(constControlVehicular.getConsultarSegurosControlVehicular());
					
		logger.info("URL: " + urlRequest);

		Map<String, String> paramsRequestGet = new HashMap<String, String>();
		ServiceResponseResult response = restCaller.callGetBearerTokenRequest(paramsRequestGet, urlRequest,
				ServiceResponseResult.class, tokenAcces);

		return response;
	}

	public ServiceResponseResult consultarEstatus() {
		logger.info("ImplControlVehicularService.class [metodo = consultarEstatus() ]\n");

		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
		String tokenAcces = principalDetail.getAccess_token();
		String urlRequest = principalDetail.getDireccionAmbiente()
				.concat(constControlVehicular.getConsultarEstatusControlVehicular());
					
		logger.info("URL: " + urlRequest);

		Map<String, String> paramsRequestGet = new HashMap<String, String>();
		ServiceResponseResult response = restCaller.callGetBearerTokenRequest(paramsRequestGet, urlRequest,
				ServiceResponseResult.class, tokenAcces);

		return response;
	}
	
}
