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
import com.mx.totalplay.ffm.cloudweb.plantainterna.service.UsuariosPIService;
import com.mx.totalplay.ffm.cloudweb.plantainterna.utils.ConstUsuarioPI;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.LoginResult;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.ConstantesGeneric;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.ConsumeRest;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.UtileriaGeneral;

@Service
public class ImplUsuariosPIService implements UsuariosPIService {
	private  final Logger logger = LogManager.getLogger(ImplDespachoPIService.class.getName());
	private final ConstantesGeneric constantesAmbiente;
	private final ConstUsuarioPI constUsuario;
	private final ConsumeRest restCaller;
	private final UtileriaGeneral utilerias;
	private final Environment env;
	private Gson gson=new Gson();
	
	@Autowired
	public ImplUsuariosPIService(ConstantesGeneric constantesAmbiente, ConstUsuarioPI constUsuario, ConsumeRest restCaller, UtileriaGeneral utilerias, Environment env) {
		this.constantesAmbiente = constantesAmbiente;
		this.constUsuario = constUsuario;
		this.restCaller = restCaller;
		this.utilerias = utilerias;
		this.env = env;
	}

	@Override
	public ServiceResponseResult consultaCompanias() {
		logger.info("ImplUsuariosPIService.class [metodo = consultaCompanias() ]\n");
		LoginResult principalDetail=utilerias.obtenerObjetoPrincipal();
		Map<String, String> paramsRequestGet = new HashMap<String, String>();
		String tokenAcces=principalDetail.getAccess_token(); 
		String url = principalDetail.getDireccionAmbiente().concat(constUsuario.getConsultaCompanias());
		ServiceResponseResult response= restCaller.callGetBearerTokenRequest(paramsRequestGet, url, ServiceResponseResult.class, tokenAcces);
		logger.info("RESULT consultaCompanias "+gson.toJson(response));
		return response;
	}

	@Override
	public ServiceResponseResult consultaPuestos() {
		logger.info("ImplUsuariosPIService.class [metodo = consultaPuestos() ]\n");
		LoginResult principalDetail=utilerias.obtenerObjetoPrincipal();
		Map<String, String> paramsRequestGet = new HashMap<String, String>();
		String tokenAcces=principalDetail.getAccess_token(); 
		String url = principalDetail.getDireccionAmbiente().concat(constUsuario.getConsultaPuestos());
		ServiceResponseResult response= restCaller.callGetBearerTokenRequest(paramsRequestGet, url, ServiceResponseResult.class, tokenAcces);
		logger.info("RESULT consultaPuestos "+gson.toJson(response));
		return response;
	}
	
	@Override
	public ServiceResponseResult consultaPermisos() {
		logger.info("ImplUsuariosPIService.class [metodo = consultaPermisos() ]\n");
		LoginResult principalDetail=utilerias.obtenerObjetoPrincipal();
		Map<String, String> paramsRequestGet = new HashMap<String, String>();
		String tokenAcces=principalDetail.getAccess_token(); 
		String url = principalDetail.getDireccionAmbiente().concat(constUsuario.getConsultaPermisos());
		ServiceResponseResult response= restCaller.callGetBearerTokenRequest(paramsRequestGet, url, ServiceResponseResult.class, tokenAcces);
		logger.info("RESULT consultaPermisos "+gson.toJson(response));
		return response;
	}
	
	@Override
	public ServiceResponseResult consultaUsuarioPorId(String params) {
		logger.info("ImplUsuariosPIService.class [metodo = consultaUsuarioPorId() ]\n");
		LoginResult principalDetail=utilerias.obtenerObjetoPrincipal();
		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		Map<String, String> paramsRequestGet = new HashMap<String, String>();
		paramsRequestGet.put("idUsuario", jsonObject.get("idUsuario").getAsString());
		logger.info("json object params## "+ params);
		String tokenAcces=principalDetail.getAccess_token(); 
		String url = principalDetail.getDireccionAmbiente().concat(constUsuario.getConsultaUsuarioPorId());
		ServiceResponseResult response= restCaller.callGetBearerTokenRequest(paramsRequestGet, url, ServiceResponseResult.class, tokenAcces);
		logger.info("RESULT consultaUsuarioPorId "+gson.toJson(response));
		return response;
	}
	
	@Override
	public ServiceResponseResult consultaUsuariosPorGeoCompPuestos(String params) {
		logger.info("ImplUsuariosPIService.class [metodo = consultaUsuariosPorGeoCompPuestos() ]\n");
		LoginResult principalDetail=utilerias.obtenerObjetoPrincipal();
		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		String tokenAcces=principalDetail.getAccess_token() ;
		logger.info("json object params## "+jsonObject.toString());
		String url = principalDetail.getDireccionAmbiente().concat(constUsuario.getConsultaUsuariosPorGeoCompPuestos());
		ServiceResponseResult response=restCaller.callPostBearerTokenRequest(jsonObject.toString(), url, ServiceResponseResult.class, tokenAcces);
		logger.info("RESULT consultaUsuariosPorGeoCompPuestos "+gson.toJson(response));
		return response;
	}

	@Override
	public ServiceResponseResult consultarRegionesEstructura() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ServiceResponseResult consultarClasificacionUsuario() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ServiceResponseResult consultarIntervencionesPorPropietarios(String params) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ServiceResponseResult consultarArbolesCiudades() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ServiceResponseResult consultarOperariosPorCiudad(String params) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ServiceResponseResult consultarCiudadesEstructura(String params) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ServiceResponseResult consultarUsuarios(String params) {
		// TODO Auto-generated method stub
		return null;
	}

	
	
}
