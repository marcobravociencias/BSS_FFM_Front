package com.mx.totalplay.ffm.cloudweb.utilerias.service.impl;

import java.util.*;
import java.util.stream.Collectors;

import com.mx.totalplay.ffm.cloudweb.utilerias.model.Accion;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.DataTableResponse;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.jasypt.util.text.AES256TextEncryptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.mx.totalplay.ffm.cloudweb.plantainterna.model.consultaOTPI.ParamConsultaOTPI;
import com.mx.totalplay.ffm.cloudweb.plantainterna.utils.ConstDespachoPI;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.LoginResult;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;
import com.mx.totalplay.ffm.cloudweb.utilerias.service.GenericAccionesService;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.ConstantesGeneric;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.ConsumeRest;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.UtileriaGeneral;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Service
public class ImplGenericAccionesService implements GenericAccionesService {
	private final Logger logger = LogManager.getLogger(ImplGenericAccionesService.class.getName());
	private Gson gson = new Gson();
	private final HttpSession session;
	private final Environment env;

	private final ConsumeRest restCaller;
	private final UtileriaGeneral utilerias;
	private final ConstantesGeneric constantesAmbiente;

	@Autowired
	public ImplGenericAccionesService(ConstantesGeneric constantesAmbiente, ConstDespachoPI constDespachoPI,
			ConsumeRest restCaller, UtileriaGeneral utilerias, Environment env, HttpSession session) {
		this.constantesAmbiente = constantesAmbiente;
		this.restCaller = restCaller;
		this.utilerias = utilerias;
		this.session = session;
		this.env = env;
	}

	public ServiceResponseResult creacionOrdenTrabajoGeneric(String params) {
		logger.info("ImplDespachoPIService.class [metodo = creacionOrdenTrabajoGeneric() ]\n" + params);

		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);

		jsonObject.addProperty("idunidadNegocio", principalDetail.getIdUnidadNegocio());
		jsonObject.addProperty("idPropietario", principalDetail.getIdPropietario());

		String tokenAcces = principalDetail.getAccess_token();

		logger.info("json object params## " + jsonObject.toString());

		String urlRequest = principalDetail.getDireccionAmbiente()
				.concat(constantesAmbiente.getGuardarOrdenesUniversales());

		ServiceResponseResult response = restCaller.callPostBearerTokenRequest(jsonObject.toString(), urlRequest,
				ServiceResponseResult.class, tokenAcces);

		return response;
	}

	@Override
	public ServiceResponseResult agregarMensajeAccionSession(String params) {
		ServiceResponseResult response = ServiceResponseResult.builder().isRespuesta(true).result(null).build();
		JsonObject object = gson.fromJson(params, JsonObject.class);
		List<Accion> accionesList;
		if (session.getAttribute("MODULO_MENSAJES_ACCIONES_RECIENTES") != null)
			accionesList = (List<Accion>) session.getAttribute("MODULO_MENSAJES_ACCIONES_RECIENTES");
		else
			accionesList = new ArrayList<>();

		Accion accion = Accion.builder().identificadorModulo(object.get("identificadorModulo").getAsString())
				.mensaje(object.get("mensaje").getAsString()).tipoMensaje(object.get("tipoMensaje").getAsString())
				.hora(object.get("hora").getAsString()).fecha(object.get("fecha").getAsString()).sysdateJs(new Date())
				.build();
		logger.info("Objeto acciones:" + gson.toJson(accion));
		accionesList.add(accion);
		session.setAttribute("MODULO_MENSAJES_ACCIONES_RECIENTES", accionesList);

		return response;
	}

	@Override
	public ServiceResponseResult consultarAccionesRecientesSession(String params) {
		ServiceResponseResult response = ServiceResponseResult.builder().isRespuesta(true).result(null).build();
		JsonObject object = gson.fromJson(params, JsonObject.class);
		List<Accion> accionesList;
		if (session.getAttribute("MODULO_MENSAJES_ACCIONES_RECIENTES") != null)
			accionesList = (List<Accion>) session.getAttribute("MODULO_MENSAJES_ACCIONES_RECIENTES");
		else
			accionesList = new ArrayList<>();

		List<Accion> actionList = accionesList.stream()
				.filter(e -> object.get("identificadorModulo").equals(e.getIdentificadorModulo()))
				.collect(Collectors.toList());

		session.setAttribute("MODULO_MENSAJES_ACCIONES_RECIENTES", actionList);

		return response;
	}

	@Override
	public ServiceResponseResult getAutentificacionJerarquia(String params) {
		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		String us = jsonObject.get("usdta").getAsString();
		String crdospas = jsonObject.get("pwdta").getAsString();

		logger.info("jgetAutentificacion## " + us + " -- " + crdospas);

		ServiceResponseResult response = ServiceResponseResult.builder().isRespuesta(true).result(null).build();

		AES256TextEncryptor textEncryptor = new AES256TextEncryptor();
		textEncryptor.setPassword(env.getProperty("jwt.secret.amb"));
		crdospas = textEncryptor.decrypt(crdospas);

		String urlService = env.getProperty("dep.envirom.web").concat(":8151")
				.concat(env.getProperty("ws.url.validausrffm"));
		LoginResult responseLog = (LoginResult) restCaller.callPostReturnClassBasicAuthXwwwUrlFormed(urlService, us,
				crdospas, LoginResult.class);

		logger.info("RESULT" + gson.toJson(responseLog.getAccess_token()));
		response.setResult(responseLog.getAccess_token());
		return response;
	}

	@Override
	public ServiceResponseResult agregarMensajeAccionService(String params, HttpServletRequest request) {
		logger.info("ImplGenericAccionesService.class [metodo = agregarMensajeAccionService() ]\n" + params);
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);

		if (request.getHeader("x-forwarded-for") == null) {
			jsonObject.addProperty("ip", request.getRemoteAddr());
		}

		String tokenAcces = principalDetail.getAccess_token();
		logger.info("json object params## " + jsonObject.toString());
		String urlRequest = principalDetail.getDireccionAmbiente()
				.concat(constantesAmbiente.getRegistrarAccionesRealizadas());
		ServiceResponseResult response = restCaller.callPostBearerTokenRequest(jsonObject.toString(), urlRequest,
				ServiceResponseResult.class, tokenAcces);

		return response;
	}
	
	@Override
	public ServiceResponseResult agregarMensajeAccionServiceLogin(String params, String token) {
		logger.info("ImplGenericAccionesService.class [metodo = agregarMensajeAccionService() ]\n" + params);
		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		
		String tokenAcces = token;

		logger.info("json object params## " + jsonObject.toString());
		String urlRequest = env.getProperty("dep.envirom.web").concat(constantesAmbiente.getRegistrarAccionesRealizadas());
		ServiceResponseResult response = restCaller.callPostBearerTokenRequest(jsonObject.toString(), urlRequest,
				ServiceResponseResult.class, tokenAcces);

		return response;
	}

	@Override
	public ServiceResponseResult consultarAccionesRecientesService(String params) {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		logger.info("ImplGenericAccionesService.class [metodo = consultarAccionesRecientesService() ]\n" + params);
		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
		String tokenAcces = principalDetail.getAccess_token();
		logger.info("consultarAccionesRecientesService ##+" + tokenAcces);
		String urlRequest = principalDetail.getDireccionAmbiente()
				.concat(constantesAmbiente.getConsultarAccionesRealizadas());
		logger.info("url--- " + urlRequest);
		Map<String, String> paramsRequestGet = new HashMap<String, String>();
		paramsRequestGet.put("fechaInicio", jsonObject.get("fechaInicio").getAsString());
		paramsRequestGet.put("fechaFin", jsonObject.get("fechaFin").getAsString());
		paramsRequestGet.put("idUsuario", "" + principalDetail.getIdUsuario());

		if (jsonObject.get("idUsuario") != null && jsonObject.get("idUsuario").getAsInt() != 0) {
			paramsRequestGet.put("idUsuario", "" + jsonObject.get("idUsuario").getAsInt());
		}
		
		if (jsonObject.get("idModulo") != null && jsonObject.get("idModulo").getAsInt() != 0) {
			paramsRequestGet.put("idModulo", "" + jsonObject.get("idModulo").getAsInt());
			urlRequest = urlRequest.concat("&idModulo={idModulo}");
		}
		logger.info("DATA " + paramsRequestGet.toString());
		ServiceResponseResult response = restCaller.callGetBearerTokenRequest(paramsRequestGet, urlRequest,
				ServiceResponseResult.class, tokenAcces);
		logger.info("RESULT" + gson.toJson(response));
		return response;
	}

	@Override
	public ServiceResponseResult consultarReporteLogGeneral(String params) {
		logger.info("ImplGenericAccionesService.class [metodo = consultarReporteLogGeneral() ]\n" + params);
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();

		ServiceResponseResult response = null;

		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		String tokenAcces = principalDetail.getAccess_token();
		logger.info("json object params## " + jsonObject.toString());
		String urlRequest = principalDetail.getDireccionAmbiente()
				.concat(constantesAmbiente.getConsultarReporteLogGeneral());

		if (jsonObject.get("idUsuario") != null && jsonObject.get("idUsuario").getAsInt() != 0) {
			Map<String, String> paramsRequestGet = new HashMap<String, String>();
			paramsRequestGet.put("fechaInicio", jsonObject.get("fechaInicio").getAsString());
			paramsRequestGet.put("fechaFin", jsonObject.get("fechaFin").getAsString());
			paramsRequestGet.put("idUsuario", "" + principalDetail.getIdUsuario());

			urlRequest = principalDetail.getDireccionAmbiente()
					.concat(constantesAmbiente.getConsultarAccionesRealizadas());

			response = restCaller.callGetBearerTokenRequest(paramsRequestGet, urlRequest, ServiceResponseResult.class,
					tokenAcces);

		} else {
			response = restCaller.callPostBearerTokenRequest(jsonObject.toString(), urlRequest,
					ServiceResponseResult.class, tokenAcces);
		}

		if (response.getResult() instanceof Integer) {
			response = ServiceResponseResult.builder().isRespuesta(false).result(response.getResult()).build();
		} else {
			JsonObject jsonObjectResponse = gson.fromJson(gson.toJson(response.getResult()), JsonObject.class);
			JsonArray modulosArray = jsonObjectResponse.getAsJsonArray("modulos");
			JsonArray modulosReporte = new JsonArray();
			JsonObject modulos = new JsonObject();
			if (modulosArray.size() > 0) {
				for (int i = 0; i < modulosArray.size(); i++) {
					JsonObject object = (JsonObject) modulosArray.get(i);
					JsonObject result = new JsonObject();
					logger.info("objeto: " + object);

					result.addProperty("MODULO",
							object.get("descripcionModulo") != null
									? object.get("descripcionModulo").getAsString().trim()
									: "Sin dato");
					result.addProperty("ACCION",
							object.get("descripcionAccion") != null
									? object.get("descripcionAccion").getAsString().trim()
									: "Sin dato");
					result.addProperty("ESTATUS",
							object.get("descripcionEstatusHttp") != null
									? object.get("descripcionEstatusHttp").getAsString().trim()
									: "Sin dato");
					result.addProperty("MENSAJE",
							object.get("descripcionMensajeHttp") != null
									? object.get("descripcionMensajeHttp").getAsString().trim()
									: "Sin dato");
					result.addProperty("COMENTARIOS",
							object.get("comentarios") != null ? object.get("comentarios").getAsString().trim()
									: "Sin dato");
					result.addProperty("FECHA REGISTRO",
							object.get("fechaRegistro") != null ? object.get("fechaRegistro").getAsString().trim()
									: "Sin dato");
					result.addProperty("NOMBRE",
							object.get("nombreUsuario") != null ? object.get("nombreUsuario").getAsString().trim()
									: "Sin dato");
					result.addProperty("#EMPLEADO",
							object.get("numEmpleado") != null ? object.get("numEmpleado").getAsString().trim()
									: "Sin dato");
					result.addProperty("USUARIO",
							object.get("usuarioFFM") != null ? object.get("usuarioFFM").getAsString().trim()
									: "Sin dato");
					result.addProperty("MAC",
							object.get("mac") != null ? object.get("mac").getAsString().trim() : "Sin dato");
					result.addProperty("IP",
							object.get("ip") != null ? object.get("ip").getAsString().trim() : "Sin dato");
					if (object.get("descripcionEstatusHttp") != null) {
						switch (result.get("ESTATUS").getAsString()) {
						case "success":
							result.addProperty("ESTATUS", "Éxito");
							break;

						case "error":
							result.addProperty("ESTATUS", "Error");
							break;

						case "warning":
							result.addProperty("ESTATUS", "Advertencia");
							break;

						case "info":
							result.addProperty("ESTATUS", "Informativo");
							break;

						default:
							break;
						}
					}

					modulosReporte.add(result);
				}
				modulos.add("modulos", modulosReporte);
				response = ServiceResponseResult.builder().isRespuesta(true).result(gson.toJson(modulos)).build();

			} else {
				response = ServiceResponseResult.builder().isRespuesta(true).result(null).build();
			}
		}

		return response;

	}

	@Override
	public DataTableResponse consultarLogGeneral(ParamConsultaOTPI params) {
		logger.info("ImplTraspasoService.class [metodo consultaTraspasos() ]\n" + gson.toJson(params));
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
		String[][] dataArray = new String[0][13];

		DataTableResponse dataResponse = DataTableResponse.builder().isRespuesta(false).data(dataArray).paginaActual(0)
				.registrosTotales(0).recordsFiltered("0").recordsTotal("0").draw(params.getDraw() + "").result(null)
				.build();
		params.setPagina((Integer.parseInt(params.getStart()) + 10) / 10);

		logger.info("### Object: " + gson.toJson(params));

		String tokenAcces = principalDetail.getAccess_token();
		logger.info("consultaTraspasos ##+" + tokenAcces);
		String urlRequest = principalDetail.getDireccionAmbiente()
				.concat(constantesAmbiente.getConsultarReporteLogGeneral());
		logger.info("URL ##+" + urlRequest);

		ServiceResponseResult response = restCaller.callPostBearerTokenRequest(gson.toJson(params), urlRequest,
				ServiceResponseResult.class, tokenAcces);

		if (response.getResult() == null || response.getResult() instanceof Integer) {
			dataResponse = DataTableResponse.builder().isRespuesta(false).data(dataArray).paginaActual(0)
					.registrosTotales(0).recordsFiltered("0").recordsTotal("0").draw(params.getDraw() + "")
					.result(response.getResult()).build();
		} else {
			JsonObject jsonObjectResponse = gson.fromJson(gson.toJson(response.getResult()), JsonObject.class);
			JsonArray modulosArray = jsonObjectResponse.getAsJsonArray("modulos");
			if (modulosArray.size() > 0) {
				if (jsonObjectResponse.get("registrosTotales").getAsInt() > 0) {
					int count = 0;
					dataArray = new String[modulosArray.size()][9];
					for (int i = 0; i < modulosArray.size(); i++) {
						JsonObject object = (JsonObject) modulosArray.get(i);

						dataArray[count][0] = (object.get("descripcionModulo") != null
								&& object.get("descripcionModulo").getAsString().trim() != "")
										? object.get("descripcionModulo").getAsString().trim()
										: "Sin dato";
						dataArray[count][1] = (object.get("descripcionAccion") != null
								&& object.get("descripcionAccion").getAsString().trim() != "")
										? object.get("descripcionAccion").getAsString().trim()
										: "Sin dato";
						dataArray[count][2] = (object.get("descripcionEstatusHttp") != null
								&& object.get("descripcionEstatusHttp").getAsString().trim() != "")
										? object.get("descripcionEstatusHttp").getAsString().trim()
										: "Sin dato";
						dataArray[count][3] = (object.get("descripcionMensajeHttp") != null
								&& object.get("descripcionMensajeHttp").getAsString().trim() != "")
										? object.get("descripcionMensajeHttp").getAsString().trim()
										: "Sin dato";
						dataArray[count][4] = (object.get("comentarios") != null
								&& object.get("comentarios").getAsString().trim() != "")
										? object.get("comentarios").getAsString().trim()
										: "Sin dato";
						dataArray[count][5] = (object.get("fechaRegistro") != null
								&& object.get("fechaRegistro").getAsString().trim() != "")
										? object.get("fechaRegistro").getAsString().trim()
										: "Sin dato";
						dataArray[count][6] = (object.get("nombreUsuario") != null
								&& object.get("nombreUsuario").getAsString().trim() != "")
										? object.get("nombreUsuario").getAsString().trim()
										: "Sin dato";
						dataArray[count][7] = (object.get("numEmpleado") != null
								&& object.get("numEmpleado").getAsString().trim() != "")
										? object.get("numEmpleado").getAsString().trim()
										: "Sin dato";
						dataArray[count][8] = (object.get("usuarioFFM") != null
								&& object.get("usuarioFFM").getAsString().trim() != "")
										? object.get("usuarioFFM").getAsString().trim()
										: "Sin dato";

						if (object.get("descripcionEstatusHttp") != null) {
							switch (dataArray[count][2]) {
							case "success":
								dataArray[count][2] = "Éxito";
								break;

							case "error":
								dataArray[count][2] = "Error";
								break;

							case "warning":
								dataArray[count][2] = "Advertencia";
								break;

							case "info":
								dataArray[count][2] = "Informativo";
								break;

							default:
								break;
							}
						}

						count++;

					}
					dataResponse = DataTableResponse.builder().isRespuesta(true).data(dataArray)
							.paginaActual(jsonObjectResponse.get("paginaActual").getAsInt())
							.registrosTotales(jsonObjectResponse.get("registrosTotales").getAsInt())
							.recordsFiltered(jsonObjectResponse.get("registrosTotales").getAsInt() + "")
							.recordsTotal(jsonObjectResponse.get("registrosTotales").getAsInt() + "")
							.draw(params.getDraw() + "").result(response.getResult()).build();
				} else {
					dataResponse = DataTableResponse.builder().isRespuesta(true).data(dataArray)
							.paginaActual(jsonObjectResponse.get("paginaActual").getAsInt())
							.registrosTotales(jsonObjectResponse.get("registrosTotales").getAsInt())
							.recordsFiltered(jsonObjectResponse.get("registrosTotales").getAsInt() + "")
							.recordsTotal(jsonObjectResponse.get("registrosTotales").getAsInt() + "")
							.draw(params.getDraw() + "").build();
				}
			}
		}

		logger.info("*** Objeto Response: " + gson.toJson(dataResponse));

		return dataResponse;
	}
}
