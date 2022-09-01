package com.mx.totalplay.ffm.cloudweb.plantainterna.service.impl;

import java.util.HashMap;

import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.mx.totalplay.ffm.cloudweb.plantainterna.model.consultaOTPI.ImagenesConfig;
import com.mx.totalplay.ffm.cloudweb.plantainterna.model.consultaOTPI.ParamConsultaOTPI;
import com.mx.totalplay.ffm.cloudweb.plantainterna.model.consultaOTPI.ResponseImagenEvidencia;
import com.mx.totalplay.ffm.cloudweb.plantainterna.service.ReporteSFService;
import com.mx.totalplay.ffm.cloudweb.plantainterna.utils.ConstConsultaOT;
import com.mx.totalplay.ffm.cloudweb.plantainterna.utils.ConstReporteSF;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.DataTableResponse;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.LoginResult;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.ConstantesGeneric;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.ConsumeRest;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.UtileriaGeneral;

@Service
public class ImplReporteSFService implements ReporteSFService {

	private final Logger logger = LogManager.getLogger(ImplReporteSFService.class.getName());
	private final ConsumeRest restCaller;
	private final ConstantesGeneric constantesGeneric;
	private final Environment env;
	private final UtileriaGeneral utilerias;
	private final ConstReporteSF constReporteSF;
	Gson gson = new Gson();

	@Autowired
	public ImplReporteSFService(ConsumeRest restCaller, ConstantesGeneric constantesGeneric, Environment env,
			ConstReporteSF constReporteSF, UtileriaGeneral utilerias) {
		this.restCaller = restCaller;
		this.constantesGeneric = constantesGeneric;
		this.env = env;
		this.constReporteSF = constReporteSF;
		this.utilerias = utilerias;
	}

	@Override
	public ServiceResponseResult consultarReporteBacklog(String params) {
		logger.info("ImplReporteSFService.class [metodo = consultarReporteBacklog() ]\n" + params);
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();

		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		String tokenAcces = principalDetail.getAccess_token();
		String urlRequest = principalDetail.getDireccionAmbiente()
				.concat(constReporteSF.getConsultaReporteBacklog());
		logger.info("URL ##+" + urlRequest);

		ServiceResponseResult response = restCaller.callPostBearerTokenRequest(jsonObject.toString(), urlRequest,
				ServiceResponseResult.class, tokenAcces);
		return response;
	}

	@Override
	public ServiceResponseResult consultaReporteIngresoSoporte(String params) {
		logger.info("ImplReporteSFService.class [metodo = consultaReporteIngresoSoporte() ]\n" + params);
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();

		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		String tokenAcces = principalDetail.getAccess_token();
		String urlRequest = principalDetail.getDireccionAmbiente()
				.concat(constReporteSF.getConsultaReporteIngresoSoporte());
		logger.info("URL ##+" + urlRequest);

		ServiceResponseResult response = restCaller.callPostBearerTokenRequest(jsonObject.toString(), urlRequest,
				ServiceResponseResult.class, tokenAcces);
		return response;
	}

	@Override
	public ServiceResponseResult consultaReporteIngresoResidencial(String params) {
		logger.info("ImplReporteSFService.class [metodo = consultaReporteIngresoResidencial() ]\n" + params);
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();

		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		String tokenAcces = principalDetail.getAccess_token();
		String urlRequest = principalDetail.getDireccionAmbiente()
				.concat(constReporteSF.getConsultaReporteIngresoResidencial());
		logger.info("URL ##+" + urlRequest);

		ServiceResponseResult response = restCaller.callPostBearerTokenRequest(jsonObject.toString(), urlRequest,
				ServiceResponseResult.class, tokenAcces);
		return response;
	}

	@Override
	public ServiceResponseResult consultaReporteIngresoEmpresarial(String params) {
		logger.info("ImplReporteSFService.class [metodo = consultaReporteIngresoEmpresarial() ]\n" + params);
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();

		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		String tokenAcces = principalDetail.getAccess_token();
		String urlRequest = principalDetail.getDireccionAmbiente()
				.concat(constReporteSF.getConsultaReporteIngresoEmpresarial());
		logger.info("URL ##+" + urlRequest);

		ServiceResponseResult response = restCaller.callPostBearerTokenRequest(jsonObject.toString(), urlRequest,
				ServiceResponseResult.class, tokenAcces);
		return response;
	}

	@Override
	public ServiceResponseResult consultaReporteIngresoEmpresarialSinAgenda(String params) {
		logger.info("ImplReporteSFService.class [metodo = consultaReporteIngresoEmpresarialSinAgenda() ]\n" + params);
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();

		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		String tokenAcces = principalDetail.getAccess_token();
		String urlRequest = principalDetail.getDireccionAmbiente()
				.concat(constReporteSF.getConsultaReporteIngresoEmpresarialSinAgenda());
		logger.info("URL ##+" + urlRequest);

		ServiceResponseResult response = restCaller.callPostBearerTokenRequest(jsonObject.toString(), urlRequest,
				ServiceResponseResult.class, tokenAcces);
		return response;
	}

	@Override
	public ServiceResponseResult consultaReporteCompletosSoporte(String params) {
		logger.info("ImplReporteSFService.class [metodo = consultaReporteCompletosSoporte() ]\n" + params);
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();

		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		String tokenAcces = principalDetail.getAccess_token();
		String urlRequest = principalDetail.getDireccionAmbiente()
				.concat(constReporteSF.getConsultaReporteCompletosSoporte());
		logger.info("URL ##+" + urlRequest);

		ServiceResponseResult response = restCaller.callPostBearerTokenRequest(jsonObject.toString(), urlRequest,
				ServiceResponseResult.class, tokenAcces);
		return response;
	}

	@Override
	public ServiceResponseResult consultaReporteCompletosResidencial(String params) {
		logger.info("ImplReporteSFService.class [metodo = consultaReporteCompletosResidencial() ]\n" + params);
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();

		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		String tokenAcces = principalDetail.getAccess_token();
		String urlRequest = principalDetail.getDireccionAmbiente()
				.concat(constReporteSF.getConsultaReporteCompletosResidencial());
		logger.info("URL ##+" + urlRequest);

		ServiceResponseResult response = restCaller.callPostBearerTokenRequest(jsonObject.toString(), urlRequest,
				ServiceResponseResult.class, tokenAcces);
		return response;
	}

	@Override
	public ServiceResponseResult consultaReporteCompletosEmpresarial(String params) {
		logger.info("ImplReporteSFService.class [metodo = consultaReporteCompletosEmpresarial() ]\n" + params);
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();

		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		String tokenAcces = principalDetail.getAccess_token();
		String urlRequest = principalDetail.getDireccionAmbiente()
				.concat(constReporteSF.getConsultaReporteCompletosEmpresarial());
		logger.info("URL ##+" + urlRequest);

		ServiceResponseResult response = restCaller.callPostBearerTokenRequest(jsonObject.toString(), urlRequest,
				ServiceResponseResult.class, tokenAcces);
		return response;
	}

	@Override
	public ServiceResponseResult consultarReporteSitiosFibrados(String params) {
		logger.info("ImplReporteSFService.class [metodo = consultarReporteRedesSociales() ]\n" + params);
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();

		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		String tokenAcces = principalDetail.getAccess_token();
		String urlRequest = principalDetail.getDireccionAmbiente()
				.concat(constReporteSF.getConsultaReporteSitiosFibrados());
		logger.info("URL ##+" + urlRequest);

		ServiceResponseResult response = restCaller.callPostBearerTokenRequest(jsonObject.toString(), urlRequest,
				ServiceResponseResult.class, tokenAcces);
		return response;
	}

	@Override
	public ServiceResponseResult consultarReporteRedesSociales(String params) {
		logger.info("ImplReporteSFService.class [metodo = consultarReporteRedesSociales() ]\n" + params);
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();

		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		String tokenAcces = principalDetail.getAccess_token();
		String urlRequest = principalDetail.getDireccionAmbiente()
				.concat(constReporteSF.getConsultaReporteRedesSociales());
		logger.info("URL ##+" + urlRequest);

		ServiceResponseResult response = restCaller.callPostBearerTokenRequest(jsonObject.toString(), urlRequest,
				ServiceResponseResult.class, tokenAcces);
		return response;
	}

	@Override
	public ServiceResponseResult consultarReporteGenerados(String params) {
		logger.info("ImplReporteSFService.class [metodo = consultarReporteGenerados() ]\n" + params);
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();

		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		String tokenAcces = principalDetail.getAccess_token();
		String urlRequest = principalDetail.getDireccionAmbiente()
				.concat(constReporteSF.getConsultaReporteGenerados());
		logger.info("URL ##+" + urlRequest);

		ServiceResponseResult response = restCaller.callPostBearerTokenRequest(jsonObject.toString(), urlRequest,
				ServiceResponseResult.class, tokenAcces);
		return response;
	}

	@Override
	public ServiceResponseResult consultarReportePlanningAgendas(String params) {
		logger.info("ImplReporteSFService.class [metodo = consultarReportePlanningAgendas() ]\n" + params);
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();

		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		String tokenAcces = principalDetail.getAccess_token();
		String urlRequest = principalDetail.getDireccionAmbiente()
				.concat(constReporteSF.getConsultaReportePlanningAgenda());
		logger.info("URL ##+" + urlRequest);

		ServiceResponseResult response = restCaller.callPostBearerTokenRequest(jsonObject.toString(), urlRequest,
				ServiceResponseResult.class, tokenAcces);
		return response;
	}

	@Override
	public ServiceResponseResult consultarReportePlanningAddon(String params) {
		logger.info("ImplReporteSFService.class [metodo = consultarReportePlanningAddon() ]\n" + params);
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();

		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		String tokenAcces = principalDetail.getAccess_token();
		String urlRequest = principalDetail.getDireccionAmbiente()
				.concat(constReporteSF.getConsultaReportePlanningAddon());
		logger.info("URL ##+" + urlRequest);

		ServiceResponseResult response = restCaller.callPostBearerTokenRequest(jsonObject.toString(), urlRequest,
				ServiceResponseResult.class, tokenAcces);
		return response;
	}

	@Override
	public ServiceResponseResult consultarReporteCompletosProactivo(String params) {
		logger.info("ImplReporteSFService.class [metodo = consultarReporteCompletosProactivo() ]\n" + params);
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();

		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		String tokenAcces = principalDetail.getAccess_token();
		String urlRequest = principalDetail.getDireccionAmbiente()
				.concat(constReporteSF.getConsultaReporteCompletosProactivos());
		logger.info("URL ##+" + urlRequest);

		ServiceResponseResult response = restCaller.callPostBearerTokenRequest(jsonObject.toString(), urlRequest,
				ServiceResponseResult.class, tokenAcces);
		return response;
	}

	@Override
	public ServiceResponseResult consultarReporteCompletosDomicilio(String params) {
		logger.info("ImplReporteSFService.class [metodo = consultarReporteCompletosDomicilio() ]\n" + params);
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();

		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		String tokenAcces = principalDetail.getAccess_token();
		String urlRequest = principalDetail.getDireccionAmbiente()
				.concat(constReporteSF.getConsultaReporteCompletosCambioDomicilio());
		logger.info("URL ##+" + urlRequest);

		ServiceResponseResult response = restCaller.callPostBearerTokenRequest(jsonObject.toString(), urlRequest,
				ServiceResponseResult.class, tokenAcces);
		return response;
	}
	
	@Override
	public ServiceResponseResult consultarReporteCompletosSoporteEmpresarial(String params) {
		logger.info("ImplReporteSFService.class [metodo = consultarReporteCompletosSoporteEmpresarial() ]\n" + params);
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();

		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		String tokenAcces = principalDetail.getAccess_token();
		String urlRequest = principalDetail.getDireccionAmbiente()
				.concat(constReporteSF.getConsultaReporteCompletosSoporteEmpresarial());
		logger.info("URL ##+" + urlRequest);

		ServiceResponseResult response = restCaller.callPostBearerTokenRequest(jsonObject.toString(), urlRequest,
				ServiceResponseResult.class, tokenAcces);
		return response;
	}

	@Override
	public ServiceResponseResult consultarReporteBackLogProactivo(String params) {
		logger.info("ImplReporteSFService.class [metodo = consultarReporteBackLogProactivo() ]\n" + params);
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();

		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		String tokenAcces = principalDetail.getAccess_token();
		String urlRequest = principalDetail.getDireccionAmbiente()
				.concat(constReporteSF.getConsultaReporteBacklogProactivos());
		logger.info("URL ##+" + urlRequest);

		ServiceResponseResult response = restCaller.callPostBearerTokenRequest(jsonObject.toString(), urlRequest,
				ServiceResponseResult.class, tokenAcces);
		return response;
	}

	
	
}
