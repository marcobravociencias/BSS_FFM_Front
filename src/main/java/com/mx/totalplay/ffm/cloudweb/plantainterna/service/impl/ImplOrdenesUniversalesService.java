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
	public ServiceResponseResult consultarCuentaAsignadaGenerica(String params) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ServiceResponseResult consultarCatalogosOrdenesUniversales() {		
        logger.info("ImplOrdenesUniversalesService.class [metodo = consultarCatalogosOrdenesUniversales() ]\n");
        LoginResult principalDetail = utileriaGeneral.obtenerObjetoPrincipal();
        int idUsuario=principalDetail.getIdUsuario();
        String tokenAcces = principalDetail.getAccess_token();
        String urlRequest = principalDetail.getDireccionAmbiente().concat(constOrdenesUniversales.getConsultarCatalogoOrdenesUniversales());
        logger.info("##### "+urlRequest);
        Map<String, String> paramsRequestGet = new HashMap<String, String>();        
        paramsRequestGet.put("idUsuario",idUsuario+"");
        ServiceResponseResult response = consumeRest.callGetBearerTokenRequest(
                paramsRequestGet,
                urlRequest,
                ServiceResponseResult.class,
                tokenAcces);
        logger.info("RESULT" + gson.toJson(response));        
		return response;
	}
	

	@Override
	public ServiceResponseResult consultarPerfilesGeneralServ() {		
        logger.info("ImplOrdenesUniversalesService.class [metodo = consultarPerfilesGeneralServ() ]\n");
        LoginResult principalDetail = utileriaGeneral.obtenerObjetoPrincipal();
        int idUsuario=principalDetail.getIdUsuario();
        String tokenAcces = principalDetail.getAccess_token();
        String urlRequest = principalDetail.getDireccionAmbiente().concat(constOrdenesUniversales.getConsultarPerfilesGeneral());
        logger.info("##### "+urlRequest);
        Map<String, String> paramsRequestGet = new HashMap<String, String>();        
        paramsRequestGet.put("idUsuario",idUsuario+"");
        ServiceResponseResult response = consumeRest.callGetBearerTokenRequest(
                paramsRequestGet,
                urlRequest,
                ServiceResponseResult.class,
                tokenAcces);
        logger.info("RESULT" + gson.toJson(response));        
		return response;
	}
	@Override
	public ServiceResponseResult consultarPerfilesPorUsuarioServ() {		
        logger.info("ImplOrdenesUniversalesService.class [metodo = consultarPerfilesPorUsuarioServ() ]\n");
        LoginResult principalDetail = utileriaGeneral.obtenerObjetoPrincipal();
        int idUsuario=principalDetail.getIdUsuario();
        String tokenAcces = principalDetail.getAccess_token();
        String urlRequest = principalDetail.getDireccionAmbiente().concat(constOrdenesUniversales.getConsultarPerfilesPorUsuario());
        logger.info("##### "+urlRequest);
        Map<String, String> paramsRequestGet = new HashMap<String, String>();        
        paramsRequestGet.put("idUsuario","1");
        ServiceResponseResult response = consumeRest.callGetBearerTokenRequest(
                paramsRequestGet,
                urlRequest,
                ServiceResponseResult.class,
                tokenAcces);
        logger.info("RESULT" + gson.toJson(response));        
		return response;
	}

}
