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

//	@Override
//	public ServiceResponseResult consultaMotivosGestionTecnicos() {
//		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
//		String tokenAccess = principalDetail.getAccess_token();
//		logger.info("consultarMotivosGestionTecnicos ## " + tokenAccess);
//		String urlRequest = principalDetail.getDireccionAmbiente().concat(constGestionTecnicos.getConsultaMotivosGestionTecnicos());
//		logger.info("### URL consultarMotivosGestionTecnicos():" + urlRequest);
//		
//		Map<String, String> paramsRequestGet = new HashMap<String, String>();
//		ServiceResponseResult response = restCaller.callGetBearerTokenRequest(
//				paramsRequestGet, 
//				urlRequest,
//				ServiceResponseResult.class, 
//				tokenAccess);
//		logger.info("### RESULT consultarMotivosGestionTecnicos(): " + gson.toJson(response));
//		return response;
//	}
//
//	@Override
//	public ServiceResponseResult consultaTecnicosGestionTecnicos(String params) {
//		logger.info("ImplSoporteGestionTecnicos.class [metodo = consultaTecnicosGestionTecnicos() ] \n"+ gson.toJson(params));
//		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
//		String tokenAccess = principalDetail.getAccess_token();
//		logger.info("consultaTecnicosGestionTecnicos ## " + tokenAccess);
//		String urlRequest = principalDetail.getDireccionAmbiente().concat(constGestionTecnicos.getConsultaMotivosGestionTecnicos());
//		logger.info("### URL consultaTecnicosGestionTecnicos():" + urlRequest);
//		
//		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
//		Map<String, String> paramsRequest = new HashMap<String, String>();
//		ServiceResponseResult response = restCaller.callGetBearerTokenRequest(
//				paramsRequest, 
//				urlRequest,
//				ServiceResponseResult.class, 
//				tokenAccess);
//		logger.info("### RESULT consultaTecnicosGestionTecnicos(): " + gson.toJson(response));
//		return response;
//	}
//
//	@Override
//	public ServiceResponseResult consultaDisponibilidadTecGestionTecnicos(String params) {
//		logger.info("ImplSoporteGestionTecnicos.class [metodo = consultaDisponibilidadTecGestionTecnicos() ] \n"+ gson.toJson(params));
//		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
//		String tokenAccess = principalDetail.getAccess_token();
//		logger.info("consultaDisponibilidadTecGestionTecnicos ## " + tokenAccess);
//		String urlRequest = principalDetail.getDireccionAmbiente().concat(constGestionTecnicos.getConsultaMotivosGestionTecnicos());
//		logger.info("### URL consultaDisponibilidadTecGestionTecnicos():" + urlRequest);
//		
//		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
//		Map<String, String> paramsRequest = new HashMap<String, String>();
//		ServiceResponseResult response = restCaller.callGetBearerTokenRequest(
//				paramsRequest, 
//				urlRequest,
//				ServiceResponseResult.class, 
//				tokenAccess);
//		logger.info("### RESULT consultaDisponibilidadTecGestionTecnicos(): " + gson.toJson(response));
//		return response;
//	}
//
//	@Override
//	public ServiceResponseResult consultaDisponibilidadAuxGestionTecnicos(String params) {
//		logger.info("ImplSoporteGestionTecnicos.class [metodo = consultaDisponibilidadAuxGestionTecnicos() ] \n"+ gson.toJson(params));
//		
//		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
//		String tokenAccess = principalDetail.getAccess_token();
//		logger.info("consultaDisponibilidadAuxGestionTecnicos ## " + tokenAccess);
//		String urlRequest = principalDetail.getDireccionAmbiente().concat(constGestionTecnicos.getConsultaMotivosGestionTecnicos());
//		logger.info("### URL consultaDisponibilidadAuxGestionTecnicos():" + urlRequest);
//		
//		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
//		Map<String, String> paramsRequest = new HashMap<String, String>();
//		ServiceResponseResult response = restCaller.callGetBearerTokenRequest(
//				paramsRequest, 
//				urlRequest,
//				ServiceResponseResult.class, 
//				tokenAccess);
//		logger.info("### RESULT consultaDisponibilidadAuxGestionTecnicos(): " + gson.toJson(response));
//		return response;
//	}
//
//	@Override
//	public ServiceResponseResult consultaDetalleJustificacionGestionTec(String params) {
//		logger.info("ImplSoporteGestionTecnicos.class [metodo = consultaDetalleJustificacionGestionTec() ] \n"+ gson.toJson(params));
//		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
//		String tokenAccess = principalDetail.getAccess_token();
//		logger.info("consultaDetalleJustificacionGestionTec ## " + tokenAccess);
//		String urlRequest = principalDetail.getDireccionAmbiente().concat(constGestionTecnicos.getConsultaMotivosGestionTecnicos());
//		logger.info("### URL consultaDetalleJustificacionGestionTec():" + urlRequest);
//		
//		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
//		Map<String, String> paramsRequest = new HashMap<String, String>();
//		ServiceResponseResult response = restCaller.callGetBearerTokenRequest(
//				paramsRequest, 
//				urlRequest,
//				ServiceResponseResult.class, 
//				tokenAccess);
//		logger.info("### RESULT consultaDetalleJustificacionGestionTec(): " + gson.toJson(response));
//		return response;
//	}
//
//	@Override
//	public ServiceResponseResult consultaDetalleMesGestionTec(String params) {
//		logger.info("ImplSoporteGestionTecnicos.class [metodo = consultaDetalleMesGestionTec() ] \n"+ gson.toJson(params));
//		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
//		String tokenAccess = principalDetail.getAccess_token();
//		logger.info("consultaDetalleMesGestionTec ## " + tokenAccess);
//		String urlRequest = principalDetail.getDireccionAmbiente().concat(constGestionTecnicos.getConsultaMotivosGestionTecnicos());
//		logger.info("### URL consultaDetalleMesGestionTec():" + urlRequest);
//		
//		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
//		Map<String, String> paramsRequest = new HashMap<String, String>();
//		ServiceResponseResult response = restCaller.callGetBearerTokenRequest(
//				paramsRequest, 
//				urlRequest,
//				ServiceResponseResult.class, 
//				tokenAccess);
//		logger.info("### RESULT consultaDetalleMesGestionTec(): " + gson.toJson(response));
//		return response;
//	}
//
//	@Override
//	public ServiceResponseResult consultaComentariosJustificacionGestionTec(String params) {
//		logger.info("ImplSoporteGestionTecnicos.class [metodo = consultaComentariosJustificacionGestionTec() ] \n"+ gson.toJson(params));
//		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
//		String tokenAccess = principalDetail.getAccess_token();
//		logger.info("consultaComentariosJustificacionGestionTec ## " + tokenAccess);
//		String urlRequest = principalDetail.getDireccionAmbiente().concat(constGestionTecnicos.getConsultaMotivosGestionTecnicos());
//		logger.info("### URL consultaComentariosJustificacionGestionTec():" + urlRequest);
//		
//		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
//		Map<String, String> paramsRequest = new HashMap<String, String>();
//		ServiceResponseResult response = restCaller.callGetBearerTokenRequest(
//				paramsRequest, 
//				urlRequest,
//				ServiceResponseResult.class, 
//				tokenAccess);
//		logger.info("### RESULT consultaComentariosJustificacionGestionTec(): " + gson.toJson(response));
//		return response;
//	}
//
//	@Override
//	public ServiceResponseResult consultaArchivosJustificacionGestionTec(String params) {
//		logger.info("ImplSoporteGestionTecnicos.class [metodo = consultaArchivosJustificacionGestionTec() ] \n"+ gson.toJson(params));
//		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
//		String tokenAccess = principalDetail.getAccess_token();
//		logger.info("consultaArchivosJustificacionGestionTec ## " + tokenAccess);
//		String urlRequest = principalDetail.getDireccionAmbiente().concat(constGestionTecnicos.getConsultaMotivosGestionTecnicos());
//		logger.info("### URL consultaArchivosJustificacionGestionTec():" + urlRequest);
//		
//		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
//		Map<String, String> paramsRequest = new HashMap<String, String>();
//		ServiceResponseResult response = restCaller.callGetBearerTokenRequest(
//				paramsRequest, 
//				urlRequest,
//				ServiceResponseResult.class, 
//				tokenAccess);
//		logger.info("### RESULT consultaArchivosJustificacionGestionTec(): " + gson.toJson(response));
//		return response;
//	}
//
//	@Override
//	public ServiceResponseResult agregarJustificacionGestionTec(String params) {
//		logger.info("ImplSoporteGestionTecnicos.class [metodo = agregarJustificacionGestionTec() ] \n"+ gson.toJson(params));
//		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
//		String tokenAccess = principalDetail.getAccess_token();
//		logger.info("agregarJustificacionGestionTec ## " + tokenAccess);
//		String urlRequest = principalDetail.getDireccionAmbiente().concat(constGestionTecnicos.getConsultaMotivosGestionTecnicos());
//		logger.info("### URL agregarJustificacionGestionTec():" + urlRequest);
//		
//		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
//		Map<String, String> paramsRequest = new HashMap<String, String>();
//		ServiceResponseResult response = restCaller.callGetBearerTokenRequest(
//				paramsRequest, 
//				urlRequest,
//				ServiceResponseResult.class, 
//				tokenAccess);
//		logger.info("### RESULT agregarJustificacionGestionTec(): " + gson.toJson(response));
//		return response;
//	}
//
//	@Override
//	public ServiceResponseResult editarJustificacionGestionTec(String params) {
//		logger.info("ImplSoporteGestionTecnicos.class [metodo = editarJustificacionGestionTec() ] \n"+ gson.toJson(params));
//		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
//		String tokenAccess = principalDetail.getAccess_token();
//		logger.info("editarJustificacionGestionTec ## " + tokenAccess);
//		String urlRequest = principalDetail.getDireccionAmbiente().concat(constGestionTecnicos.getConsultaMotivosGestionTecnicos());
//		logger.info("### URL editarJustificacionGestionTec():" + urlRequest);
//		
//		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
//		Map<String, String> paramsRequest = new HashMap<String, String>();
//		ServiceResponseResult response = restCaller.callGetBearerTokenRequest(
//				paramsRequest, 
//				urlRequest,
//				ServiceResponseResult.class, 
//				tokenAccess);
//		logger.info("### RESULT editarJustificacionGestionTec(): " + gson.toJson(response));
//		return response;
//	}
//
//	@Override
//	public ServiceResponseResult eliminarJustificacionGestionTec(String params) {
//		logger.info("ImplSoporteGestionTecnicos.class [metodo = eliminarJustificacionGestionTec() ] \n"+ gson.toJson(params));
//		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
//		String tokenAccess = principalDetail.getAccess_token();
//		logger.info("eliminarJustificacionGestionTec ## " + tokenAccess);
//		String urlRequest = principalDetail.getDireccionAmbiente().concat(constGestionTecnicos.getConsultaMotivosGestionTecnicos());
//		logger.info("### URL eliminarJustificacionGestionTec():" + urlRequest);
//		
//		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
//		Map<String, String> paramsRequest = new HashMap<String, String>();
//		ServiceResponseResult response = restCaller.callGetBearerTokenRequest(
//				paramsRequest, 
//				urlRequest,
//				ServiceResponseResult.class, 
//				tokenAccess);
//		logger.info("### RESULT eliminarJustificacionGestionTec(): " + gson.toJson(response));
//		return response;
//	}
//
//	@Override
//	public ServiceResponseResult agregarArchivoJustificacionGestionTec(String params) {
//		logger.info("ImplSoporteGestionTecnicos.class [metodo = agregarArchivoJustificacionGestionTec() ] \n"+ gson.toJson(params));
//		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
//		String tokenAccess = principalDetail.getAccess_token();
//		logger.info("agregarArchivoJustificacionGestionTec ## " + tokenAccess);
//		String urlRequest = principalDetail.getDireccionAmbiente().concat(constGestionTecnicos.getConsultaMotivosGestionTecnicos());
//		logger.info("### URL agregarArchivoJustificacionGestionTec():" + urlRequest);
//		
//		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
//		Map<String, String> paramsRequest = new HashMap<String, String>();
//		ServiceResponseResult response = restCaller.callGetBearerTokenRequest(
//				paramsRequest, 
//				urlRequest,
//				ServiceResponseResult.class, 
//				tokenAccess);
//		logger.info("### RESULT agregarArchivoJustificacionGestionTec(): " + gson.toJson(response));
//		return response;
//	}
//
//	@Override
//	public ServiceResponseResult eliminarArchivoJustificacionGestionTec(String params) {
//		logger.info("ImplSoporteGestionTecnicos.class [metodo = eliminarArchivoJustificacionGestionTec() ] \n"+ gson.toJson(params));
//		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
//		String tokenAccess = principalDetail.getAccess_token();
//		logger.info("eliminarArchivoJustificacionGestionTec ## " + tokenAccess);
//		String urlRequest = principalDetail.getDireccionAmbiente().concat(constGestionTecnicos.getConsultaMotivosGestionTecnicos());
//		logger.info("### URL eliminarArchivoJustificacionGestionTec():" + urlRequest);
//		
//		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
//		Map<String, String> paramsRequest = new HashMap<String, String>();
//		ServiceResponseResult response = restCaller.callGetBearerTokenRequest(
//				paramsRequest, 
//				urlRequest,
//				ServiceResponseResult.class, 
//				tokenAccess);
//		logger.info("### RESULT eliminarArchivoJustificacionGestionTec(): " + gson.toJson(response));
//		return response;
//	}
}
