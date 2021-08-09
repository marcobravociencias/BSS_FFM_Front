package com.mx.totalplay.ffm.cloudweb.plantainterna.service.impl;

import java.util.HashMap;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.mx.totalplay.ffm.cloudweb.plantainterna.service.OrdenesUniversalesService;
import com.mx.totalplay.ffm.cloudweb.plantainterna.utils.ConstDisponbilidadPI;
import com.mx.totalplay.ffm.cloudweb.plantainterna.utils.ConstOrdenesUniversales;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.LoginResult;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.ConstantesGeneric;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.ConsumeRest;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.UtileriaGeneral;

@Service
public class ImplOrdenesUniversalesService implements OrdenesUniversalesService {
	
	private final Logger logger = LogManager.getLogger(ImplDisponibilidadService.class.getName());
	private final ConstantesGeneric constantesAmbiente;
	private final ConstOrdenesUniversales constOrdenesUniversales;
	private final UtileriaGeneral utileriaGeneral;
	private final ConsumeRest consumeRest;
	private final Environment env;
	private Gson gson = new Gson();
	
	@Autowired
	public ImplOrdenesUniversalesService(ConstantesGeneric constantesAmbiente, ConstOrdenesUniversales constOrdenesUniversales, ConsumeRest consumeRest, UtileriaGeneral utileriaGeneral, Environment env) {
		this.constantesAmbiente = constantesAmbiente;
		this.constOrdenesUniversales = constOrdenesUniversales;
	    this.consumeRest = consumeRest;
	    this.utileriaGeneral = utileriaGeneral;
	    this.env = env;
	}

	@Override
	public ServiceResponseResult consultarCatalogoOrdenesUniversales(String params) {
		logger.info("ImplOrdenesUniversalesService.class [metodo = consultarCatalogoOrdenesUniversales() ]\n" + params);

		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		
		JsonObject login = new JsonObject();		
		login.addProperty( env.getProperty("param.textus.pI") , constantesAmbiente.getTextIpUsuario());
		login.addProperty( env.getProperty("param.textus.drowssaP") , constantesAmbiente.getTextCredPad());
		login.addProperty( env.getProperty("param.textus.resU") , constantesAmbiente.getTextCredUs());	

        LoginResult principalDetail = utileriaGeneral.obtenerObjetoPrincipal();
        String tokenAcces = principalDetail.getAccess_token();
        logger.info("consultarCatalogoOrdenesUniversales ##+" + tokenAcces);
        String urlRequest = principalDetail.getDireccionAmbiente().concat(constOrdenesUniversales.getConsultarCatalogoOrdenesUniversales() + "?subtipoIntervencion=" + jsonObject.get("subtipoIntervencion").getAsString() + "&geografia2=" + jsonObject.get("geografia2").getAsString());
        logger.info("***URL: "+ urlRequest);
        Map<String, String> paramsRequestGet = new HashMap<String, String>();
        paramsRequestGet.put("subtipoIntervencion", jsonObject.get("subtipoIntervencion").getAsString());
        paramsRequestGet.put("geografia2", jsonObject.get("geografia2").getAsString());

        ServiceResponseResult response = consumeRest.callGetBearerTokenRequest(paramsRequestGet, urlRequest,
                ServiceResponseResult.class, tokenAcces);
        logger.info("RESULT" + gson.toJson(response));
        return response;
	}

	@Override
	public ServiceResponseResult consultarCuentaAsignadaGenerica(String params) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ServiceResponseResult getcatsdispacherintegrador(String params) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ServiceResponseResult getDisponibilidadServicioRest(String params) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ServiceResponseResult creacionAsignacionGenerica(String params) {
		// TODO Auto-generated method stub
		return null;
	}

}
