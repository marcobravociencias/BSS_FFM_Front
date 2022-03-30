package com.mx.totalplay.ffm.cloudweb.plantainterna.service.impl;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import java.util.HashMap;
import java.util.Map;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;
import com.google.gson.Gson;
import com.mx.totalplay.ffm.cloudweb.plantainterna.model.consultaOTPI.ImagenesConfig;
import com.mx.totalplay.ffm.cloudweb.plantainterna.model.consultaOTPI.ParamConsultaOTPI;
import com.mx.totalplay.ffm.cloudweb.plantainterna.model.consultaOTPI.ResponseImagenEvidencia;
import com.mx.totalplay.ffm.cloudweb.plantainterna.service.TraspasoService;
import com.mx.totalplay.ffm.cloudweb.plantainterna.utils.ConstTraspaso;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.DataTableResponse;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.LoginResult;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.ConstantesGeneric;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.ConsumeRest;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.UtileriaGeneral;

@Service
public class ImplTraspasoService implements TraspasoService {

	private final Logger logger = LogManager.getLogger(ImplConsultaOTService.class.getName());
	private final ConsumeRest restCaller;
	private final ConstantesGeneric constantesGeneric;
	private final Environment env;
	private final ConstTraspaso constTraspaso;
	private final UtileriaGeneral utilerias;
	Gson gson = new Gson();

	@Autowired
	public ImplTraspasoService(ConsumeRest restCaller, ConstantesGeneric constantesGeneric, Environment env,
			ConstTraspaso constTraspaso, UtileriaGeneral utilerias) {
		this.restCaller = restCaller;
		this.constantesGeneric = constantesGeneric;
		this.env = env;
		this.constTraspaso = constTraspaso;
		this.utilerias = utilerias;
	}

	@Override
	public DataTableResponse consultaTraspasosOt(ParamConsultaOTPI paramsOT) {
		logger.info("ImplTraspasoService.class [metodo consultaTraspasosOt() ]\n" + gson.toJson(paramsOT));
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
		String[][] dataArray = new String[0][13];
		DataTableResponse dataResponse = DataTableResponse.builder().isRespuesta(false).data(dataArray).paginaActual(0)
				.registrosTotales(0).recordsFiltered("0").recordsTotal("0").draw(paramsOT.getDraw() + "").result(null)
				.build();
		paramsOT.setPagina((Integer.parseInt(paramsOT.getStart()) + 10) / 10);
		paramsOT.setIdOrden(!paramsOT.getIdOrden().equals("") ? paramsOT.getIdOrden() : null);
		paramsOT.setFolioSistema(!paramsOT.getFolioSistema().equals("") ? paramsOT.getFolioSistema() : null);
		paramsOT.setClaveCliente(!paramsOT.getClaveCliente().equals("") ? paramsOT.getClaveCliente() : null);

		logger.info("### Object: " + gson.toJson(paramsOT));

		String tokenAcces = principalDetail.getAccess_token();
		logger.info("consultaTraspasosOt ##+" + tokenAcces);
		String urlRequest = principalDetail.getDireccionAmbiente()
				.concat(constTraspaso.getConsultaGeneralTraspasosOt());
		logger.info("URL ##+" + urlRequest);

		ServiceResponseResult response = restCaller.callPostBearerTokenRequest(gson.toJson(paramsOT), urlRequest,
				ServiceResponseResult.class, tokenAcces);

		if (response.getResult() == null || response.getResult() instanceof Integer) {
			dataResponse = DataTableResponse.builder().isRespuesta(false).data(dataArray).paginaActual(0)
					.registrosTotales(0).recordsFiltered("0").recordsTotal("0").draw(paramsOT.getDraw() + "")
					.result(response.getResult()).build();
		} else {
			JsonObject jsonObjectResponse = gson.fromJson(gson.toJson(response.getResult()), JsonObject.class);
			JsonArray ordenesArray = jsonObjectResponse.getAsJsonArray("ordenes");
			if (ordenesArray.size() > 0) {
				if (jsonObjectResponse.get("registrosTotales").getAsInt() > 0) {
					int count = 0;
					dataArray = new String[ordenesArray.size()][13];
					int idOrden = 0;
					for (int i = 0; i < ordenesArray.size(); i++) {
						JsonObject object = (JsonObject) ordenesArray.get(i);

						dataArray[count][0] = object.get("idOrden").getAsInt() != 0
								? String.valueOf(object.get("idOrden").getAsInt())
								: "Sin dato";
						dataArray[count][1] = (object.get("nombreCliente") != null
								&& object.get("nombreCliente").getAsString().trim() != "")
										? object.get("nombreCliente").getAsString().trim()
										: "Sin dato";
						dataArray[count][2] = (object.get("claveCliente") != null
								&& object.get("claveCliente").getAsString().trim() != "")
										? object.get("claveCliente").getAsString().trim()
										: "Sin dato";
						dataArray[count][3] = (object.get("ciudad") != null
								&& object.get("ciudad").getAsString().trim() != "")
										? object.get("ciudad").getAsString().trim()
										: "Sin dato";
						dataArray[count][4] = (object.get("fechaAgenda") != null
								&& object.get("fechaAgenda").getAsString().trim() != "")
										? object.get("fechaAgenda").getAsString().trim()
										: "Sin dato";
						dataArray[count][5] = (object.get("descTipo") != null
								&& object.get("descTipo").getAsString().trim() != "")
										? object.get("descTipo").getAsString().trim()
										: "Sin dato";
						dataArray[count][6] = (object.get("descSubTipo") != null
								&& object.get("descSubTipo").getAsString().trim() != "")
										? object.get("descSubTipo").getAsString().trim()
										: "Sin dato";
						dataArray[count][7] = (object.get("descripcionEstatus") != null
								&& object.get("descripcionEstatus").getAsString().trim() != "")
										? object.get("descripcionEstatus").getAsString().trim()
										: "Sin dato";
						dataArray[count][8] = (object.get("descripcionEstado") != null
								&& object.get("descripcionEstado").getAsString().trim() != "")
										? object.get("descripcionEstado").getAsString().trim()
										: "Sin dato";
						dataArray[count][9] = (object.get("descripcionMotivo") != null
								&& object.get("descripcionMotivo").getAsString().trim() != "")
										? object.get("descripcionMotivo").getAsString().trim()
										: "Sin dato";

						dataArray[count][10] = "<div class='tooltip-btn'> <span onclick='consultaImagenesOTsTraspasos("
								+ String.valueOf(object.get("idOrden").getAsInt()) + ", "
								+ String.valueOf(object.get("claveCliente"))
								+ ")' class='btn-option btn-floating btn-evidencia btn-sm btn-secondary waves-effect waves-light'><th><i class='icono_cons_bg fa fa-picture-o' aria-hidden='true'></i></th></span></div>";
						dataArray[count][11] = "<div class='tooltip-btn'> <span onclick='consultaDetalleOtsTraspasos("
								+ i
								+ ")' class='btn-floating btn-option btn-sm btn-detalle btn-secondary waves-effect waves-light acciones'><th><i class='icono_cons_bg fa fa-bars' aria-hidden='true'></i></th></span></div>";
						dataArray[count][12] = "<div class='tooltip-btn'> <span onclick='consultaTraspaso(" + i
								+ ")' class='btn-floating btn-option btn-sm btn-traspaso btn-secondary waves-effect waves-light acciones'><th><i class='icono_cons_bg fa fa-exchange-alt' aria-hidden='true'></i></th></span></div>";
						count++;

					}
					dataResponse = DataTableResponse.builder().isRespuesta(true).data(dataArray)
							.paginaActual(jsonObjectResponse.get("paginaActual").getAsInt())
							.registrosTotales(jsonObjectResponse.get("registrosTotales").getAsInt())
							.recordsFiltered(jsonObjectResponse.get("registrosTotales").getAsInt() + "")
							.recordsTotal(jsonObjectResponse.get("registrosTotales").getAsInt() + "")
							.draw(paramsOT.getDraw() + "").result(response.getResult()).build();
				} else {
					dataResponse = DataTableResponse.builder().isRespuesta(true).data(dataArray)
							.paginaActual(jsonObjectResponse.get("paginaActual").getAsInt())
							.registrosTotales(jsonObjectResponse.get("registrosTotales").getAsInt())
							.recordsFiltered(jsonObjectResponse.get("registrosTotales").getAsInt() + "")
							.recordsTotal(jsonObjectResponse.get("registrosTotales").getAsInt() + "")
							.draw(paramsOT.getDraw() + "").build();
				}
			}
		}

		logger.info("*** Objeto Response: " + gson.toJson(dataResponse));

		return dataResponse;
	}

	@Override
	public ServiceResponseResult consultaEvidenciaTraspaso(String params) {
		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
		String tokenAcces = principalDetail.getAccess_token();
		String urlRequest = principalDetail.getDireccionAmbiente()
				.concat(constTraspaso.getConsultaEvidenciaTraspasos());
		logger.info("### URL consultaEvidenciaTraspaso(): \n" + urlRequest);
		Map<String, String> paramsRequestGet = new HashMap<>();
		paramsRequestGet.put("idOrden", jsonObject.get("orden").getAsString());

		ServiceResponseResult response = restCaller.callGetBearerTokenRequest(paramsRequestGet, urlRequest,
				ServiceResponseResult.class, tokenAcces);

		logger.info("### RESULT consultaEvidenciaTraspaso(): " + gson.toJson(response));
		return response;
	}

	@Override
	public ServiceResponseResult consultaInformacionDetalleTraspaso(String params) {
		logger.info("ImplTraspasoService.class [metodo = consultaInformacionDetalleTraspaso() ]\n" + params);
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();

		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		String idot = jsonObject.get("id_ot").getAsString();

		String tokenAcces = principalDetail.getAccess_token();
		logger.info("consultaInformacionDetalleTraspaso ##+" + tokenAcces);
		String urlRequest = principalDetail.getDireccionAmbiente()
				.concat(constTraspaso.getConsultaInfoGeneralTraspaso());
		logger.info("URL ##+" + urlRequest);

		Map<String, String> paramsRequestGet = new HashMap<String, String>();
		paramsRequestGet.put("idot", idot);

		ServiceResponseResult response = restCaller.callGetBearerTokenRequest(paramsRequestGet, urlRequest,
				ServiceResponseResult.class, tokenAcces);
		return response;
	}

	@Override
	public DataTableResponse consultaTraspasos(ParamConsultaOTPI paramsOT) {
		logger.info("ImplTraspasoService.class [metodo consultaTraspasos() ]\n" + gson.toJson(paramsOT));
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
		String[][] dataArray = new String[0][12];
		DataTableResponse dataResponse = DataTableResponse.builder().isRespuesta(false).data(dataArray).paginaActual(0)
				.registrosTotales(0).recordsFiltered("0").recordsTotal("0").draw(paramsOT.getDraw() + "").result(null)
				.build();
		paramsOT.setPagina((Integer.parseInt(paramsOT.getStart()) + 10) / 10);
		paramsOT.setIdOrden(!paramsOT.getIdOrden().equals("") ? paramsOT.getIdOrden() : null);
		paramsOT.setFolioSistema(!paramsOT.getFolioSistema().equals("") ? paramsOT.getFolioSistema() : null);
		paramsOT.setClaveCliente(!paramsOT.getClaveCliente().equals("") ? paramsOT.getClaveCliente() : null);

		logger.info("### Object: " + gson.toJson(paramsOT));

		String tokenAcces = principalDetail.getAccess_token();
		logger.info("consultaTraspasos ##+" + tokenAcces);
		String urlRequest = principalDetail.getDireccionAmbiente()
				.concat(constTraspaso.getConsultaGeneralTraspasosOt());
		logger.info("URL ##+" + urlRequest);

		ServiceResponseResult response = restCaller.callPostBearerTokenRequest(gson.toJson(paramsOT), urlRequest,
				ServiceResponseResult.class, tokenAcces);

		if (response.getResult() == null || response.getResult() instanceof Integer) {
			dataResponse = DataTableResponse.builder().isRespuesta(false).data(dataArray).paginaActual(0)
					.registrosTotales(0).recordsFiltered("0").recordsTotal("0").draw(paramsOT.getDraw() + "")
					.result(response.getResult()).build();
		} else {
			JsonObject jsonObjectResponse = gson.fromJson(gson.toJson(response.getResult()), JsonObject.class);
			JsonArray ordenesArray = jsonObjectResponse.getAsJsonArray("ordenes");
			if (ordenesArray.size() > 0) {
				if (jsonObjectResponse.get("registrosTotales").getAsInt() > 0) {
					int count = 0;
					dataArray = new String[ordenesArray.size()][12];
					int idOrden = 0;
					for (int i = 0; i < ordenesArray.size(); i++) {
						JsonObject object = (JsonObject) ordenesArray.get(i);

						dataArray[count][0] = object.get("idOrden").getAsInt() != 0
								? String.valueOf(object.get("idOrden").getAsInt())
								: "";
						dataArray[count][1] = (object.get("nombreCliente") != null
								&& object.get("nombreCliente").getAsString().trim() != "")
										? object.get("nombreCliente").getAsString().trim()
										: "Sin dato";
						dataArray[count][2] = (object.get("claveCliente") != null
								&& object.get("claveCliente").getAsString().trim() != "")
										? object.get("claveCliente").getAsString().trim()
										: "Sin dato";
						dataArray[count][3] = (object.get("ciudad") != null
								&& object.get("ciudad").getAsString().trim() != "")
										? object.get("ciudad").getAsString().trim()
										: "Sin dato";
						dataArray[count][4] = (object.get("fechaAgenda") != null
								&& object.get("fechaAgenda").getAsString().trim() != "")
										? object.get("fechaAgenda").getAsString().trim()
										: "Sin dato";
						dataArray[count][5] = (object.get("descTipo") != null
								&& object.get("descTipo").getAsString().trim() != "")
										? object.get("descTipo").getAsString().trim()
										: "Sin dato";
						dataArray[count][6] = (object.get("descSubTipo") != null
								&& object.get("descSubTipo").getAsString().trim() != "")
										? object.get("descSubTipo").getAsString().trim()
										: "Sin dato";
						dataArray[count][7] = (object.get("descripcionEstatus") != null
								&& object.get("descripcionEstatus").getAsString().trim() != "")
										? object.get("descripcionEstatus").getAsString().trim()
										: "Sin dato";
						dataArray[count][8] = (object.get("descripcionEstado") != null
								&& object.get("descripcionEstado").getAsString().trim() != "")
										? object.get("descripcionEstado").getAsString().trim()
										: "Sin dato";
						dataArray[count][9] = (object.get("descripcionMotivo") != null
								&& object.get("descripcionMotivo").getAsString().trim() != "")
										? object.get("descripcionMotivo").getAsString().trim()
										: "Sin dato";

						dataArray[count][10] = "<div class='tooltip-btn'> <span onclick='consultaImagenesOTsTraspasos("
								+ String.valueOf(object.get("idOrden").getAsInt()) + ", "
								+ String.valueOf(object.get("claveCliente"))
								+ ")' class='btn-option btn-floating btn-evidencia btn-sm btn-secondary waves-effect waves-light'><th><i class='icono_cons_bg fa fa-picture-o' aria-hidden='true'></i></th></span></div>";
						dataArray[count][11] = "<div class='tooltip-btn'> <span onclick='consultaDetalleTraspasos(" + i
								+ ")' class='btn-floating btn-option btn-sm btn-detalle btn-secondary waves-effect waves-light acciones'><th><i class='icono_cons_bg fa fa-bars' aria-hidden='true'></i></th></span></div>";
						count++;

					}
					dataResponse = DataTableResponse.builder().isRespuesta(true).data(dataArray)
							.paginaActual(jsonObjectResponse.get("paginaActual").getAsInt())
							.registrosTotales(jsonObjectResponse.get("registrosTotales").getAsInt())
							.recordsFiltered(jsonObjectResponse.get("registrosTotales").getAsInt() + "")
							.recordsTotal(jsonObjectResponse.get("registrosTotales").getAsInt() + "")
							.draw(paramsOT.getDraw() + "").result(response.getResult()).build();
				} else {
					dataResponse = DataTableResponse.builder().isRespuesta(true).data(dataArray)
							.paginaActual(jsonObjectResponse.get("paginaActual").getAsInt())
							.registrosTotales(jsonObjectResponse.get("registrosTotales").getAsInt())
							.recordsFiltered(jsonObjectResponse.get("registrosTotales").getAsInt() + "")
							.recordsTotal(jsonObjectResponse.get("registrosTotales").getAsInt() + "")
							.draw(paramsOT.getDraw() + "").build();
				}
			}
		}

		logger.info("*** Objeto Response: " + gson.toJson(dataResponse));

		return dataResponse;
	}

	@Override
	public ServiceResponseResult consultarReporteOts(String params) {
		logger.info("ImplTraspasoService.class [metodo consultarReporteOts() ]\n" + params);
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
		String tokenAcces = principalDetail.getAccess_token();
		logger.info("consultarReporteOts ##+" + tokenAcces);
		String urlRequest = principalDetail.getDireccionAmbiente().concat(constTraspaso.getConsultaGeneralTraspasosOt());
		logger.info("URL ##+" + urlRequest);

		ServiceResponseResult response = restCaller.callPostBearerTokenRequest(params, urlRequest,
				ServiceResponseResult.class, tokenAcces);
		if (response.getResult() instanceof Integer) {
			response = ServiceResponseResult.builder().isRespuesta(false).result(response.getResult()).build();
		} else {
			JsonObject jsonObjectResponse = gson.fromJson(gson.toJson(response.getResult()), JsonObject.class);
			JsonArray ordenesArray = jsonObjectResponse.getAsJsonArray("ordenes");
			JsonArray ordenesReporte = new JsonArray();
			JsonObject ordenesR = new JsonObject();
			if (ordenesArray.size() > 0) {
				if (jsonObjectResponse.get("registrosTotales").getAsInt() > 0) {
					for (int i = 0; i < ordenesArray.size(); i++) {
						JsonObject object = (JsonObject) ordenesArray.get(i);
						JsonObject result = new JsonObject();
						logger.info("objeto: " + object);
						result.addProperty("OT",
								object.get("idOrden").getAsInt() != 0 ? String.valueOf(object.get("idOrden").getAsInt())
										: "Sin dato");
						result.addProperty("CLIENTE",
								object.get("nombreCliente") != null ? object.get("nombreCliente").getAsString().trim()
										: "Sin dato");
						result.addProperty("CUENTA",
								object.get("claveCliente") != null ? object.get("claveCliente").getAsString().trim()
										: "Sin dato");
						result.addProperty("CIUDAD",
								object.get("ciudad") != null ? object.get("ciudad").getAsString().trim() : "Sin dato");
						result.addProperty("FECHA AGENDA",
								object.get("fechaAgenda") != null ? object.get("fechaAgenda").getAsString().trim()
										: "Sin dato");
						result.addProperty("TIPO",
								object.get("descTipo") != null ? object.get("descTipo").getAsString().trim()
										: "Sin dato");
						result.addProperty("SUBTIPO",
								object.get("descSubTipo") != null ? object.get("descSubTipo").getAsString().trim()
										: "Sin dato");
						result.addProperty("MOTIVO",
								object.get("descripcionMotivo") != null
										? object.get("descripcionMotivo").getAsString().trim()
										: "Sin dato");
						result.addProperty("ESTATUS",
								object.get("descripcionEstatus") != null
										? object.get("descripcionEstatus").getAsString().trim()
										: "Sin dato");
						result.addProperty("ESTADO",
								object.get("descripcionEstado") != null
										? object.get("descripcionEstado").getAsString().trim()
										: "Sin dato");
						ordenesReporte.add(result);
					}
					ordenesR.add("ordenes", ordenesReporte);
					response = ServiceResponseResult.builder().isRespuesta(true).result(gson.toJson(ordenesR)).build();
				} else {
					response = ServiceResponseResult.builder().isRespuesta(true).result(null).build();
				}
			} else {
				response = ServiceResponseResult.builder().isRespuesta(true).result(null).build();
			}
		}

		logger.info("*** Objeto Response: " + gson.toJson(response));

		return response;
	}

	@Override
	public ServiceResponseResult consultarReporteTraspasos(String params) {
		logger.info("ImplTraspasoService.class [metodo consultarReporteTraspasos() ]\n" + params);
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
		String tokenAcces = principalDetail.getAccess_token();
		logger.info("consultarReporteTraspasos ##+" + tokenAcces);
		String urlRequest = principalDetail.getDireccionAmbiente().concat(constTraspaso.getConsultaGeneralTraspasos());
		logger.info("URL ##+" + urlRequest);

		ServiceResponseResult response = restCaller.callPostBearerTokenRequest(params, urlRequest,
				ServiceResponseResult.class, tokenAcces);
		if (response.getResult() instanceof Integer) {
			response = ServiceResponseResult.builder().isRespuesta(false).result(response.getResult()).build();
		} else {
			JsonObject jsonObjectResponse = gson.fromJson(gson.toJson(response.getResult()), JsonObject.class);
			JsonArray ordenesArray = jsonObjectResponse.getAsJsonArray("ordenes");
			JsonArray ordenesReporte = new JsonArray();
			JsonObject ordenesR = new JsonObject();
			if (ordenesArray.size() > 0) {
				if (jsonObjectResponse.get("registrosTotales").getAsInt() > 0) {
					for (int i = 0; i < ordenesArray.size(); i++) {
						JsonObject object = (JsonObject) ordenesArray.get(i);
						JsonObject result = new JsonObject();
						logger.info("objeto: " + object);
						result.addProperty("OT",
								object.get("idOrden").getAsInt() != 0 ? String.valueOf(object.get("idOrden").getAsInt())
										: "Sin dato");
						result.addProperty("CLIENTE",
								object.get("nombreCliente") != null ? object.get("nombreCliente").getAsString().trim()
										: "Sin dato");
						result.addProperty("CUENTA",
								object.get("claveCliente") != null ? object.get("claveCliente").getAsString().trim()
										: "Sin dato");
						result.addProperty("CIUDAD",
								object.get("ciudad") != null ? object.get("ciudad").getAsString().trim() : "Sin dato");
						result.addProperty("FECHA AGENDA",
								object.get("fechaAgenda") != null ? object.get("fechaAgenda").getAsString().trim()
										: "Sin dato");
						result.addProperty("TIPO",
								object.get("descTipo") != null ? object.get("descTipo").getAsString().trim()
										: "Sin dato");
						result.addProperty("SUBTIPO",
								object.get("descSubTipo") != null ? object.get("descSubTipo").getAsString().trim()
										: "Sin dato");
						result.addProperty("MOTIVO",
								object.get("descripcionMotivo") != null
										? object.get("descripcionMotivo").getAsString().trim()
										: "Sin dato");
						result.addProperty("ESTATUS",
								object.get("descripcionEstatus") != null
										? object.get("descripcionEstatus").getAsString().trim()
										: "Sin dato");
						result.addProperty("ESTADO",
								object.get("descripcionEstado") != null
										? object.get("descripcionEstado").getAsString().trim()
										: "Sin dato");
						ordenesReporte.add(result);
					}
					ordenesR.add("ordenes", ordenesReporte);
					response = ServiceResponseResult.builder().isRespuesta(true).result(gson.toJson(ordenesR)).build();
				} else {
					response = ServiceResponseResult.builder().isRespuesta(true).result(null).build();
				}
			} else {
				response = ServiceResponseResult.builder().isRespuesta(true).result(null).build();
			}
		}

		logger.info("*** Objeto Response: " + gson.toJson(response));

		return response;
	}

	@Override
	public ServiceResponseResult actualizarFactibilidad(String params) {
		 logger.info("ImplTraspasoService.class [metodo = actualizarFactibilidad() ]\n" + params);
	        LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();

	        JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
	        String idTraspaso = jsonObject.get("idTraspaso").getAsString();

	        String tokenAcces = principalDetail.getAccess_token();
	        String urlRequest = principalDetail.getDireccionAmbiente().concat(constTraspaso.getActualizarFactibilidadTraspaso());
	        logger.info("URL ##+" + urlRequest);

	        Map<String, String> paramsRequestGet = new HashMap<String, String>();
	        paramsRequestGet.put("idTraspaso", idTraspaso);
			
	        ServiceResponseResult response = restCaller.callPatchBearerTokenRequestURL(paramsRequestGet, 
				gson.toJson(jsonObject), urlRequest, ServiceResponseResult.class, tokenAcces);
	        return response;
	}

	@Override
	public ServiceResponseResult consultarFactibilidadRes(String params) {
		logger.info("ImplTraspasoService.class [metodo = consultarFactibilidadRes() ]\n" + params);
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();

		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		String lat = jsonObject.get("latitud").getAsString();
		String lon = jsonObject.get("longitud").getAsString();

		String tokenAcces = principalDetail.getAccess_token();
		logger.info("consultarFactibilidadRes ##+" + tokenAcces);
		String urlRequest = principalDetail.getDireccionAmbiente()
				.concat(constTraspaso.getConsultarFactibilidadTraspasoRes());
		logger.info("URL ##+" + urlRequest);

		Map<String, String> paramsRequestGet = new HashMap<String, String>();
		paramsRequestGet.put("latitud", lat);
		paramsRequestGet.put("longitud", lon);
		
		ServiceResponseResult response = restCaller.callGetBearerTokenRequest(paramsRequestGet, urlRequest,
				ServiceResponseResult.class, tokenAcces);
		return response;
	}
	
	@Override
	public ServiceResponseResult consultarFactibilidadEmp(String params) {
		logger.info("ImplTraspasoService.class [metodo = consultarFactibilidadEmp() ]\n" + params);
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();

		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		String lat = jsonObject.get("latitud").getAsString();
		String lon = jsonObject.get("longitud").getAsString();

		String tokenAcces = principalDetail.getAccess_token();
		logger.info("consultarFactibilidadEmp ##+" + tokenAcces);
		String urlRequest = principalDetail.getDireccionAmbiente()
				.concat(constTraspaso.getConsultarFactibilidadTraspasoEmp());
		logger.info("URL ##+" + urlRequest);

		Map<String, String> paramsRequestGet = new HashMap<String, String>();
		paramsRequestGet.put("latitud", lat);
		paramsRequestGet.put("longitud", lon);
		
		ServiceResponseResult response = restCaller.callGetBearerTokenRequest(paramsRequestGet, urlRequest,
				ServiceResponseResult.class, tokenAcces);
		return response;
	}

	@Override
	public ServiceResponseResult agendarTraspasoOt(String params) {
		// TODO Auto-generated method stub
		return null;
	}

}
