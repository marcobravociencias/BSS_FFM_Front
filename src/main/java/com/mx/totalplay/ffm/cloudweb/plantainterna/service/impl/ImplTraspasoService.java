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

	private final Logger logger = LogManager.getLogger(ImplTraspasoService.class.getName());
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
						dataArray[count][3] = (object.get("cluster") != null
								&& object.get("cluster").getAsString().trim() != "")
										? object.get("cluster").getAsString().trim()
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
						dataArray[count][11] = "<div class='tooltip-btn'> <span onclick='consultaDetalleOtGeneric("
								+ String.valueOf(object.get("idOrden").getAsInt()) + ", "
								+ String.valueOf(object.get("idFlujo"))
								+ ")' class='btn-floating btn-option btn-sm btn-detalle btn-secondary waves-effect waves-light acciones'><th><i class='icono_cons_bg fa fa-bars' aria-hidden='true'></i></th></span></div>";
						dataArray[count][12] = "<div class='tooltip-btn'> <span onclick='consultaTraspaso("
								+ String.valueOf(object.get("idOrden").getAsInt())
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
		logger.info("consultaTraspasos ##+" + tokenAcces);
		String urlRequest = principalDetail.getDireccionAmbiente().concat(constTraspaso.getConsultaGeneralTraspasos());
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


						dataArray[count][0] = object.get("idOrdenNueva").getAsInt() != 0
								? String.valueOf(object.get("idOrdenNueva").getAsInt())
								: "Sin dato";
						dataArray[count][1] = object.get("idOrdenOriginal").getAsInt() != 0
								? String.valueOf(object.get("idOrdenOriginal").getAsInt())
								: "Sin dato";
						dataArray[count][2] = (object.get("folioSistema") != null
								&& object.get("folioSistema").getAsString().trim() != "")
										? object.get("folioSistema").getAsString().trim()
										: "Sin dato";
						dataArray[count][3] = (object.get("nombreCliente") != null
								&& object.get("nombreCliente").getAsString().trim() != "")
										? object.get("nombreCliente").getAsString().trim()
										: "Sin dato";
						dataArray[count][4] = (object.get("claveCliente") != null
								&& object.get("claveCliente").getAsString().trim() != "")
										? object.get("claveCliente").getAsString().trim()
										: "Sin dato";
						dataArray[count][5] = (object.get("geografia") != null
								&& object.get("geografia").getAsString().trim() != "")
										? object.get("geografia").getAsString().trim()
										: "Sin dato";
						dataArray[count][6] = (object.get("fechaAgenda") != null
								&& object.get("fechaAgenda").getAsString().trim() != "")
										? object.get("fechaAgenda").getAsString().trim()
										: "Sin dato";
						dataArray[count][7] = (object.get("descTipo") != null
								&& object.get("descTipo").getAsString().trim() != "")
										? object.get("descTipo").getAsString().trim()
										: "Sin dato";
						dataArray[count][8] = (object.get("descSubTipo") != null
								&& object.get("descSubTipo").getAsString().trim() != "")
										? object.get("descSubTipo").getAsString().trim()
										: "Sin dato";
						dataArray[count][9] = (object.get("descripcionEstatus") != null
								&& object.get("descripcionEstatus").getAsString().trim() != "")
										? object.get("descripcionEstatus").getAsString().trim()
										: "Sin dato";
						dataArray[count][10] = (object.get("descripcionEstado") != null
								&& object.get("descripcionEstado").getAsString().trim() != "")
										? object.get("descripcionEstado").getAsString().trim()
										: "Sin dato";
						dataArray[count][11] = (object.get("descripcionMotivo") != null
								&& object.get("descripcionMotivo").getAsString().trim() != "")
										? object.get("descripcionMotivo").getAsString().trim()
										: "Sin dato";
						dataArray[count][12] = (object.get("motivoTransferencia") != null
								&& object.get("motivoTransferencia").getAsString().trim() != "")
										? object.get("motivoTransferencia").getAsString().trim()
										: "Sin dato";
						dataArray[count][13] = "<div class='tooltip-btn'> <span onclick='consultaImagenesOTsTraspasos("
								+ String.valueOf(object.get("idOrdenNueva").getAsInt()) + ", "
								+ String.valueOf(object.get("claveCliente"))
								+ ")' class='btn-option btn-floating btn-evidencia btn-sm btn-secondary waves-effect waves-light'><th><i class='icono_cons_bg fa fa-picture-o' aria-hidden='true'></i></th></span></div>";
						dataArray[count][14] = "<div class='tooltip-btn'> <span onclick='consultaDetalleOtGeneric("
								+ String.valueOf(object.get("idOrdenNueva").getAsInt()) + ", "
								+ String.valueOf(object.get("idFlujo"))
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
	public ServiceResponseResult consultarFactibilidad(String params) {
		logger.info("ImplTraspasoService.class [metodo = consultarFactibilidadp() ]\n" + params);
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();

		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		String lat = jsonObject.get("latitud").getAsString();
		String lon = jsonObject.get("longitud").getAsString();
		String factibilidad = jsonObject.get("factibilidad").getAsString();

		String tokenAcces = principalDetail.getAccess_token();
		logger.info("consultarFactibilidad ##+" + tokenAcces);
		String urlRequest = factibilidad + "?latitud=" + lat + "&longitud=" + lon;
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
		logger.info("ImplDisponibilidadService.class [metodo = agendarTraspasoOt() ]\n" + params);
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();

		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		String tokenAcces = principalDetail.getAccess_token();
		String urlRequest = principalDetail.getDireccionAmbiente().concat(constTraspaso.getAgendarTraspasoOt());
		logger.info("URL ##" + urlRequest);

		Map<String, String> paramsRequestGet = new HashMap<String, String>();

		ServiceResponseResult response = restCaller.callPostBearerTokenRequest(jsonObject.toString(), urlRequest,
				ServiceResponseResult.class, tokenAcces);
		logger.info(response);
		return response;
	}

	@Override
	public ServiceResponseResult consultarMotivos() {
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
		String tokenAcces = principalDetail.getAccess_token();
		String urlRequest = principalDetail.getDireccionAmbiente().concat(constTraspaso.getConsultarMotivos());
		logger.info("### URL consultarMotivos(): \n" + urlRequest);
		Map<String, String> paramsRequestGet = new HashMap<>();

		ServiceResponseResult response = restCaller.callGetBearerTokenRequest(paramsRequestGet, urlRequest,
				ServiceResponseResult.class, tokenAcces);

		logger.info("### RESULT consultarMotivos(): " + gson.toJson(response));
		return response;
	}

	@Override
	public ServiceResponseResult consultarCrmDisponibilidad(String params) {
		logger.info("ImplDisponibilidadService.class [metodo = consultarCrmDisponibilidad() ]\n" + params);

		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);

		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
		String tokenAcces = principalDetail.getAccess_token();
		logger.info("consultarCrmDisponibilidad ##+" + tokenAcces);
		String urlRequest = principalDetail.getDireccionAmbiente()
				.concat(constTraspaso.getCrmDisponibilidad() + "?unidadNegocio="
						+ jsonObject.get("unidadNegocio").getAsString() + "&propietario="
						+ jsonObject.get("propietario").getAsString() + "&subtipoIntervencion="
						+ jsonObject.get("subtipoIntervencion").getAsString() + "&geografia1="
						+ jsonObject.get("geografia1").getAsString() + "&geografia2="
						+ jsonObject.get("geografia2").getAsString());

		logger.info("***URL: " + urlRequest);
		Map<String, String> paramsRequestGet = new HashMap<String, String>();

		ServiceResponseResult response = restCaller.callGetBearerTokenRequest(paramsRequestGet, urlRequest,
				ServiceResponseResult.class, tokenAcces);
		logger.info("RESULT" + gson.toJson(response));
		return response;
	}

	@Override
	public DataTableResponse consultarHistorico(ParamConsultaOTPI paramsOT) {
		logger.info("ImplTraspasoService.class [metodo consultaHistorico() ]\n" + gson.toJson(paramsOT));
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
		logger.info("consultaHistorico ##+" + tokenAcces);
		String urlRequest = principalDetail.getDireccionAmbiente().concat(constTraspaso.getConsultaGeneralHistorico());
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
					dataArray = new String[ordenesArray.size()][15];
					int idOrden = 0;
					for (int i = 0; i < ordenesArray.size(); i++) {
						JsonObject object = (JsonObject) ordenesArray.get(i);

						dataArray[count][0] = object.get("idOrdenNueva").getAsInt() != 0
								? String.valueOf(object.get("idOrdenNueva").getAsInt())
								: "Sin dato";
						dataArray[count][1] = object.get("idOrdenOriginal").getAsInt() != 0
								? String.valueOf(object.get("idOrdenOriginal").getAsInt())
								: "Sin dato";
						dataArray[count][2] = (object.get("folioSistema") != null
								&& object.get("folioSistema").getAsString().trim() != "")
										? object.get("folioSistema").getAsString().trim()
										: "Sin dato";
						dataArray[count][3] = (object.get("nombreCliente") != null
								&& object.get("nombreCliente").getAsString().trim() != "")
										? object.get("nombreCliente").getAsString().trim()
										: "Sin dato";
						dataArray[count][4] = (object.get("claveCliente") != null
								&& object.get("claveCliente").getAsString().trim() != "")
										? object.get("claveCliente").getAsString().trim()
										: "Sin dato";
						dataArray[count][5] = (object.get("geografia") != null
								&& object.get("geografia").getAsString().trim() != "")
										? object.get("geografia").getAsString().trim()
										: "Sin dato";
						dataArray[count][6] = (object.get("fechaAgenda") != null
								&& object.get("fechaAgenda").getAsString().trim() != "")
										? object.get("fechaAgenda").getAsString().trim()
										: "Sin dato";
						dataArray[count][7] = (object.get("descTipo") != null
								&& object.get("descTipo").getAsString().trim() != "")
										? object.get("descTipo").getAsString().trim()
										: "Sin dato";
						dataArray[count][8] = (object.get("descSubTipo") != null
								&& object.get("descSubTipo").getAsString().trim() != "")
										? object.get("descSubTipo").getAsString().trim()
										: "Sin dato";
						dataArray[count][9] = (object.get("descripcionEstatus") != null
								&& object.get("descripcionEstatus").getAsString().trim() != "")
										? object.get("descripcionEstatus").getAsString().trim()
										: "Sin dato";
						dataArray[count][10] = (object.get("descripcionEstado") != null
								&& object.get("descripcionEstado").getAsString().trim() != "")
										? object.get("descripcionEstado").getAsString().trim()
										: "Sin dato";
						dataArray[count][11] = (object.get("descripcionMotivo") != null
								&& object.get("descripcionMotivo").getAsString().trim() != "")
										? object.get("descripcionMotivo").getAsString().trim()
										: "Sin dato";
						dataArray[count][12] = (object.get("motivoTransferencia") != null
								&& object.get("motivoTransferencia").getAsString().trim() != "")
										? object.get("motivoTransferencia").getAsString().trim()
										: "Sin dato";
						dataArray[count][13] = "<div class='tooltip-btn'> <span onclick='consultaImagenesOTsTraspasos("
								+ String.valueOf(object.get("idOrdenNueva").getAsInt()) + ", "
								+ String.valueOf(object.get("claveCliente"))
								+ ")' class='btn-option btn-floating btn-evidencia btn-sm btn-secondary waves-effect waves-light'><th><i class='icono_cons_bg fa fa-picture-o' aria-hidden='true'></i></th></span></div>";
						dataArray[count][14] = "<div class='tooltip-btn'> <span onclick='consultaDetalleOtGeneric("
								+ String.valueOf(object.get("idOrdenNueva").getAsInt()) + ", "
								+ String.valueOf(object.get("idFlujo"))
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

}
