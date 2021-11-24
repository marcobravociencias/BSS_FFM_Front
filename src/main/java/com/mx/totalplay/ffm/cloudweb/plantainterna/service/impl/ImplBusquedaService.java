package com.mx.totalplay.ffm.cloudweb.plantainterna.service.impl;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.mx.totalplay.ffm.cloudweb.plantainterna.service.BusquedaService;
import com.mx.totalplay.ffm.cloudweb.plantainterna.utils.ConstBusqueda;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.LoginResult;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.ConstantesGeneric;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.ConsumeRest;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.UtileriaGeneral;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class ImplBusquedaService implements BusquedaService {
    private final Logger logger = LogManager.getLogger(ImplBusquedaService.class.getName());
    private final ConsumeRest restCaller;
    private ServiceResponseResult response;
    private final Environment environment;
    private final UtileriaGeneral utilerias;
    private Gson gson = new Gson();
    private final ConstantesGeneric constantesGeneric;
    private final ConstBusqueda constBusqueda;
    private String despFFM = "DESPACHO FFM WEB";

    @Autowired
    public ImplBusquedaService(ConsumeRest restCaller, Environment environment, UtileriaGeneral utilerias, ConstantesGeneric constantesGeneric, ConstBusqueda constBusqueda) {
        this.restCaller = restCaller;
        this.environment = environment;
        this.utilerias = utilerias;
        this.constantesGeneric = constantesGeneric;
        this.constBusqueda = constBusqueda;
    }

    @Override
    public ServiceResponseResult busquedaGeneralSF(String params) {
        JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
        LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
        String tokenAcces = principalDetail.getAccess_token();
        String urlRequest = principalDetail.getDireccionAmbiente().concat(constBusqueda.getBusquedaSaleForces());
        logger.info("### URL busquedaGeneralSF(): \n" + urlRequest);
        Map<String, String> paramsRequestGet = new HashMap<>();
        paramsRequestGet.put("parametro", jsonObject.get("busqueda").getAsString());

        ServiceResponseResult response = restCaller.callGetBearerTokenRequest(
                paramsRequestGet,
                urlRequest,
                ServiceResponseResult.class,
                tokenAcces);

        logger.info("### RESULT busquedaGeneralSF(): " + gson.toJson(response));
        return response;
    }

    @Override
    public ServiceResponseResult consultarDetalleObjectSF(String params) {
        logger.info("ImplBusquedaService.class consultarDetalleObjectSF(): \n" + params);

        LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
        String tokenAcces = principalDetail.getAccess_token();
        String urlRequest = principalDetail.getDireccionAmbiente().concat(constBusqueda.getConsultaDetalleObjetoSF());
        logger.info("###URL consultarDetalleObjectSF(): "+ urlRequest);
        ServiceResponseResult response = restCaller.callPostBearerTokenRequest(
                params,
                urlRequest,
                ServiceResponseResult.class,
                tokenAcces);
        logger.info("####RESULT: " + gson.toJson(response));
        return response;
    }

    @Override
    public ServiceResponseResult consultaComentariosNoticiasSF(String params) {
        JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
        LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
        String tokenAcces = principalDetail.getAccess_token();
        String urlRequest = principalDetail.getDireccionAmbiente().concat(constBusqueda.getConsultarNoticias());
        logger.info("### URL consultaComentariosNoticiasSF(): \n" + urlRequest);
        Map<String, String> paramsRequestGet = new HashMap<>();
        paramsRequestGet.put("objectId", jsonObject.get("objectId").getAsString());
        paramsRequestGet.put("objectType", jsonObject.get("objectType").getAsString());

        ServiceResponseResult response = restCaller.callGetBearerTokenRequest(
                paramsRequestGet,
                urlRequest,
                ServiceResponseResult.class,
                tokenAcces);

        logger.info("### RESULT consultaComentariosNoticiasSF(): " + gson.toJson(response));
        return response;
    }

    @Override
    public ServiceResponseResult agregarComentariosNoticiaSF(String params) {
        JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
        LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
        String tokenAcces = principalDetail.getAccess_token();
        String urlRequest = principalDetail.getDireccionAmbiente().concat(constBusqueda.getCrearNoticias());
        String nombreE = principalDetail.getUsuarioNombre().concat(" " + principalDetail.getUsuarioApellidoPaterno() + " " + principalDetail.getUsuarioApellidoMaterno());
        String text = jsonObject.get("text").getAsString();
        jsonObject.addProperty("text", principalDetail.getNumEmpleado() + " - " + nombreE + " - " + despFFM + ": " + text);
        logger.info("##### OBJECT: #####" + gson.toJson(jsonObject));
        response = restCaller.callPostBearerTokenRequest(jsonObject.toString(),urlRequest, ServiceResponseResult.class, tokenAcces);
        logger.info("##### RESULT CREACION NOTICIAS: \n" + gson.toJson(response));
        return response;
    }

    @Override
    public ServiceResponseResult consultarEquiposConfigurados(String params) {
    	logger.info("ImplBusquedaService.class [metodo = consultarEquiposConfigurados() ]\n" + params);
        JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
        LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
        String tokenAcces = principalDetail.getAccess_token();
        String urlRequest = principalDetail.getDireccionAmbiente().concat(constBusqueda.getConsultarEquiposConfigurados());
        logger.info("url--- " + urlRequest);
        Map<String, String> paramsRequest = new HashMap<String, String>();
        paramsRequest.put("folioOs", jsonObject.get("folioOs").getAsString());
        ServiceResponseResult response = restCaller.callGetBearerTokenRequest(paramsRequest, urlRequest, ServiceResponseResult.class, tokenAcces);
        logger.info("RESULT" + gson.toJson(response));
        return response;
    }
    
    @Override
	public ServiceResponseResult consultarEquipos(String params) {
    	logger.info("ImplBusquedaService.class [metodo = consultarEquipos() ]\n" + params);
        JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
        LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
        String tokenAcces = principalDetail.getAccess_token();
        String urlRequest = principalDetail.getDireccionAmbiente().concat(constBusqueda.getConsultarEquipos());
        logger.info("url--- " + urlRequest);
        Map<String, String> paramsRequest = new HashMap<String, String>();
        paramsRequest.put("idCotSitioPlan", jsonObject.get("idCotSitioPlan").getAsString());
        ServiceResponseResult response = restCaller.callGetBearerTokenRequest(paramsRequest, urlRequest, ServiceResponseResult.class, tokenAcces);
        logger.info("RESULT" + gson.toJson(response));
        return response;
	}

	@Override
	public ServiceResponseResult consultarCotizacionesEquipos(String params) {
		logger.info("ImplBusquedaService.class [metodo = consultarCotizacionesEquipos() ]\n" + params);
        JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
        LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
        String tokenAcces = principalDetail.getAccess_token();
        String urlRequest = principalDetail.getDireccionAmbiente().concat(constBusqueda.getConsultarCotizacionesEquipo());
        logger.info("url--- " + urlRequest);
        Map<String, String> paramsRequest = new HashMap<String, String>();
        paramsRequest.put("folioOs", jsonObject.get("folioOs").getAsString());
        ServiceResponseResult response = restCaller.callGetBearerTokenRequest(paramsRequest, urlRequest, ServiceResponseResult.class, tokenAcces);
        logger.info("RESULT" + gson.toJson(response));
        return response;
	}

    @Override
    public ServiceResponseResult consultarResumenFactura(String params) {
        JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
        JsonObject login = new JsonObject();
        login.addProperty(environment.getProperty("param.textus.pI"), constantesGeneric.getTextIpUsuario());
        login.addProperty(environment.getProperty("param.textus.drowssaP"), constantesGeneric.getTextCredPad());
        login.addProperty(environment.getProperty("param.textus.resU"), constantesGeneric.getTextCredUs());

        jsonObject.add("Login", login);
        logger.info("### json object params ## \n" + jsonObject.toString());
        response = restCaller.callPostParamString(constBusqueda.getConsultaResumenFacturaSF(), jsonObject.toString());
        logger.info("### RESULT CONSULTA RESUMEN FECTURA: \n" + gson.toJson(response));
        return response;
    }

    @Override
    public ServiceResponseResult consultarServicios(String params) {
        JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
        JsonObject login = new JsonObject();
        login.addProperty(environment.getProperty("param.textus.pI"), constantesGeneric.getTextIpUsuario());
        login.addProperty(environment.getProperty("param.textus.drowssaP"), constantesGeneric.getTextCredPad());
        login.addProperty(environment.getProperty("param.textus.resU"), constantesGeneric.getTextCredUs());

        jsonObject.add("Login", login);
        logger.info("### json object params ## \n" + jsonObject.toString());
        response = restCaller.callPostParamString(constBusqueda.getConsultarServiciosSF(), jsonObject.toString());
        logger.info("### RESULT CONSULTA SERVICIOS: \n" + gson.toJson(response));
        return response;
    }

    @Override
    public ServiceResponseResult consultarIps(String params) {
        JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
        JsonObject login = new JsonObject();
        login.addProperty(environment.getProperty("param.textus.pI"), constantesGeneric.getTextIpUsuario());
        login.addProperty(environment.getProperty("param.textus.drowssaP"), constantesGeneric.getTextCredPad());
        login.addProperty(environment.getProperty("param.textus.resU"), constantesGeneric.getTextCredUs());

        jsonObject.add("Login", login);
        logger.info("### json object params ## \n" + jsonObject.toString());
        response = restCaller.callPostParamString(constBusqueda.getConsultarIpsSF(), jsonObject.toString());
        logger.info("### RESULT CONSULTA IPS SF: \n" + gson.toJson(response));
        return response;
    }

	@Override
	public ServiceResponseResult configurarServicios(String params) {
		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
        String tokenAcces = principalDetail.getAccess_token();
        logger.info(principalDetail.toString());
        String urlRequest = principalDetail.getDireccionAmbiente().concat(constBusqueda.getConfigurarServicios());
        Map<String, String> paramUri = new HashMap<String, String>();
        logger.info("### json object params ## \n" + jsonObject.toString());
        ServiceResponseResult response = restCaller.callPatchBearerTokenRequestURL(paramUri, gson.toJson(jsonObject), urlRequest, ServiceResponseResult.class, tokenAcces);
        logger.info("RESULT" + gson.toJson(response));
        return response;
	}

	@Override
	public ServiceResponseResult configurarDns(String params) {
		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
        String tokenAcces = principalDetail.getAccess_token();
        String urlRequest = principalDetail.getDireccionAmbiente().concat(constBusqueda.getConfigurarDns());
        Map<String, String> paramUri = new HashMap<String, String>();
        logger.info("### json object params ## \n" + jsonObject.toString());
        ServiceResponseResult response = restCaller.callPatchBearerTokenRequestURL(paramUri, gson.toJson(jsonObject), urlRequest, ServiceResponseResult.class, tokenAcces);
        logger.info("RESULT" + gson.toJson(response));
        return response;
	}

	@Override
	public ServiceResponseResult activarServicios(String params) {
		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
        LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
        jsonObject.addProperty("idUsuario", principalDetail.getIdUsuario());
        String tokenAcces = principalDetail.getAccess_token();
        String urlRequest = principalDetail.getDireccionAmbiente().concat(constBusqueda.getActivarServicios());
        logger.info("ImplBusquedaService.class activarServicios(): \n" + gson.toJson(jsonObject));
        logger.info("###URL consultarDetalleObjectSF(): "+ urlRequest);
        ServiceResponseResult response = restCaller.callPostBearerTokenRequest(gson.toJson(jsonObject), urlRequest, ServiceResponseResult.class, tokenAcces);
        logger.info("####RESULT: " + gson.toJson(response));
        return response;
	}

	@Override
	public ServiceResponseResult consultarEstatusActivacion(String params) {
		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
        LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
        String tokenAcces = principalDetail.getAccess_token();
        String urlRequest = principalDetail.getDireccionAmbiente().concat(constBusqueda.getConsultarEstatusActivacion());
        logger.info("### URL busquedaGeneralSF(): \n" + urlRequest);
        Map<String, String> paramsRequestGet = new HashMap<>();
        paramsRequestGet.put("idCsp", jsonObject.get("idCsp").getAsString());
        paramsRequestGet.put("idOt", jsonObject.get("idOt").getAsString());
        ServiceResponseResult response = restCaller.callGetBearerTokenRequest(paramsRequestGet, urlRequest, ServiceResponseResult.class, tokenAcces);

        logger.info("### RESULT busquedaGeneralSF(): " + gson.toJson(response));
        return response;
	}

    @Override
    public ServiceResponseResult agregarSubComentarioNoticiaSF(String params) {
        JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
        LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
        String tokenAcces = principalDetail.getAccess_token();
        String urlRequest = principalDetail.getDireccionAmbiente().concat(constBusqueda.getCrearSubComentariosNoticias());
        String nombreE = principalDetail.getUsuarioNombre().concat(" " + principalDetail.getUsuarioApellidoPaterno() + " " + principalDetail.getUsuarioApellidoMaterno());
        String text = jsonObject.get("text").getAsString();
        jsonObject.addProperty("text", principalDetail.getNumEmpleado() + " - " + nombreE + " - " + despFFM + ": " + text);
        logger.info("##### OBJECT: #####" + gson.toJson(jsonObject));
        response = restCaller.callPostBearerTokenRequest(jsonObject.toString(),urlRequest, ServiceResponseResult.class, tokenAcces);
        logger.info("##### RESULT CREACION NOTICIAS: \n" + gson.toJson(response));
        return response;
    }

    @Override
    public ServiceResponseResult eliminarComentarioNoticias(String params) {
        JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
        LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
        String tokenAcces = principalDetail.getAccess_token();
        String urlRequest = principalDetail.getDireccionAmbiente().concat(constBusqueda.getEliminarComentarioNoticiasSF());
        
        Map<String, String> paramsRequest = new HashMap<>();
        paramsRequest.put("idNew", jsonObject.get("newId").getAsString());
        paramsRequest.put("objectType", jsonObject.get("objectType").getAsString());

        logger.info("##### OBJECT: #####" + gson.toJson(paramsRequest));

        response = restCaller.callDeleteBearerTokenRequest(paramsRequest,urlRequest, ServiceResponseResult.class, tokenAcces);
        logger.info("##### RESULT ELIMINAR NOTICIAS: \n" + gson.toJson(response));
        return response;
    }

    @Override
    public ServiceResponseResult eliminarSubComentarioNoticias(String params) {
        JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
        LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
        String tokenAcces = principalDetail.getAccess_token();
        String urlRequest = principalDetail.getDireccionAmbiente().concat(constBusqueda.getEliminarSubComentarioNoticiasSF());
        
        Map<String, String> paramsRequest = new HashMap<>();
        paramsRequest.put("idNew", jsonObject.get("subNewId").getAsString());
        paramsRequest.put("objectType", jsonObject.get("objectType").getAsString());

        logger.info("##### OBJECT: #####" + gson.toJson(paramsRequest));
        
        response = restCaller.callDeleteBearerTokenRequest(paramsRequest,urlRequest, ServiceResponseResult.class, tokenAcces);
        logger.info("##### RESULT ELIMINAR NOTICIAS: \n" + gson.toJson(response));
        return response;
    }

}
