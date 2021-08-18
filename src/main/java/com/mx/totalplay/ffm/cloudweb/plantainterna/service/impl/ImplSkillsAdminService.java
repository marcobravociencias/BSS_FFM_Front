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
import com.mx.totalplay.ffm.cloudweb.plantainterna.service.SkillsAdminService;
import com.mx.totalplay.ffm.cloudweb.plantainterna.utils.ConstSkills;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.LoginResult;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.ConstantesGeneric;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.ConsumeRest;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.UtileriaGeneral;

@Service
public class ImplSkillsAdminService implements SkillsAdminService{
	private  final Logger logger = LogManager.getLogger(ImplSkillsAdminService.class.getName());
	private final ConstantesGeneric constantesAmbiente;
	private final ConstSkills constSkills;
	private final ConsumeRest restCaller;
	private final UtileriaGeneral utilerias;
	private final Environment env;
	private Gson gson=new Gson();

	@Autowired
	public ImplSkillsAdminService(ConstantesGeneric constantesAmbiente, ConstSkills constSkills, ConsumeRest restCaller, UtileriaGeneral utilerias, Environment env) {
		this.constantesAmbiente = constantesAmbiente;
		this.constSkills = constSkills;
		this.restCaller = restCaller;
		this.utilerias = utilerias;
		this.env = env;
	}

	@Override
	public ServiceResponseResult busqueda(String params) {
		logger.info("ImplSkillsAdminService.class [metodo = busqueda() ]\n");
		LoginResult principalDetail=utilerias.obtenerObjetoPrincipal();
		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		String tokenAcces=principalDetail.getAccess_token();
		logger.info("json object params## "+jsonObject.toString());	 
		//String url = "http://34.94.124.52:8149"+constSkills.getUsuariosTipoOrdenes();
		String url = principalDetail.getDireccionAmbiente().concat(constSkills.getUsuariosTipoOrdenes());
		ServiceResponseResult response= restCaller.callPostBearerTokenRequest(
				jsonObject.toString(),
				url,
				ServiceResponseResult.class,
				tokenAcces);
		logger.info("RESULT busqueda"+gson.toJson(response));
		return response;
	}

	@Override
	public ServiceResponseResult consultarArbolesCiudades() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ServiceResponseResult guardarSkills(String params) {
		logger.info("ImplSkillsAdminService.class [metodo = guardarSkills() ]\n");
		LoginResult principalDetail=utilerias.obtenerObjetoPrincipal();
		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		String tokenAcces=principalDetail.getAccess_token() ;
		logger.info("json object params## "+jsonObject.toString());
		String url="http://94.74.70.52:8149"+constSkills.getGuardarSkillSimple();
		ServiceResponseResult response=restCaller.callPatchBearerTokenRequest(jsonObject.toString(), url, ServiceResponseResult.class, tokenAcces);
		logger.info("RESULT guardarSkills"+gson.toJson(response));
		return null;
	}

	@Override
	public ServiceResponseResult consultarCatalogosPI(String params) {
JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		
		JsonObject login = new JsonObject();		
		login.addProperty( env.getProperty("param.textus.pI") , constantesAmbiente.getTextIpUsuario());
		login.addProperty( env.getProperty("param.textus.drowssaP") , constantesAmbiente.getTextCredPad());
		login.addProperty( env.getProperty("param.textus.resU") , constantesAmbiente.getTextCredUs());	
		
		jsonObject.add("Login", login);
		
		logger.info("json object params## "+jsonObject.toString());
		
	    String url="http://10.216.47.89"+constSkills.getFiltrosSkillsPI();
		ServiceResponseResult response= restCaller.callPostParamString(url, jsonObject.toString());
	    logger.info("RESULT"+gson.toJson(response));
		return response;
	}
	@Override
	public ServiceResponseResult consultarCatalogoGeografiaGeneral() {
		logger.info("ImplDespachoPIService.class [metodo = consultarCatalogoGeografiaGeneral() ]\n");
		
		
		LoginResult principalDetail=utilerias.obtenerObjetoPrincipal();
		String tokenAcces=principalDetail.getAccess_token() ;
		logger.info("consultarCatalogoGeografiaGeneral ##+"+tokenAcces);							
	    String urlRequest=principalDetail.getDireccionAmbiente().concat( constSkills.getConsultarCatalogoGeografiaUsuarioPI() );
		
	    Map<String, String> paramsRequestGet = new HashMap<String, String>();
		//paramsRequestGet.put("idDespacho", principalDetail.getIdUsuario()+"");	    
		ServiceResponseResult response= restCaller.callGetBearerTokenRequest( 
																			paramsRequestGet,
																			urlRequest,
																			ServiceResponseResult.class , 
																			tokenAcces );
	    logger.info("RESULT Catalogo geo"+gson.toJson(response));
		return response;
	}

}
