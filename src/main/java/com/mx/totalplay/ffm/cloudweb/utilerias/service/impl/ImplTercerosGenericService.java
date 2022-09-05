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
import com.mx.totalplay.ffm.cloudweb.utilerias.service.TercerosGenericService;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.ConstTercerosGeneric;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.ConsumeRest;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.UtileriaGeneral;

@Service
public class ImplTercerosGenericService implements TercerosGenericService {
	private final Logger logger = LogManager.getLogger(ImplTercerosGenericService.class.getName());
	private final ConsumeRest restCaller;
	private final UtileriaGeneral utilerias;
	private final ConstTercerosGeneric constTercerosGeneric;
	private Gson gson = new Gson();

	@Autowired
	public ImplTercerosGenericService(ConsumeRest restCaller, UtileriaGeneral utilerias,
			ConstTercerosGeneric constTercerosGeneric) {
		this.restCaller = restCaller;
		this.utilerias = utilerias;
		this.constTercerosGeneric = constTercerosGeneric;
	}
	
	@Override
	public ServiceResponseResult consultarCatEstatus() {
		logger.info("ImplTercerosGenericService.class [metodo = consultarCatEstatus() ]\n");
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
		String tokenAcces = principalDetail.getAccess_token();
		String urlRequest = principalDetail.getDireccionAmbiente()
				.concat(constTercerosGeneric.getConsultaCatalogoEstatusTerceros());

		logger.info("URL: " + urlRequest);

		Map<String, String> paramsRequestGet = new HashMap<String, String>();
		ServiceResponseResult response = restCaller.callGetBearerTokenRequest(paramsRequestGet, urlRequest,
				ServiceResponseResult.class, tokenAcces);
		return response;
	}

	@Override
	public ServiceResponseResult consultarCatEstado() {
		logger.info("ImplTercerosGenericService.class [metodo = consultarCatEstado() ]\n");
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
		String tokenAcces = principalDetail.getAccess_token();
		String urlRequest = principalDetail.getDireccionAmbiente()
				.concat(constTercerosGeneric.getConsultaCatalogoEstadoTerceros());

		logger.info("URL: " + urlRequest);

		Map<String, String> paramsRequestGet = new HashMap<String, String>();
		ServiceResponseResult response = restCaller.callGetBearerTokenRequest(paramsRequestGet, urlRequest,
				ServiceResponseResult.class, tokenAcces);
		return response;
	}

	@Override
	public ServiceResponseResult consultarCatDistancia() {
		logger.info("ImplTercerosGenericService.class [metodo = consultarCatDistancia() ]\n");
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
		String tokenAcces = principalDetail.getAccess_token();
		String urlRequest = principalDetail.getDireccionAmbiente()
				.concat(constTercerosGeneric.getConsultaCatalogoDistanciaTerceros());

		logger.info("URL: " + urlRequest);

		Map<String, String> paramsRequestGet = new HashMap<String, String>();
		ServiceResponseResult response = restCaller.callGetBearerTokenRequest(paramsRequestGet, urlRequest,
				ServiceResponseResult.class, tokenAcces);
		return response;
	}

	@Override
	public ServiceResponseResult consultarCatTiempo() {
		logger.info("ImplTercerosGenericService.class [metodo = consultarCatTiempo() ]\n");
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
		String tokenAcces = principalDetail.getAccess_token();
		String urlRequest = principalDetail.getDireccionAmbiente()
				.concat(constTercerosGeneric.getConsultaCatalogoTiempoTerceros());

		logger.info("URL: " + urlRequest);

		Map<String, String> paramsRequestGet = new HashMap<String, String>();
		ServiceResponseResult response = restCaller.callGetBearerTokenRequest(paramsRequestGet, urlRequest,
				ServiceResponseResult.class, tokenAcces);
		return response;
	}

	@Override
	public ServiceResponseResult guardarDictamenTerceros(String params) {
		logger.info("ImplTercerosGenericService.class [metodo = guardarDictamenTerceros() ]\n" + params);
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();

		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		String tokenAcces = principalDetail.getAccess_token();
		String urlRequest = principalDetail.getDireccionAmbiente().concat(constTercerosGeneric.getGuardaDictamenTerceros());
		logger.info("URL ##" + urlRequest);

		Map<String, String> paramsRequestGet = new HashMap<String, String>();

		ServiceResponseResult response = restCaller.callPostBearerTokenRequest(jsonObject.toString(), urlRequest,
				ServiceResponseResult.class, tokenAcces);
		logger.info(response);
		return response;
	}

}
