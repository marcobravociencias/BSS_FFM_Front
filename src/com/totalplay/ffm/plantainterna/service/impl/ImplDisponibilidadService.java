package com.totalplay.ffm.plantainterna.service.impl;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.totalplay.ffm.plantainterna.service.DisponibilidadService;
import com.totalplay.ffm.plantainterna.utils.ConstDisponbilidadPI;
import com.totalplay.ffm.utilerias.model.ServiceResponseResult;
import com.totalplay.ffm.utilerias.utils.ConstantesGeneric;
import com.totalplay.ffm.utilerias.utils.ConsumeRest;

@Service
public class ImplDisponibilidadService implements DisponibilidadService {
	private  final Logger logger = LogManager.getLogger(ImplDisponibilidadService.class.getName());
	
	@Autowired
	private ConstDisponbilidadPI constDisponbilidadPI;

	@Autowired
	private ConstantesGeneric constantesAmbiente;

	@Autowired
	private ConsumeRest restCaller;

	@Autowired
	private Environment env;

	Gson gson = new Gson();

	@Override
	public ServiceResponseResult insertarDisponibilidad(String params) {
		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);

		JsonObject login = new JsonObject();
		login.addProperty(env.getProperty("param.textus.pi"), constantesAmbiente.getTextIpUsuario());
		login.addProperty(env.getProperty("param.textus.drowssap"), constantesAmbiente.getTextCredPad());
		login.addProperty(env.getProperty("param.textus.diresu"), constantesAmbiente.getTextCredUs());

		jsonObject.add("Login", login);
		jsonObject.addProperty(env.getProperty("param.textus.ohcapseDdI"), "6");

		logger.info("json object params## " + jsonObject.toString());

		String url = "http://10.216.47.89" + constDisponbilidadPI.getRestagregadisponibilidad();
		ServiceResponseResult response = restCaller.callPostParamString(url, jsonObject.toString());
		logger.info("RESULT" + gson.toJson(response));
		return response;
	}

	@Override
	public ServiceResponseResult consultarDisponibilidad(String params) {
		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);

		JsonObject login = new JsonObject();
		login.addProperty(env.getProperty("param.textus.pi"), constantesAmbiente.getTextIpUsuario());
		login.addProperty(env.getProperty("param.textus.drowssap"), constantesAmbiente.getTextCredPad());
		login.addProperty(env.getProperty("param.textus.diresu"), constantesAmbiente.getTextCredUs());

		jsonObject.add("Login", login);

		logger.info("json object params## " + jsonObject.toString());

		String url = "http://10.216.47.89" + constDisponbilidadPI.getRestconsultadisponibilidad();
		ServiceResponseResult response = restCaller.callPostParamString(url, jsonObject.toString());
		logger.info("RESULT" + gson.toJson(response));
		return response;
	}

	@Override
	public ServiceResponseResult actualizarDisponibilidad(String params) {
		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);

		JsonObject login = new JsonObject();
		login.addProperty(env.getProperty("param.textus.pi"), constantesAmbiente.getTextIpUsuario());
		login.addProperty(env.getProperty("param.textus.drowssap"), constantesAmbiente.getTextCredPad());
		login.addProperty(env.getProperty("param.textus.diresu"), constantesAmbiente.getTextCredUs());

		jsonObject.add("Login", login);
		jsonObject.addProperty(env.getProperty("param.textus.ohcapseDdI"), "6");

		logger.info("json object params## " + jsonObject.toString());

		String url = "http://10.216.47.89" + constDisponbilidadPI.getRestactualizadisponibilidad();
		ServiceResponseResult response = restCaller.callPostParamString(url, jsonObject.toString());
		logger.info("RESULT" + gson.toJson(response));
		return response;
	}

	@Override
	public ServiceResponseResult consultarIntervenciones() {
		JsonObject jsonObject = new JsonObject();

		JsonObject login = new JsonObject();
		login.addProperty(env.getProperty("param.textus.pI"), constantesAmbiente.getTextIpUsuario());
		login.addProperty(env.getProperty("param.textus.drowssaP"), constantesAmbiente.getTextCredPad());
		login.addProperty(env.getProperty("param.textus.resU"), constantesAmbiente.getTextCredUs());

		jsonObject.add("Login", login);
		jsonObject.addProperty(env.getProperty("param.textus.ohcapseDDI"), "6");

		logger.info("json object params## " + jsonObject.toString());

		String url = "http://10.216.47.89" + constDisponbilidadPI.getRestconsultaintervencidisponibilidad();
		ServiceResponseResult response = restCaller.callPostParamString(url, jsonObject.toString());
		logger.info("RESULT" + gson.toJson(response));
		return response;
	}

}
