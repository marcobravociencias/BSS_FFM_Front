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
import com.mx.totalplay.ffm.cloudweb.plantainterna.service.BandejasSalesforceService;
import com.mx.totalplay.ffm.cloudweb.plantainterna.utils.ConstBandejasSalesforce;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.LoginResult;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.ConstantesGeneric;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.ConsumeRest;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.UtileriaGeneral;

@Service
public class ImplBandejasSalesforceService implements BandejasSalesforceService {
	
	private final Logger logger = LogManager.getLogger(ImplBandejasSalesforceService.class.getName());
	private final ConsumeRest restCaller;
    private final ConstantesGeneric constantesGeneric;
    private final Environment env;
    private final ConstBandejasSalesforce constBandejasSalesforce;
    private final UtileriaGeneral utilerias;
    Gson gson = new Gson();
    
    @Autowired
    public ImplBandejasSalesforceService (ConsumeRest restCaller, ConstantesGeneric constantesGeneric,  Environment env, ConstBandejasSalesforce constBandejasSalesforce, UtileriaGeneral utilerias) {
    	this.restCaller = restCaller;
    	this.constantesGeneric = constantesGeneric;
    	this.env = env;
    	this.constBandejasSalesforce = constBandejasSalesforce;
    	this.utilerias = utilerias;
    }

	@Override
	public ServiceResponseResult consultarPendientesAgendarBandejasSF(String params) {
		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		logger.info("ImplBandejasSalesforceService.class [metodo = consultarPendientesAgendarBandejasSF() ] \n" + jsonObject);
		
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
		String tokenAccess = principalDetail.getAccess_token();
		logger.info("consultarPendientesAgendarBandejasSF## "+tokenAccess);
		
		String urlRequest = principalDetail.getDireccionAmbiente().concat(constBandejasSalesforce.getConsultaPendientesAgendarBandejasSF());
		logger.info("URL## " + urlRequest);
		
		ServiceResponseResult response = restCaller.callPostBearerTokenRequest(jsonObject.toString(), urlRequest, ServiceResponseResult.class, tokenAccess);
		
		return response;
	}

	@Override
	public ServiceResponseResult consultarRescataventasBandejasSF(String params) {
		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		logger.info("ImplBandejasSalesforceService.class [metodo = consultarRescataventasBandejasSF() ] \n" + jsonObject);
		
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
		String tokenAccess = principalDetail.getAccess_token();
		logger.info("consultarRescataventasBandejasSF## "+tokenAccess);
		
		String urlRequest = principalDetail.getDireccionAmbiente().concat(constBandejasSalesforce.getConsultaRescataventasBandejasSF());
		logger.info("URL## " + urlRequest);
		
		ServiceResponseResult response = restCaller.callPostBearerTokenRequest(jsonObject.toString(), urlRequest, ServiceResponseResult.class, tokenAccess);
		
		return response;
	}

	@Override
	public ServiceResponseResult consultarPendientesActivarBandejasSF(String params) {
		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		logger.info("ImplBandejasSalesforceService.class [metodo = consultarPendientesActivarBandejasSF() ] \n" + jsonObject);
		
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
		String tokenAccess = principalDetail.getAccess_token();
		logger.info("consultarPendientesActivarBandejasSF## "+tokenAccess);
		
		String urlRequest = principalDetail.getDireccionAmbiente().concat(constBandejasSalesforce.getConsultaPendientesActivarBandejasSF());
		logger.info("URL## " + urlRequest);
		
		ServiceResponseResult response = restCaller.callPostBearerTokenRequest(jsonObject.toString(), urlRequest, ServiceResponseResult.class, tokenAccess);
		
		return response;
	}

	@Override
	public ServiceResponseResult consultarFactibilidadEmprResiBandejasSF(String params) {
		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		logger.info("ImplBandejasSalesforceService.class [metodo = consultarFactibilidadEmprResiBandejasSF() ] \n" + jsonObject);
		
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
		String tokenAccess = principalDetail.getAccess_token();
		logger.info("consultarPendientesActivarBandejasSF## "+tokenAccess);
		
		int idUnidadNegocio = principalDetail.getIdUnidadNegocio();
		
		String urlRequest = "";
		
		if(idUnidadNegocio == 1) {
			urlRequest = principalDetail.getDireccionAmbiente().concat(constBandejasSalesforce.getConsultaFactibilidadResidencialBandejasSF());
		}else if(idUnidadNegocio == 2) {
			urlRequest = principalDetail.getDireccionAmbiente().concat(constBandejasSalesforce.getConsultaFactibilidadEmpresarialBandejasSF());
		}
	
		logger.info("URL## " + urlRequest);
		
		Map<String, String> paramsRequestGet = new HashMap<String, String>();
		paramsRequestGet.put("latitud", jsonObject.get("latitud").getAsString());
		paramsRequestGet.put("longitud", jsonObject.get("longitud").getAsString());
		
		logger.info(paramsRequestGet);
		logger.info("------------------------------------------------>>>>>>> " + idUnidadNegocio);
		logger.info("------------------------------------------------>>>>>>> " + principalDetail.getUnidadNegocio());

		ServiceResponseResult response = restCaller.callGetBearerTokenRequest(paramsRequestGet, urlRequest,
				ServiceResponseResult.class, tokenAccess);
		return response;
	}

	@Override
	public ServiceResponseResult consultarInfoSitioInstalacion(String params) {
	    JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
	    logger.info("ImplBandejasSalesforceService.class [metodo = consultarInfoSitioInstalacion() ] \n" + params);		
	    LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
	    String tokenAccess = principalDetail.getAccess_token();				
	    String urlRequest = principalDetail.getDireccionAmbiente().concat(constBandejasSalesforce.getConsultaDetalleSitioAgendamiento());		
	    Map<String, String> paramsRequestGet = new HashMap<String, String>();
	    paramsRequestGet.put("cuenta", jsonObject.get("cuenta").getAsString());		
	    logger.info(paramsRequestGet);
	    logger.info("url sitio "+urlRequest);

	    ServiceResponseResult response = restCaller.callGetBearerTokenRequest(paramsRequestGet, urlRequest,
	            ServiceResponseResult.class, tokenAccess);
		return response;
	}

	@Override
	public ServiceResponseResult guardarContactoSalesforce(String params) {
		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		logger.info("ImplBandejasSalesforceService.class [metodo = guardarContactoSalesforce() ] \n" + params);
		
		JsonArray arrayContacto = jsonObject.get("arrayContactos").getAsJsonArray();
		String cuenta=jsonObject.get("cuenta").getAsString();
		String idCsp=jsonObject.get("idCsp").getAsString();
				
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
		String tokenAccess = principalDetail.getAccess_token();
		
	    Map<String, String> paramUri = new HashMap<String, String>(){{
            put("cuenta", cuenta);
            put("idCsp", idCsp);
        }};
        
        String contacto=arrayContacto.toString();
        logger.info("paramss --------- " + paramUri);
                
		String urlRequest = principalDetail.getDireccionAmbiente().concat(constBandejasSalesforce.getAgregaContactoAgenda());
		
		
		ServiceResponseResult response=restCaller.callPostBearerTokenRequestURL2(paramUri, contacto, urlRequest, ServiceResponseResult.class, tokenAccess)	;	
		return response;
	}
	
	@Override
	public ServiceResponseResult actualizarFactibilidadSitio(String params) {
	    JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
	    logger.info("ImplBandejasSalesforceService.class [metodo = actualizarFactibilidadSitio() ] \n" + params);

	    LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
	    String tokenAccess = principalDetail.getAccess_token();
	    String urlRequest = principalDetail.getDireccionAmbiente().concat(constBandejasSalesforce.getActualizaFactibilidadSitio());
	    logger.info("URL## " + urlRequest);
	    
	    Map<String, String> paramsRequestGet = new HashMap<String, String>();
	    paramsRequestGet.put("cuenta", jsonObject.get("cuenta").getAsString());
	    
	    ServiceResponseResult response = restCaller.callPatchBearerTokenRequestURL(paramsRequestGet,params, urlRequest,
	            ServiceResponseResult.class, tokenAccess);
	    return response;
	}

	@Override
	public ServiceResponseResult agendarOrdenSalesforce(String params) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ServiceResponseResult consultarDetalleEquiposBandejasSF(String params) {
		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
	    logger.info("ImplBandejasSalesforceService.class [metodo = consultarDetalleEquiposBandejasSF() ] \n" + params);

	    LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
	    String tokenAccess = principalDetail.getAccess_token();
		logger.info("consultarDetalleEquiposBandejasSF## "+tokenAccess);
		
	    String urlRequest = principalDetail.getDireccionAmbiente().concat(constBandejasSalesforce.getConsultaDetalleEquiposBandejasSF());
	    logger.info("URL## " + urlRequest);
	    
	    Map<String, String> paramsRequestGet = new HashMap<String, String>();
	    paramsRequestGet.put("idCotSitioPlan", jsonObject.get("idCotSitioPlan").getAsString());
	    
	    ServiceResponseResult response = restCaller.callGetBearerTokenRequest(paramsRequestGet, urlRequest,
	            ServiceResponseResult.class, tokenAccess);
	    return response;
	}

	@Override
	public ServiceResponseResult consultarValidacionCSPBandejasSF(String params) {
		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
	    logger.info("ImplBandejasSalesforceService.class [metodo = consultarValidacionCSPBandejasSF() ] \n" + params);

	    LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
	    String tokenAccess = principalDetail.getAccess_token();
		logger.info("consultarValidacionCSPBandejasSF## "+tokenAccess);
		
	    String urlRequest = principalDetail.getDireccionAmbiente().concat(constBandejasSalesforce.getConsultaValidacionCSPBandejasSF());
	    logger.info("URL## " + urlRequest);
	    
	    Map<String, String> paramsRequestGet = new HashMap<String, String>();
	    paramsRequestGet.put("idCotSitioPlan", jsonObject.get("idCotSitioPlan").getAsString());
	    
	    ServiceResponseResult response = restCaller.callGetBearerTokenRequest(paramsRequestGet, urlRequest,
	            ServiceResponseResult.class, tokenAccess);
	    return response;
	}
    
	@Override
	public ServiceResponseResult agendarPendienteBandejaSF(String params) {
		logger.info("ImplBandejasSalesforceService.class [metodo = agendarPendienteBandejaSF() ] \n" + params);
		LoginResult principalDetail=utilerias.obtenerObjetoPrincipal();
		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		String tokenAcces=principalDetail.getAccess_token() ;
		String url = principalDetail.getDireccionAmbiente().concat(constBandejasSalesforce.getAgendarPendienteBandejaSF());
		ServiceResponseResult response=restCaller.callPostBearerTokenRequest(jsonObject.toString(), url, ServiceResponseResult.class, tokenAcces);
		logger.info("URL " + url);
		logger.info("RESULT guardarUsuario " + gson.toJson(response));
		return response;
	}
    
}
