package com.mx.totalplay.ffm.cloudweb.projectmanager.service.impl;

import java.util.HashMap;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;
import com.mx.totalplay.ffm.cloudweb.plantaexterna.service.impl.ImplConsultaOTPEService;
import com.mx.totalplay.ffm.cloudweb.projectmanager.service.MisProyectosService;
import com.mx.totalplay.ffm.cloudweb.projectmanager.utils.ConstMisProyectos;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.LoginResult;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.ConstantesGeneric;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.ConsumeRest;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.UtileriaGeneral;

@Service
public class ImplMisProyectosService implements MisProyectosService{
	
	private  final Logger logger = LogManager.getLogger(ImplConsultaOTPEService.class.getName());
	private final ConstantesGeneric constantesAmbiente;
	private final ConstMisProyectos constMisProyectos;
	private final UtileriaGeneral utileriaGeneral;
	private final ConsumeRest consumeRest;
	private Gson gson = new Gson();
	
	@Autowired
	public ImplMisProyectosService(ConstantesGeneric constantesAmbiente, ConstMisProyectos constMisProyectos,
			UtileriaGeneral utileriaGeneral, ConsumeRest consumeRest) {
		this.constantesAmbiente = constantesAmbiente;
		this.constMisProyectos = constMisProyectos;
		this.utileriaGeneral = utileriaGeneral;
		this.consumeRest = consumeRest;
	}


	@Override
	public ServiceResponseResult consultarProyectos(String params) {
		logger.info("ImplMisProyectosService.class [metodo = consultarProyectos() ]\n");
        LoginResult principalDetail = utileriaGeneral.obtenerObjetoPrincipal();
        int idUsuario=principalDetail.getIdUsuario();
        String tokenAcces = principalDetail.getAccess_token();
        String urlRequest = principalDetail.getDireccionAmbiente().concat(constMisProyectos.getConsultarProyectosPMS());
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


	@Override
	public ServiceResponseResult consultarActividadesPMS(String params) {
		logger.info("ImplMisProyectosService.class [metodo = consultarActividadesPMS() ]\n");
        LoginResult principalDetail = utileriaGeneral.obtenerObjetoPrincipal();
        int idUsuario=principalDetail.getIdUsuario();
        String tokenAcces = principalDetail.getAccess_token();
        String urlRequest = principalDetail.getDireccionAmbiente().concat(constMisProyectos.getConsultarProyectosPMS());
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
