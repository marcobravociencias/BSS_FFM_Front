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
import com.mx.totalplay.ffm.cloudweb.plantainterna.service.GestionTecnicosService;
import com.mx.totalplay.ffm.cloudweb.plantainterna.utils.ConstGestionTecnicos;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.LoginResult;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.ConstantesGeneric;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.ConsumeRest;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.UtileriaGeneral;

@Service
public class ImplGestionTecnicosService implements GestionTecnicosService {

	private final Logger logger = LogManager.getLogger(ImplGestionTecnicosService.class.getName());
	private final ConsumeRest restCaller;
	private ServiceResponseResult response;
	private final Environment environment;
	private final UtileriaGeneral utilerias;
	private Gson gson = new Gson();
	private final ConstantesGeneric constantesGeneric;
	private final ConstGestionTecnicos constGestionTecnicos;

	@Autowired
	public ImplGestionTecnicosService(ConsumeRest restCaller, Environment environment, UtileriaGeneral utilerias,
			ConstantesGeneric constantesGeneric, ConstGestionTecnicos constGestionTecnicos) {
		this.restCaller = restCaller;
		this.environment = environment;
		this.utilerias = utilerias;
		this.constantesGeneric = constantesGeneric;
		this.constGestionTecnicos = constGestionTecnicos;
	}
	
	@Override
	public ServiceResponseResult consultaTecnicosGestionTecnicos(String params) {
		logger.info("ImplGestionTecnicosService.class [metodo = consultaTecnicosGestionTecnicos()]\n");
		LoginResult principalDetail=utilerias.obtenerObjetoPrincipal();
		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		String tokenAcces=principalDetail.getAccess_token();
		logger.info("json object params## "+jsonObject.toString());
		String url = principalDetail.getDireccionAmbiente().concat(constGestionTecnicos.getConsultaTecnicosGestionTecnicos());
		ServiceResponseResult response= restCaller.callPostBearerTokenRequest(jsonObject.toString(),url,ServiceResponseResult.class,tokenAcces);
		logger.info("RESULT busqueda"+gson.toJson(response));
		return response;
	}
	
	@Override
	public ServiceResponseResult consultaAuxiliaresGestionTecnicos(String params) {
		logger.info("ImplGestionTecnicosService.class [metodo = consultaAuxiliaresGestionTecnicos()]\n");
		LoginResult principalDetail=utilerias.obtenerObjetoPrincipal();
		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		String tokenAcces=principalDetail.getAccess_token();
		logger.info("json object params## "+jsonObject.toString());
		String url = principalDetail.getDireccionAmbiente().concat(constGestionTecnicos.getConsultaAuxiliaresGestionTecnicos());
		ServiceResponseResult response= restCaller.callPostBearerTokenRequest(jsonObject.toString(),url,ServiceResponseResult.class,tokenAcces);
		logger.info("RESULT busqueda "+gson.toJson(response));
		return response;
	}
	
	@Override
	public ServiceResponseResult consultaTecnicosPorDespacho(String params) {
		logger.info("ImplGestionTecnicosService.class [metodo = consultaTecnicosPorDespacho() ]\n");
		LoginResult principalDetail=utilerias.obtenerObjetoPrincipal();
		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		Map<String, String> paramsRequestGet = new HashMap<String, String>();
		paramsRequestGet.put("idDespacho", jsonObject.get("idDespacho").getAsString());
		logger.info("json object params## "+ params);
		String tokenAcces=principalDetail.getAccess_token(); 
		String url = principalDetail.getDireccionAmbiente().concat(constGestionTecnicos.getConsultaTecnicosPorDespacho());
		ServiceResponseResult response= restCaller.callGetBearerTokenRequest(paramsRequestGet, url, ServiceResponseResult.class, tokenAcces);
		logger.info("RESULT busqueda "+gson.toJson(response));
		return response;
	}
	
	@Override
    public ServiceResponseResult consultaOrdenesTecnicoPorFecha(String params) {
        logger.info("ImplGestionTecnicosService.class [metodo = consultaOrdenesTecnicoPorFecha() ]\n" + params);
        JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
        String idTecnico = jsonObject.get("idTecnico").getAsString();
        String fechaInicio = jsonObject.get("fechaInicio").getAsString();
        String fechaFin = jsonObject.get("fechaFin").getAsString();
        LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
        logger.info("json object params## " + jsonObject.toString());
        String tokenAcces = principalDetail.getAccess_token();
        String url = principalDetail.getDireccionAmbiente().concat(constGestionTecnicos.getConsultaOrdenesTecnicoPorFecha());
        logger.info("URL ##+" + url);
        Map<String, String> paramsRequestGet = new HashMap<String, String>();
        paramsRequestGet.put("idTecnico", idTecnico);
        paramsRequestGet.put("fechaInicio", fechaInicio);
        paramsRequestGet.put("fechaFin", fechaFin);
        ServiceResponseResult response = restCaller.callGetBearerTokenRequest(paramsRequestGet, url, ServiceResponseResult.class, tokenAcces);
        logger.info("RESULT busqueda "+gson.toJson(response));
        return response;
    }
	
	@Override
    public ServiceResponseResult consultaOrdenesAuxiliarPorFecha(String params) {
        logger.info("ImplGestionTecnicosService.class [metodo = consultaOrdenesAuxiliarPorFecha() ]\n" + params);
        JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
        String idAuxiliar = jsonObject.get("idAuxiliar").getAsString();
        String fechaInicio = jsonObject.get("fechaInicio").getAsString();
        String fechaFin = jsonObject.get("fechaFin").getAsString();
        LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
        logger.info("json object params## " + jsonObject.toString());
        String tokenAcces = principalDetail.getAccess_token();
        String url = principalDetail.getDireccionAmbiente().concat(constGestionTecnicos.getConsultaOrdenesAuxiliarPorFecha());
        logger.info("URL ##+" + url);
        Map<String, String> paramsRequestGet = new HashMap<String, String>();
        paramsRequestGet.put("idAuxiliar", idAuxiliar);
        paramsRequestGet.put("fechaInicio", fechaInicio);
        paramsRequestGet.put("fechaFin", fechaFin);
        ServiceResponseResult response = restCaller.callGetBearerTokenRequest(paramsRequestGet, url, ServiceResponseResult.class, tokenAcces);
        logger.info("RESULT busqueda "+gson.toJson(response));
        return response;
    }
	
	@Override
	public ServiceResponseResult consultaDisponibilidadTecnico(String params) {
		logger.info("ImplGestionTecnicosService.class [metodo = consultaDisponibilidadTecnico() ]\n");
		LoginResult principalDetail=utilerias.obtenerObjetoPrincipal();
		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		Map<String, String> paramsRequestGet = new HashMap<String, String>();
		paramsRequestGet.put("idTecnico", jsonObject.get("idTecnico").getAsString());
		paramsRequestGet.put("fechaInicio", jsonObject.get("fechaInicio").getAsString());
		paramsRequestGet.put("fechaFin", jsonObject.get("fechaFin").getAsString());
		logger.info("json object params## "+ params);
		String tokenAcces=principalDetail.getAccess_token(); 
		String url = principalDetail.getDireccionAmbiente().concat(constGestionTecnicos.getConsultaDisponibilidadTecnico());
		ServiceResponseResult response= restCaller.callGetBearerTokenRequest(paramsRequestGet, url, ServiceResponseResult.class, tokenAcces);
		logger.info("RESULT busqueda "+gson.toJson(response));
		return response;
	}
	
	@Override
    public ServiceResponseResult consultaDiasTrabajadosTecnicoPorFecha(String params) {
        logger.info("ImplGestionTecnicosService.class [metodo = consultaDiasTrabajadosTecnicoPorFecha() ]\n" + params);
        JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
        String idTecnico = jsonObject.get("idTecnico").getAsString();
        String fechaInicio = jsonObject.get("fechaInicio").getAsString();
        String fechaFin = jsonObject.get("fechaFin").getAsString();
        LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
        logger.info("json object params## " + jsonObject.toString());
        String tokenAcces = principalDetail.getAccess_token();
        String url = principalDetail.getDireccionAmbiente().concat(constGestionTecnicos.getConsultaDiasTrabajadosTecnicoPorFecha());
        logger.info("URL ##+" + url);
        Map<String, String> paramsRequestGet = new HashMap<String, String>();
        paramsRequestGet.put("idTecnico", idTecnico);
        paramsRequestGet.put("fechaInicio", fechaInicio);
        paramsRequestGet.put("fechaFin", fechaFin);
        ServiceResponseResult response = restCaller.callGetBearerTokenRequest(paramsRequestGet, url, ServiceResponseResult.class, tokenAcces);
        logger.info("RESULT busqueda "+gson.toJson(response));
        return response;
    }
	
	@Override
    public ServiceResponseResult consultaDiasTrabajadosAuxiliarPorFecha(String params) {
        logger.info("ImplGestionTecnicosService.class [metodo = consultaDiasTrabajadosAuxiliarPorFecha() ]\n" + params);
        JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
        String idAuxiliar = jsonObject.get("idAuxiliar").getAsString();
        String fechaInicio = jsonObject.get("fechaInicio").getAsString();
        String fechaFin = jsonObject.get("fechaFin").getAsString();
        LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
        logger.info("json object params## " + jsonObject.toString());
        String tokenAcces = principalDetail.getAccess_token();
        String url = principalDetail.getDireccionAmbiente().concat(constGestionTecnicos.getConsultaDiasTrabajadosAuxiliarPorFecha());
        logger.info("URL ##+" + url);
        Map<String, String> paramsRequestGet = new HashMap<String, String>();
        paramsRequestGet.put("idAuxiliar", idAuxiliar);
        paramsRequestGet.put("fechaInicio", fechaInicio);
        paramsRequestGet.put("fechaFin", fechaFin);
        ServiceResponseResult response = restCaller.callGetBearerTokenRequest(paramsRequestGet, url, ServiceResponseResult.class, tokenAcces);
        logger.info("RESULT busqueda "+gson.toJson(response));
        return response;
    }
	
	@Override
	public ServiceResponseResult consultaJustificacionesTecnico(String params) {
		logger.info("ImplGestionTecnicosService.class [metodo = consultaJustificacionesTecnico() ]\n");
		LoginResult principalDetail=utilerias.obtenerObjetoPrincipal();
		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		Map<String, String> paramsRequestGet = new HashMap<String, String>();
		paramsRequestGet.put("idUsuario", jsonObject.get("idUsuario").getAsString());
		paramsRequestGet.put("fechaInicio", jsonObject.get("fechaInicio").getAsString());
		paramsRequestGet.put("fechaFin", jsonObject.get("fechaFin").getAsString());
		logger.info("json object params## "+ params);
		String tokenAcces=principalDetail.getAccess_token(); 
		String url = principalDetail.getDireccionAmbiente().concat(constGestionTecnicos.getConsultaJustificacionesTecnico());
		ServiceResponseResult response= restCaller.callGetBearerTokenRequest(paramsRequestGet, url, ServiceResponseResult.class, tokenAcces);
		logger.info("RESULT busqueda "+gson.toJson(response));
		return response;
	}
	
	@Override
	public ServiceResponseResult consultaMotivosJustificaciones() {
		logger.info("ImplGestionTecnicosService.class [metodo = consultaMotivosJustificaciones() ]\n");
		LoginResult principalDetail=utilerias.obtenerObjetoPrincipal();
		Map<String, String> paramsRequestGet = new HashMap<String, String>();
		String tokenAcces=principalDetail.getAccess_token(); 
		String url = principalDetail.getDireccionAmbiente().concat(constGestionTecnicos.getConsultaMotivosJustificaciones());
		ServiceResponseResult response= restCaller.callGetBearerTokenRequest(paramsRequestGet, url, ServiceResponseResult.class, tokenAcces);
		logger.info("RESULT busqueda motivos justificaciones "+gson.toJson(response));
		return response;
	}
	
	@Override
	public ServiceResponseResult guardarJustificacionTecnico(String params) {
		logger.info("ImplGestionTecnicosService.class [metodo = guardarJustificacionTecnico()]\n");
		LoginResult principalDetail=utilerias.obtenerObjetoPrincipal();
		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		jsonObject.addProperty("idOrigen",principalDetail.getIdOrigen());
		String tokenAcces=principalDetail.getAccess_token();
		logger.info("json object params## "+jsonObject.toString());
		String url = principalDetail.getDireccionAmbiente().concat(constGestionTecnicos.getGuardarJustificacionTecnico());
		ServiceResponseResult response= restCaller.callPostBearerTokenRequest(jsonObject.toString(),url,ServiceResponseResult.class,tokenAcces);
		logger.info("RESULT REGISTRO JUSTIFICACION TEC " + gson.toJson(response));
		return response;
	}
	
	@Override
	public ServiceResponseResult eliminarJustificacionTecnico(String params) {
		logger.info("ImplGestionTecnicosService.class [metodo = eliminarJustificacionTecnico() ]\n");
		LoginResult principalDetail=utilerias.obtenerObjetoPrincipal();
		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		Map<String, String> paramsRequestGet = new HashMap<String, String>();
		paramsRequestGet.put("idJustificacion", jsonObject.get("idJustificacion").getAsString());
		logger.info("json object params## "+ params);
		String tokenAcces=principalDetail.getAccess_token(); 
		String url = principalDetail.getDireccionAmbiente().concat(constGestionTecnicos.getEliminarJustificacionTecnico());
		ServiceResponseResult response= restCaller.callDeleteBearerTokenRequest(paramsRequestGet, url, ServiceResponseResult.class, tokenAcces);
		logger.info("RESULT ELIMINACION "+gson.toJson(response));
		return response;
	}
	
	@Override
	public ServiceResponseResult modificarJustificacionTecnico(String params) {
		logger.info("ImplGestionTecnicosService.class [metodo = modificarJustificacionTecnico()]\n");
		LoginResult principalDetail=utilerias.obtenerObjetoPrincipal();
		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		jsonObject.addProperty("idOrigen",principalDetail.getIdOrigen());
		String tokenAcces=principalDetail.getAccess_token();
		logger.info("json object params## "+jsonObject.toString());
		String url = principalDetail.getDireccionAmbiente().concat(constGestionTecnicos.getModificarJustificacionTecnico());
		ServiceResponseResult response= restCaller.callPatchBearerTokenRequest(jsonObject.toString(),url,ServiceResponseResult.class,tokenAcces);
		logger.info("RESULT MODIFICACION JUSTIFICACION TEC " + gson.toJson(response));
		return response;
	}
	
	@Override
	public ServiceResponseResult consultarComentariosJustificacion(String params) {
		logger.info("ImplGestionTecnicosService.class [metodo = consultarComentariosJustificacion() ]\n");
		LoginResult principalDetail=utilerias.obtenerObjetoPrincipal();
		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		Map<String, String> paramsRequestGet = new HashMap<String, String>();
		paramsRequestGet.put("idJustificacion", jsonObject.get("idJustificacion").getAsString());
		logger.info("json object params## "+ params);
		String tokenAcces=principalDetail.getAccess_token(); 
		String url = principalDetail.getDireccionAmbiente().concat(constGestionTecnicos.getConsultarComentariosJustificacion());
		ServiceResponseResult response= restCaller.callGetBearerTokenRequest(paramsRequestGet, url, ServiceResponseResult.class, tokenAcces);
		logger.info("RESULT busqueda " + gson.toJson(response));
		return response;
	}
	
	@Override
	public ServiceResponseResult agregarComentarioJustificacion(String params) {
		logger.info("ImplGestionTecnicosService.class [metodo = agregarComentarioJustificacion()]\n");
		LoginResult principalDetail=utilerias.obtenerObjetoPrincipal();
		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		jsonObject.addProperty("idOrigen",principalDetail.getIdOrigen());
		String tokenAcces=principalDetail.getAccess_token();
		logger.info("json object params## "+jsonObject.toString());
		String url = principalDetail.getDireccionAmbiente().concat(constGestionTecnicos.getAgregarComentarioJustificacion());
		ServiceResponseResult response= restCaller.callPostBearerTokenRequest(jsonObject.toString(),url,ServiceResponseResult.class,tokenAcces);
		logger.info("RESULT REGISTRO NUEVO COMENTARIO JUSTIFICACION " + gson.toJson(response));
		return response;
	}

}
