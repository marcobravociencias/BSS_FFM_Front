package com.totalplay.ffm.plantainterna.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.totalplay.ffm.plantainterna.repository.OrdenTrabajoPIRepository;
import com.totalplay.ffm.plantainterna.service.DespachoPIService;
import com.totalplay.ffm.plantainterna.utils.ConstDespachoPI;
import com.totalplay.ffm.utilerias.model.LoginResult;
import com.totalplay.ffm.utilerias.model.ServiceResponseResult;
import com.totalplay.ffm.utilerias.utils.ConstantesGeneric;
import com.totalplay.ffm.utilerias.utils.ConsumeRest;
import com.totalplay.ffm.utilerias.utils.UtileriaGeneral;

import lombok.Data;

import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

@Service
public class ImplDespachoPIService implements DespachoPIService{
	private  final Logger logger = LogManager.getLogger(ImplDespachoPIService.class.getName());

    @Autowired
    ConstantesGeneric constantesAmbiente;
	
	@Autowired
	ConstDespachoPI constDespachoPI;
	
	@Autowired
	OrdenTrabajoPIRepository ordenTrabajoRepository;
	
	@Autowired
	private ConsumeRest restCaller;
	
	@Autowired
	private UtileriaGeneral utilerias;
	
	@Autowired
	private Environment env;
	
	Gson gson=new Gson();
	
	@Override
	public ServiceResponseResult consultarlocalizacionOtPIDespacho(String params) {
		logger.info("ImplDespachoPIService.class [metodo = consultarlocalizacionOtPIDespacho() ]\n"+params);
		
		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		String paramacc=jsonObject.get("yekparam").getAsString();
		
		LoginResult principalDetail=utilerias.obtenerObjetoPrincipal();
		String tokenAcces=principalDetail.getAccess_token() ;
		logger.info("consultarlocalizacionOtPIDespacho ##+"+tokenAcces);							
	    String urlRequest=principalDetail.getDireccionAmbiente().concat( constDespachoPI.getConsultaLocalizacionOT() );
		
	    Map<String, String> paramsRequestGet = new HashMap<String, String>();
		paramsRequestGet.put("yekparam", paramacc );	  
		
		ServiceResponseResult response= restCaller.callGetBearerTokenRequest( 
																			paramsRequestGet,
																			urlRequest,
																			ServiceResponseResult.class , 
																			tokenAcces );
	    logger.info("RESULT"+gson.toJson(response));
		return response;
	}
	
	@Override
	public ServiceResponseResult consultarCatalogoAccionesOTPI() {
		logger.info("ImplDespachoPIService.class [metodo = consultarCatalogoAccionesOTPI() ]\n");
		
		
		LoginResult principalDetail=utilerias.obtenerObjetoPrincipal();
		String tokenAcces=principalDetail.getAccess_token() ;
		logger.info("consultarOperariosAsignadosDespacho ##+"+tokenAcces);							
	    String urlRequest=principalDetail.getDireccionAmbiente().concat( constDespachoPI.getConsultarOperariosAsignadosDespachoPI() );
		
	    Map<String, String> paramsRequestGet = new HashMap<String, String>();
		paramsRequestGet.put("idDespacho", principalDetail.getIdUsuario()+"");	    
		logger.info("idDespacho ##+"+principalDetail.getIdUsuario());							
		ServiceResponseResult response= restCaller.callGetBearerTokenRequest( 
																			paramsRequestGet,
																			urlRequest,
																			ServiceResponseResult.class , 
																			tokenAcces );
	    logger.info("RESULT"+gson.toJson(response));
		return response;
	}
	
	@Override
	public ServiceResponseResult consultarColoresIconografia() {
		logger.info("ImplDespachoPIService.class [metodo = consultarColoresIconografia() ]\n");
		
		LoginResult principalDetail=utilerias.obtenerObjetoPrincipal();
		String tokenAcces=principalDetail.getAccess_token() ;
		logger.info("consultarColoresIconografia ##+"+tokenAcces);							
	    String urlRequest=principalDetail.getDireccionAmbiente().concat( constDespachoPI.getConsultaPaletaColoresDespachoPI() );
		
	    Map<String, String> paramsRequestGet = new HashMap<String, String>();
		paramsRequestGet.put("idDespacho", principalDetail.getIdUsuario()+"");	    
		
		ServiceResponseResult response= restCaller.callGetBearerTokenRequest( 
																			paramsRequestGet,
																			urlRequest,
																			ServiceResponseResult.class , 
																			tokenAcces );
	    logger.info("RESULT"+gson.toJson(response));
		return response;
	}
	
	@Override
	public ServiceResponseResult cambiarEstatusOrdenTrabajo(String params) {
		logger.info("ImplDespachoPIService.class [metodo = cambiarEstatusOrdenTrabajo() ]\n"+params);
		LoginResult principalDetail=utilerias.obtenerObjetoPrincipal();
		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		
		jsonObject.addProperty("idUsuarioDespacho", principalDetail.getIdUsuario());
		jsonObject.addProperty("latitud"  , 1651651.5);
		jsonObject.addProperty("longitud" , 65465);
		String tokenAcces=principalDetail.getAccess_token() ;

		String idOtEnvio=jsonObject.get("idOtEnvio").getAsString();
		String textAccionCambioEstatus=jsonObject.get("textAccionCambioEstatus").getAsString();				
		logger.info("json object params## "+jsonObject.toString());	
		
		String urlRequest=principalDetail.getDireccionAmbiente()
				.concat(constDespachoPI.getCambiarEstatusOrdenTrabajoPI())
				.concat(textAccionCambioEstatus)
				.concat("/").concat(idOtEnvio);
		
		ServiceResponseResult response= restCaller.callPostBearerTokenRequest(
				jsonObject.toString(),
				urlRequest,
				ServiceResponseResult.class,
				tokenAcces);
		
	    logger.info("RESULT"+gson.toJson(response));
		return response;
	}
	
	

	@Override
	public ServiceResponseResult consultarOrdenesAsignadasOperario(String params) {
		logger.info("ImplDespachoPIService.class [metodo = consultarOrdenesAsignadasOperario() ]\n"+params);
		LoginResult principalDetail=utilerias.obtenerObjetoPrincipal();

		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		String fechaInicioParams=jsonObject.get("fechaInicio").getAsString();
		String fechaFinParams=jsonObject.get("fechaFin").getAsString();

		logger.info("fechaInicioParams ##"  +fechaInicioParams);							
		logger.info("fechaFinParams ##" 	+fechaFinParams);							
		logger.info("iddespacho ## "+ principalDetail.getIdUsuario());
		String tokenAcces=principalDetail.getAccess_token() ;
		logger.info("consultarOperariosAsignadosDespacho ##+"+tokenAcces);							
	    String urlRequest=principalDetail.getDireccionAmbiente().concat( constDespachoPI.getConsultaOrdenesAsignadasOperarioPI() );
		logger.info("URL ##+"+urlRequest);							

	    Map<String, String> paramsRequestGet = new HashMap<String, String>();
	    paramsRequestGet.put("idDespacho" , principalDetail.getIdUsuario()+"");
	    paramsRequestGet.put("fechaInicio", fechaInicioParams);
	    paramsRequestGet.put("fechaFin"	  , fechaFinParams);
	
		ServiceResponseResult response= restCaller.callGetBearerTokenRequest(
																			paramsRequestGet,
																			urlRequest,
																			ServiceResponseResult.class , 
																			tokenAcces );
		return response;
	}
	
	
	@Override
	public ServiceResponseResult consultarOperariosAsignadosDespacho() {
		logger.info("ImplDespachoPIService.class [metodo = consultarOperariosAsignadosDespacho() ]");
		
		LoginResult principalDetail=utilerias.obtenerObjetoPrincipal();
		String tokenAcces=principalDetail.getAccess_token() ;
		logger.info("consultarOperariosAsignadosDespacho ##+"+tokenAcces);							
	    String urlRequest=principalDetail.getDireccionAmbiente().concat( constDespachoPI.getConsultarOperariosAsignadosDespachoPI() );
		
	    Map<String, String> paramsRequestGet = new HashMap<String, String>();
		paramsRequestGet.put("idDespacho", principalDetail.getIdUsuario()+"");	    
		logger.info("idDespacho ##+"+principalDetail.getIdUsuario());							
		ServiceResponseResult response= restCaller.callGetBearerTokenRequest( 
																			paramsRequestGet,
																			urlRequest,
																			ServiceResponseResult.class , 
																			tokenAcces );
	    logger.info("RESULT"+gson.toJson(response));
		return response;
	}
	
	@Override
	public ServiceResponseResult consultarDetalleOTPI(String params) {
		logger.info("ImplDespachoPIService.class [metodo = consultarDetalleOTPI() ]\n"+params);
		
		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		String idotdetalle=jsonObject.get("idOt").getAsString();
		
		LoginResult principalDetail=utilerias.obtenerObjetoPrincipal();
		String tokenAcces=principalDetail.getAccess_token() ;
		logger.info("consultarOperariosAsignadosDespacho ##+"+tokenAcces);							
	    String urlRequest=principalDetail.getDireccionAmbiente().concat( constDespachoPI.getConsultaDetalleOrdenPI() );
		logger.info("#########3--"+urlRequest);
		
		logger.info("#######idotdetalle------"+idotdetalle);
	    Map<String, String> paramsRequestGet = new HashMap<String, String>();
		paramsRequestGet.put("idotasign", idotdetalle);	    

		ServiceResponseResult response= restCaller.callGetBearerTokenRequest( 
																			paramsRequestGet,
																			urlRequest,
																			ServiceResponseResult.class , 
																			tokenAcces );
	    logger.info("RESULT"+gson.toJson(response));
		return response;
	}
	
	@Override
	public ServiceResponseResult consultarComentariosOTPI(String params) {
		logger.info("ImplDespachoPIService.class [metodo = consultarComentariosOTPI() ]\n"+params);
		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		String idOperario=jsonObject.get("idOperario").getAsString();
		
		LoginResult principalDetail=utilerias.obtenerObjetoPrincipal();
		String tokenAcces=principalDetail.getAccess_token() ;
		logger.info("consultarOperariosAsignadosDespacho ##+"+tokenAcces);							
	    String urlRequest=principalDetail.getDireccionAmbiente().concat( constDespachoPI.getConsultaComentariosOrdenPI() );
		
	    Map<String, String> paramsRequestGet = new HashMap<String, String>();
		paramsRequestGet.put("idDespacho", principalDetail.getIdUsuario()+"");	    
		paramsRequestGet.put("idOperario", idOperario);	    

		ServiceResponseResult response= restCaller.callGetBearerTokenRequest( 
																			paramsRequestGet,
																			urlRequest,
																			ServiceResponseResult.class , 
																			tokenAcces );
	    logger.info("RESULT"+gson.toJson(response));
		return response;
	}
	
	@Override
	public ServiceResponseResult consultarHistoricoOTPI(String params) {
		logger.info("ImplDespachoPIService.class [metodo = consultarHistoricoOTPI() ]\n"+params);
	
		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		String idOperario=jsonObject.get("idOperario").getAsString();
		
		LoginResult principalDetail=utilerias.obtenerObjetoPrincipal();
		String tokenAcces=principalDetail.getAccess_token() ;
		logger.info("consultarOperariosAsignadosDespacho ##+"+tokenAcces);							
	    String urlRequest=principalDetail.getDireccionAmbiente().concat( constDespachoPI.getConsultaHistoricoOrdenPI() );
		
	    Map<String, String> paramsRequestGet = new HashMap<String, String>();
		paramsRequestGet.put("idDespacho", principalDetail.getIdUsuario()+"");	    
		paramsRequestGet.put("idOperario", idOperario);	    

		ServiceResponseResult response= restCaller.callGetBearerTokenRequest( 
																			paramsRequestGet,
																			urlRequest,
																			ServiceResponseResult.class , 
																			tokenAcces );
	    logger.info("RESULT"+gson.toJson(response));
		return response;
	}
	

	@Override
	public ServiceResponseResult obtenerOrdenesTrabajoPendientesDespacho( String params ) {		
		logger.info("ImplDespachoPIService.class [metodo = obtenerOrdenesTrabajoPendientesDespacho() ]\n"+params);

		LoginResult principalDetail=utilerias.obtenerObjetoPrincipal();
		String tokenAcces=principalDetail.getAccess_token() ;
		logger.info("consultarOperariosAsignadosDespacho ##+"+tokenAcces);	
		
	
	    String urlRequest=principalDetail.getDireccionAmbiente().concat( constDespachoPI.getOrdenesPendientesDespachoP() );
	    
		ServiceResponseResult response= restCaller.callPostBearerTokenRequest(
																			params,
																			urlRequest,
																			ServiceResponseResult.class,
																			tokenAcces);				
	    logger.info("RESULT"+gson.toJson(response));
		return response;
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
		
	    String url="http://10.216.47.89"+constDespachoPI.getFiltrosDespachoPI();
		ServiceResponseResult response= restCaller.callPostParamString(url, jsonObject.toString());
	    logger.info("RESULT"+gson.toJson(response));
		return response;
	}
	
	




	@Override
	public ServiceResponseResult consultarConteoAlertasPI(String params) {
		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		
		JsonObject login = new JsonObject();		
		login.addProperty( env.getProperty("param.textus.pI") 		, constantesAmbiente.getTextIpUsuario());
		login.addProperty( env.getProperty("param.textus.drowssaP") , constantesAmbiente.getTextCredPad());
		login.addProperty( env.getProperty("param.textus.resU") 	, constantesAmbiente.getTextCredUs());
		
		jsonObject.add("Login", login);
		logger.info("json object params## "+jsonObject.toString());	
		String url="http://10.216.47.89"+constDespachoPI.getConteoAlertasDespachoPI();	
		ServiceResponseResult response= restCaller.callPostParamString(url, jsonObject.toString());
				
	    logger.info("RESULT"+gson.toJson(response));
		return response;
	}


	@Override
	public ServiceResponseResult consultarCatalogoEstatusTecnico(String params) {
		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		
		JsonObject login = new JsonObject();		
		login.addProperty( env.getProperty("param.textus.pI") 		, constantesAmbiente.getTextIpUsuario());
		login.addProperty( env.getProperty("param.textus.drowssaP") , constantesAmbiente.getTextCredPad());
		login.addProperty( env.getProperty("param.textus.resU") 	, constantesAmbiente.getTextCredUs());
		
		jsonObject.add("Login", login);
		logger.info("json object params## "+jsonObject.toString());	
		String url="http://10.216.47.89"+constDespachoPI.getCatalogoEstatusTecnicoPI();	
		ServiceResponseResult response= restCaller.callPostParamString(url, jsonObject.toString());
				
	    logger.info("RESULT"+gson.toJson(response));
		return response;
	}
	

	@Override
	public ServiceResponseResult cambiarEstatusTecnicoDespachoPI(String params) {
		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		
		JsonObject login = new JsonObject();		
		login.addProperty( env.getProperty("param.textus.pI") 		, constantesAmbiente.getTextIpUsuario());
		login.addProperty( env.getProperty("param.textus.drowssaP") , constantesAmbiente.getTextCredPad());
		login.addProperty( env.getProperty("param.textus.resU") 	, constantesAmbiente.getTextCredUs());
		
		jsonObject.add("Login", login);
		logger.info("json object params## "+jsonObject.toString());	
		String url="http://10.216.47.89"+constDespachoPI.getCambiarEstatusOperarioPI();	
		ServiceResponseResult response= restCaller.callPostParamString(url, jsonObject.toString());
				
	    logger.info("RESULT"+gson.toJson(response));
		return response;
	}
	
	@Override
	public ServiceResponseResult consultarOtsTrabajadasDespachoPI(String params) {
		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		
		JsonObject login = new JsonObject();		
		login.addProperty( env.getProperty("param.textus.pI") 		, constantesAmbiente.getTextIpUsuario());
		login.addProperty( env.getProperty("param.textus.drowssaP") , constantesAmbiente.getTextCredPad());
		login.addProperty( env.getProperty("param.textus.resU") 	, constantesAmbiente.getTextCredUs());
		
		jsonObject.add("Login", login);
		logger.info("json object params## "+jsonObject.toString());	
		String url="http://10.216.47.89"+constDespachoPI.getConsultaOtsTrabajadasDespachoPI();	
		ServiceResponseResult response= restCaller.callPostParamString(url, jsonObject.toString());
				
	    logger.info("RESULT"+gson.toJson(response));
		return response;
	}

	@Override
	public ServiceResponseResult consultarInformacionVehiculoOperario(String params) {
		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		
		JsonObject login = new JsonObject();		
		login.addProperty( env.getProperty("param.textus.pI") 		, constantesAmbiente.getTextIpUsuario());
		login.addProperty( env.getProperty("param.textus.drowssaP") , constantesAmbiente.getTextCredPad());
		login.addProperty( env.getProperty("param.textus.resU") 	, constantesAmbiente.getTextCredUs());
		
		jsonObject.add("Login", login);
		logger.info("json object params## "+jsonObject.toString());	
		String url="http://10.216.47.89"+constDespachoPI.getConsultaInformacionVehiculoOper();	
		ServiceResponseResult response= restCaller.callPostParamString(url, jsonObject.toString());				
	    logger.info("RESULT"+gson.toJson(response));
		return response;
	}
	
	@Override
	public ServiceResponseResult consultarMaterialesOperarioPI(String params) {
		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		
		JsonObject login = new JsonObject();		
		login.addProperty( env.getProperty("param.textus.pI") 		, constantesAmbiente.getTextIpUsuario());
		login.addProperty( env.getProperty("param.textus.drowssaP") , constantesAmbiente.getTextCredPad());
		login.addProperty( env.getProperty("param.textus.resU") 	, constantesAmbiente.getTextCredUs());
		
		jsonObject.add("Login", login);
		logger.info("json object params## "+jsonObject.toString());	
		String url="http://10.216.47.89"+constDespachoPI.getConsultaInformacionMaterialesOperario();	
		ServiceResponseResult response= restCaller.callPostParamString(url, jsonObject.toString());				
	    logger.info("RESULT"+gson.toJson(response));
		return response;
	}


	@Override
	public ServiceResponseResult getDetalleAlertas(String params) {
		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		
		JsonObject login = new JsonObject();		
		login.addProperty( env.getProperty("param.textus.pI") 		, constantesAmbiente.getTextIpUsuario());
		login.addProperty( env.getProperty("param.textus.drowssaP") , constantesAmbiente.getTextCredPad());
		login.addProperty( env.getProperty("param.textus.resU") 	, constantesAmbiente.getTextCredUs());
		
		jsonObject.add("Login", login);
		logger.info("json object params## "+jsonObject.toString());
		String url="http://10.216.47.89"+constDespachoPI.getConsultarDetalleAlerta();
		ServiceResponseResult response= restCaller.callPostParamString(url, jsonObject.toString());				
	    logger.info("RESULT"+gson.toJson(response));
		return response;
	}


	@Override
	public ServiceResponseResult consultaAcciones(String params) {
JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		
		JsonObject login = new JsonObject();		
		login.addProperty( env.getProperty("param.textus.pI") 		, constantesAmbiente.getTextIpUsuario());
		login.addProperty( env.getProperty("param.textus.drowssaP") , constantesAmbiente.getTextCredPad());
		login.addProperty( env.getProperty("param.textus.resU") 	, constantesAmbiente.getTextCredUs());
		
		jsonObject.add("Login", login);
		logger.info("json object params## "+jsonObject.toString());
		String url="http://10.216.47.89"+constDespachoPI.getConsultarDetalleAlerta();
		ServiceResponseResult response= restCaller.callPostParamString(url, jsonObject.toString());				
	    logger.info("RESULT"+gson.toJson(response));
		return response;
	}


	@Override
	public ServiceResponseResult getCatalogoStatusEstadoMotivo(String params) {
		// TODO Auto-generated method stub
		return null;
	}
	
	@Override 
	  public ServiceResponseResult cambiarEstatusIntegrador(String params) { 
	    JsonObject jsonObject = gson.fromJson(params, JsonObject.class); 
	     
	    JsonObject login = new JsonObject();     
	    login.addProperty( env.getProperty("param.textus.pI")     , constantesAmbiente.getTextIpUsuario()); 
	    login.addProperty( env.getProperty("param.textus.drowssaP") , constantesAmbiente.getTextCredPad()); 
	    login.addProperty( env.getProperty("param.textus.resU")   , constantesAmbiente.getTextCredUs()); 
	     
	    jsonObject.add("Login", login); 
	    logger.info("json object params## "+jsonObject.toString()); 
	    String url="http://10.216.47.89"+constDespachoPI.getCanalizarAlerta(); 
	    ServiceResponseResult response= restCaller.callPostParamString(url, jsonObject.toString());         
	      logger.info("RESULT"+gson.toJson(response)); 
	    return response; 
	  } 
	 
	  @Override 
	  public ServiceResponseResult setComentariosIntegrador(String params) { 
	    JsonObject jsonObject = gson.fromJson(params, JsonObject.class); 
	     
	    JsonObject login = new JsonObject();     
	
	    login.addProperty( env.getProperty("param.textus.pI")     , constantesAmbiente.getTextIpUsuario()); 
	    login.addProperty( env.getProperty("param.textus.drowssaP") , constantesAmbiente.getTextCredPad()); 
	    login.addProperty( env.getProperty("param.textus.resU")   , constantesAmbiente.getTextCredUs()); 
	     
	    jsonObject.add("Login", login); 
	    logger.info("json object params## "+jsonObject.toString()); 
	    String url="http://10.216.47.89"+constDespachoPI.getAgregarComentarioAlerta(); 
	    ServiceResponseResult response= restCaller.callPostParamString(url, jsonObject.toString());         
	      logger.info("RESULT"+gson.toJson(response)); 
	    return response; 
	  } 


	@Override
	public ServiceResponseResult consultarEvidenciaAlertaPI(String params) {
		// TODO Auto-generated method stub
		return null;
	}


	@Override
	public ServiceResponseResult consultarHistoricoAlertaPI(String params) {
		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		
		JsonObject login = new JsonObject();		
		login.addProperty( env.getProperty("param.textus.pI") 		, constantesAmbiente.getTextIpUsuario());
		login.addProperty( env.getProperty("param.textus.drowssaP") , constantesAmbiente.getTextCredPad());
		login.addProperty( env.getProperty("param.textus.resU") 	, constantesAmbiente.getTextCredUs());
		
		jsonObject.add("Login", login);
		logger.info("json object params## "+jsonObject.toString());
		String url="http://10.216.47.89"+constDespachoPI.getConsultarHistoricoAlerta();
		ServiceResponseResult response= restCaller.callPostParamString(url, jsonObject.toString());				
	    logger.info("RESULT"+gson.toJson(response));
		return response;
	}

	@Override
	public ServiceResponseResult consultarComentariosAlertaPI(String params) {
		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		
		JsonObject login = new JsonObject();		
		login.addProperty( env.getProperty("param.textus.pI") 		, constantesAmbiente.getTextIpUsuario());
		login.addProperty( env.getProperty("param.textus.drowssaP") , constantesAmbiente.getTextCredPad());
		login.addProperty( env.getProperty("param.textus.resU") 	, constantesAmbiente.getTextCredUs());
		
		jsonObject.add("Login", login);
		logger.info("json object params## "+jsonObject.toString());
		String url="http://10.216.47.89"+constDespachoPI.getConsultarComentariosAlerta();
		ServiceResponseResult response= restCaller.callPostParamString(url, jsonObject.toString());				
	    logger.info("RESULT"+gson.toJson(response));
		return response;
	}


}
