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

	
	
}
