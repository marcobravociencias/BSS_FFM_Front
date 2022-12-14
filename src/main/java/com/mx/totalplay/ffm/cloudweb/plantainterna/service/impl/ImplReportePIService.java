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
import com.mx.totalplay.ffm.cloudweb.plantainterna.model.consultaOTPI.ImagenesConfig;
import com.mx.totalplay.ffm.cloudweb.plantainterna.model.consultaOTPI.ParamConsultaOTPI;
import com.mx.totalplay.ffm.cloudweb.plantainterna.model.consultaOTPI.ResponseImagenEvidencia;
import com.mx.totalplay.ffm.cloudweb.plantainterna.service.ReportePIService;
import com.mx.totalplay.ffm.cloudweb.plantainterna.utils.ConstConsultaOT;
import com.mx.totalplay.ffm.cloudweb.plantainterna.utils.ConstReportePI;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.DataTableResponse;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.LoginResult;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.ConstantesGeneric;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.ConsumeRest;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.UtileriaGeneral;

@Service
public class ImplReportePIService implements ReportePIService {

	private final Logger logger = LogManager.getLogger(ImplReportePIService.class.getName());
	private final ConsumeRest restCaller;
	private final ConstantesGeneric constantesGeneric;
	private final Environment env;
	private final UtileriaGeneral utilerias;
	private final ConstReportePI constReportePI;
	Gson gson = new Gson();

	@Autowired
	public ImplReportePIService(ConsumeRest restCaller, ConstantesGeneric constantesGeneric, Environment env,
			ConstReportePI constReportePI, UtileriaGeneral utilerias) {
		this.restCaller = restCaller;
		this.constantesGeneric = constantesGeneric;
		this.env = env;
		this.constReportePI = constReportePI;
		this.utilerias = utilerias;
	}

	@Override
	public DataTableResponse consultaReporteOrdenes(ParamConsultaOTPI paramsOT) {
		logger.info("ImplReportePIService.class [metodo consultaInformacionDetalleOt() ]\n" + gson.toJson(paramsOT));
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
		String[][] dataArray = null;
		DataTableResponse dataResponse = DataTableResponse.builder().isRespuesta(false).data(new String[0][10])
				.paginaActual(0).registrosTotales(0).recordsFiltered("0").recordsTotal("0")
				.draw(paramsOT.getDraw() + "").result(null).build();
		paramsOT.setPagina((Integer.parseInt(paramsOT.getStart()) + 10) / 10);
		paramsOT.setIdOrden(!paramsOT.getIdOrden().equals("") ? paramsOT.getIdOrden() : null);
		paramsOT.setFolioSistema(!paramsOT.getFolioSistema().equals("") ? paramsOT.getFolioSistema() : null);
		paramsOT.setClaveCliente(!paramsOT.getClaveCliente().equals("") ? paramsOT.getClaveCliente() : null);

		logger.info("### Object: " + gson.toJson(paramsOT));
		String tokenAcces = principalDetail.getAccess_token();
		logger.info("consultaInformacionDetalleOt ##+" + tokenAcces);
		String urlRequest = principalDetail.getDireccionAmbiente().concat(constReportePI.getConsultaGeneralOt());
		logger.info("URL ##+" + urlRequest);

		ServiceResponseResult response = restCaller.callPostBearerTokenRequest(gson.toJson(paramsOT), urlRequest,
				ServiceResponseResult.class, tokenAcces);
		if (response.getResult() instanceof Integer) {
			dataResponse = DataTableResponse.builder().isRespuesta(false).data(new String[0][10]).paginaActual(0)
					.registrosTotales(0).recordsFiltered("0").recordsTotal("0").draw(paramsOT.getDraw() + "")
					.result(response.getResult()).build();
		} else {
			JsonObject jsonObjectResponse = gson.fromJson(gson.toJson(response.getResult()), JsonObject.class);
			JsonArray ordenesArray = jsonObjectResponse.getAsJsonArray("ordenes");
			if (ordenesArray.size() > 0) {
				if (jsonObjectResponse.get("registrosTotales").getAsInt() > 0) {
					int count = 0;
					dataArray = new String[ordenesArray.size()][11];
					for (int i = 0; i < ordenesArray.size(); i++) {
						JsonObject object = (JsonObject) ordenesArray.get(i);
						logger.info("objeto: " + object);
						dataArray[count][0] = object.get("idOrden").getAsInt() != 0
								? String.valueOf(object.get("idOrden").getAsInt())
								: "";
						dataArray[count][1] = object.get("nombreCliente") != null
								? object.get("nombreCliente").getAsString().trim()
								: "";
						dataArray[count][2] = object.get("claveCliente") != null
								? object.get("claveCliente").getAsString().trim()
								: "";
						dataArray[count][3] = object.get("ciudad") != null ? object.get("ciudad").getAsString().trim()
								: "";
						dataArray[count][4] = object.get("fechaAgenda") != null
								? object.get("fechaAgenda").getAsString().trim()
								: "";
						dataArray[count][5] = object.get("descripcionMotivo") != null
								? object.get("descripcionMotivo").getAsString().trim()
								: "";
						dataArray[count][6] = object.get("descripcionEstatus") != null
								? object.get("descripcionEstatus").getAsString().trim()
								: "";
						dataArray[count][7] = object.get("descripcionEstado") != null
								? object.get("descripcionEstado").getAsString().trim()
								: "";
						// dataArray[count][8] = "<div class='tooltip-btn'> <span
						// onclick='consultaMaterialesOT(" +
						// String.valueOf(object.get("idOrden").getAsInt()) + ")' class='btn-floating
						// btn-option btn-sm btn-default waves-effect waves-light'><th><i
						// class='icono_cons_bg fa fa-wrench'
						// aria-hidden='true'></i></th></span></div>";
						// dataArray[count][9] = "<div class='tooltip-btn'> <span
						// onclick='consultaImagenesOT(" +
						// String.valueOf(object.get("idOrden").getAsInt()) + ")' class='btn-option
						// btn-floating btn-evidencia btn-sm btn-secondary waves-effect
						// waves-light'><th><i class='icono_cons_bg fa fa-picture-o'
						// aria-hidden='true'></i></th></span></div>";
						dataArray[count][8] = "<div class='tooltip-btn'> <span onclick='consultaDetalleOt("
								+ String.valueOf(object.get("idOrden").getAsInt())
								+ ")' class='btn-floating btn-option btn-sm btn-secondary waves-effect waves-light acciones'><th><i class='icono_cons_bg fa fa-bars' aria-hidden='true'></i></th></span></div>";
						count++;

					}
					dataResponse = DataTableResponse.builder().isRespuesta(true).data(dataArray)
							.paginaActual(jsonObjectResponse.get("paginaActual").getAsInt())
							.registrosTotales(jsonObjectResponse.get("registrosTotales").getAsInt())
							.recordsFiltered(jsonObjectResponse.get("registrosTotales").getAsInt() + "")
							.recordsTotal(jsonObjectResponse.get("registrosTotales").getAsInt() + "")
							.draw(paramsOT.getDraw() + "").build();
				} else {
					dataResponse = DataTableResponse.builder().isRespuesta(true).data(new String[0][10])
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
	public DataTableResponse consultaReporteTecnico(ParamConsultaOTPI paramsOT) {
		logger.info("ImplReportePIService.class [metodo consultaInformacionDetalleOt() ]\n" + gson.toJson(paramsOT));
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
		String[][] dataArray = null;
		DataTableResponse dataResponse = DataTableResponse.builder().isRespuesta(false).data(new String[0][10])
				.paginaActual(0).registrosTotales(0).recordsFiltered("0").recordsTotal("0")
				.draw(paramsOT.getDraw() + "").result(null).build();
		paramsOT.setPagina((Integer.parseInt(paramsOT.getStart()) + 10) / 10);
		paramsOT.setIdOrden(!paramsOT.getIdOrden().equals("") ? paramsOT.getIdOrden() : null);
		paramsOT.setFolioSistema(!paramsOT.getFolioSistema().equals("") ? paramsOT.getFolioSistema() : null);
		paramsOT.setClaveCliente(!paramsOT.getClaveCliente().equals("") ? paramsOT.getClaveCliente() : null);

		logger.info("### Object: " + gson.toJson(paramsOT));
		String tokenAcces = principalDetail.getAccess_token();
		logger.info("consultaInformacionDetalleOt ##+" + tokenAcces);
		String urlRequest = principalDetail.getDireccionAmbiente().concat(constReportePI.getConsultaGeneralOt());
		logger.info("URL ##+" + urlRequest);

		ServiceResponseResult response = restCaller.callPostBearerTokenRequest(gson.toJson(paramsOT), urlRequest,
				ServiceResponseResult.class, tokenAcces);
		if (response.getResult() instanceof Integer) {
			dataResponse = DataTableResponse.builder().isRespuesta(false).data(new String[0][10]).paginaActual(0)
					.registrosTotales(0).recordsFiltered("0").recordsTotal("0").draw(paramsOT.getDraw() + "")
					.result(response.getResult()).build();
		} else {
			JsonObject jsonObjectResponse = gson.fromJson(gson.toJson(response.getResult()), JsonObject.class);
			JsonArray ordenesArray = jsonObjectResponse.getAsJsonArray("ordenes");
			if (ordenesArray.size() > 0) {
				if (jsonObjectResponse.get("registrosTotales").getAsInt() > 0) {
					int count = 0;
					dataArray = new String[ordenesArray.size()][11];
					for (int i = 0; i < ordenesArray.size(); i++) {
						JsonObject object = (JsonObject) ordenesArray.get(i);
						logger.info("objeto: " + object);
						dataArray[count][0] = object.get("idOrden").getAsInt() != 0
								? String.valueOf(object.get("idOrden").getAsInt())
								: "";
						dataArray[count][1] = object.get("nombreCliente") != null
								? object.get("nombreCliente").getAsString().trim()
								: "";
						dataArray[count][2] = object.get("claveCliente") != null
								? object.get("claveCliente").getAsString().trim()
								: "";
						dataArray[count][3] = object.get("ciudad") != null ? object.get("ciudad").getAsString().trim()
								: "";
						dataArray[count][4] = object.get("fechaAgenda") != null
								? object.get("fechaAgenda").getAsString().trim()
								: "";
						dataArray[count][5] = object.get("descripcionMotivo") != null
								? object.get("descripcionMotivo").getAsString().trim()
								: "";
						dataArray[count][6] = object.get("descripcionEstatus") != null
								? object.get("descripcionEstatus").getAsString().trim()
								: "";
						dataArray[count][7] = object.get("descripcionEstado") != null
								? object.get("descripcionEstado").getAsString().trim()
								: "";
						// dataArray[count][8] = "<div class='tooltip-btn'> <span
						// onclick='consultaMaterialesOT(" +
						// String.valueOf(object.get("idOrden").getAsInt()) + ")' class='btn-floating
						// btn-option btn-sm btn-default waves-effect waves-light'><th><i
						// class='icono_cons_bg fa fa-wrench'
						// aria-hidden='true'></i></th></span></div>";
						// dataArray[count][9] = "<div class='tooltip-btn'> <span
						// onclick='consultaImagenesOT(" +
						// String.valueOf(object.get("idOrden").getAsInt()) + ")' class='btn-option
						// btn-floating btn-evidencia btn-sm btn-secondary waves-effect
						// waves-light'><th><i class='icono_cons_bg fa fa-picture-o'
						// aria-hidden='true'></i></th></span></div>";
						dataArray[count][8] = "<div class='tooltip-btn'> <span onclick='consultaDetalleOt("
								+ String.valueOf(object.get("idOrden").getAsInt())
								+ ")' class='btn-floating btn-option btn-sm btn-secondary waves-effect waves-light acciones'><th><i class='icono_cons_bg fa fa-bars' aria-hidden='true'></i></th></span></div>";
						count++;

					}
					dataResponse = DataTableResponse.builder().isRespuesta(true).data(dataArray)
							.paginaActual(jsonObjectResponse.get("paginaActual").getAsInt())
							.registrosTotales(jsonObjectResponse.get("registrosTotales").getAsInt())
							.recordsFiltered(jsonObjectResponse.get("registrosTotales").getAsInt() + "")
							.recordsTotal(jsonObjectResponse.get("registrosTotales").getAsInt() + "")
							.draw(paramsOT.getDraw() + "").build();
				} else {
					dataResponse = DataTableResponse.builder().isRespuesta(true).data(new String[0][10])
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
	public DataTableResponse consultaReporteDespacho(ParamConsultaOTPI paramsOT) {
		logger.info("ImplReportePIService.class [metodo consultaInformacionDetalleOt() ]\n" + gson.toJson(paramsOT));
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
		String[][] dataArray = null;
		DataTableResponse dataResponse = DataTableResponse.builder().isRespuesta(false).data(new String[0][10])
				.paginaActual(0).registrosTotales(0).recordsFiltered("0").recordsTotal("0")
				.draw(paramsOT.getDraw() + "").result(null).build();
		paramsOT.setPagina((Integer.parseInt(paramsOT.getStart()) + 10) / 10);
		paramsOT.setIdOrden(!paramsOT.getIdOrden().equals("") ? paramsOT.getIdOrden() : null);
		paramsOT.setFolioSistema(!paramsOT.getFolioSistema().equals("") ? paramsOT.getFolioSistema() : null);
		paramsOT.setClaveCliente(!paramsOT.getClaveCliente().equals("") ? paramsOT.getClaveCliente() : null);

		logger.info("### Object: " + gson.toJson(paramsOT));
		String tokenAcces = principalDetail.getAccess_token();
		logger.info("consultaInformacionDetalleOt ##+" + tokenAcces);
		String urlRequest = principalDetail.getDireccionAmbiente().concat(constReportePI.getConsultaGeneralOt());
		logger.info("URL ##+" + urlRequest);

		ServiceResponseResult response = restCaller.callPostBearerTokenRequest(gson.toJson(paramsOT), urlRequest,
				ServiceResponseResult.class, tokenAcces);
		if (response.getResult() instanceof Integer) {
			dataResponse = DataTableResponse.builder().isRespuesta(false).data(new String[0][10]).paginaActual(0)
					.registrosTotales(0).recordsFiltered("0").recordsTotal("0").draw(paramsOT.getDraw() + "")
					.result(response.getResult()).build();
		} else {
			JsonObject jsonObjectResponse = gson.fromJson(gson.toJson(response.getResult()), JsonObject.class);
			JsonArray ordenesArray = jsonObjectResponse.getAsJsonArray("ordenes");
			if (ordenesArray.size() > 0) {
				if (jsonObjectResponse.get("registrosTotales").getAsInt() > 0) {
					int count = 0;
					dataArray = new String[ordenesArray.size()][11];
					for (int i = 0; i < ordenesArray.size(); i++) {
						JsonObject object = (JsonObject) ordenesArray.get(i);
						logger.info("objeto: " + object);
						dataArray[count][0] = object.get("idOrden").getAsInt() != 0
								? String.valueOf(object.get("idOrden").getAsInt())
								: "";
						dataArray[count][1] = object.get("nombreCliente") != null
								? object.get("nombreCliente").getAsString().trim()
								: "";
						dataArray[count][2] = object.get("claveCliente") != null
								? object.get("claveCliente").getAsString().trim()
								: "";
						dataArray[count][3] = object.get("ciudad") != null ? object.get("ciudad").getAsString().trim()
								: "";
						dataArray[count][4] = object.get("fechaAgenda") != null
								? object.get("fechaAgenda").getAsString().trim()
								: "";
						dataArray[count][5] = object.get("descripcionMotivo") != null
								? object.get("descripcionMotivo").getAsString().trim()
								: "";
						dataArray[count][6] = object.get("descripcionEstatus") != null
								? object.get("descripcionEstatus").getAsString().trim()
								: "";
						dataArray[count][7] = object.get("descripcionEstado") != null
								? object.get("descripcionEstado").getAsString().trim()
								: "";
						// dataArray[count][8] = "<div class='tooltip-btn'> <span
						// onclick='consultaMaterialesOT(" +
						// String.valueOf(object.get("idOrden").getAsInt()) + ")' class='btn-floating
						// btn-option btn-sm btn-default waves-effect waves-light'><th><i
						// class='icono_cons_bg fa fa-wrench'
						// aria-hidden='true'></i></th></span></div>";
						// dataArray[count][9] = "<div class='tooltip-btn'> <span
						// onclick='consultaImagenesOT(" +
						// String.valueOf(object.get("idOrden").getAsInt()) + ")' class='btn-option
						// btn-floating btn-evidencia btn-sm btn-secondary waves-effect
						// waves-light'><th><i class='icono_cons_bg fa fa-picture-o'
						// aria-hidden='true'></i></th></span></div>";
						dataArray[count][8] = "<div class='tooltip-btn'> <span onclick='consultaDetalleOt("
								+ String.valueOf(object.get("idOrden").getAsInt())
								+ ")' class='btn-floating btn-option btn-sm btn-secondary waves-effect waves-light acciones'><th><i class='icono_cons_bg fa fa-bars' aria-hidden='true'></i></th></span></div>";
						count++;

					}
					dataResponse = DataTableResponse.builder().isRespuesta(true).data(dataArray)
							.paginaActual(jsonObjectResponse.get("paginaActual").getAsInt())
							.registrosTotales(jsonObjectResponse.get("registrosTotales").getAsInt())
							.recordsFiltered(jsonObjectResponse.get("registrosTotales").getAsInt() + "")
							.recordsTotal(jsonObjectResponse.get("registrosTotales").getAsInt() + "")
							.draw(paramsOT.getDraw() + "").build();
				} else {
					dataResponse = DataTableResponse.builder().isRespuesta(true).data(new String[0][10])
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
	public DataTableResponse consultaReporteAuxiliar(ParamConsultaOTPI paramsOT) {
		logger.info("ImplReportePIService.class [metodo consultaInformacionDetalleOt() ]\n" + gson.toJson(paramsOT));
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
		String[][] dataArray = null;
		DataTableResponse dataResponse = DataTableResponse.builder().isRespuesta(false).data(new String[0][10])
				.paginaActual(0).registrosTotales(0).recordsFiltered("0").recordsTotal("0")
				.draw(paramsOT.getDraw() + "").result(null).build();
		paramsOT.setPagina((Integer.parseInt(paramsOT.getStart()) + 10) / 10);
		paramsOT.setIdOrden(!paramsOT.getIdOrden().equals("") ? paramsOT.getIdOrden() : null);
		paramsOT.setFolioSistema(!paramsOT.getFolioSistema().equals("") ? paramsOT.getFolioSistema() : null);
		paramsOT.setClaveCliente(!paramsOT.getClaveCliente().equals("") ? paramsOT.getClaveCliente() : null);

		logger.info("### Object: " + gson.toJson(paramsOT));
		String tokenAcces = principalDetail.getAccess_token();
		logger.info("consultaInformacionDetalleOt ##+" + tokenAcces);
		String urlRequest = principalDetail.getDireccionAmbiente().concat(constReportePI.getConsultaGeneralOt());
		logger.info("URL ##+" + urlRequest);

		ServiceResponseResult response = restCaller.callPostBearerTokenRequest(gson.toJson(paramsOT), urlRequest,
				ServiceResponseResult.class, tokenAcces);
		if (response.getResult() instanceof Integer) {
			dataResponse = DataTableResponse.builder().isRespuesta(false).data(new String[0][10]).paginaActual(0)
					.registrosTotales(0).recordsFiltered("0").recordsTotal("0").draw(paramsOT.getDraw() + "")
					.result(response.getResult()).build();
		} else {
			JsonObject jsonObjectResponse = gson.fromJson(gson.toJson(response.getResult()), JsonObject.class);
			JsonArray ordenesArray = jsonObjectResponse.getAsJsonArray("ordenes");
			if (ordenesArray.size() > 0) {
				if (jsonObjectResponse.get("registrosTotales").getAsInt() > 0) {
					int count = 0;
					dataArray = new String[ordenesArray.size()][11];
					for (int i = 0; i < ordenesArray.size(); i++) {
						JsonObject object = (JsonObject) ordenesArray.get(i);
						logger.info("objeto: " + object);
						dataArray[count][0] = object.get("idOrden").getAsInt() != 0
								? String.valueOf(object.get("idOrden").getAsInt())
								: "";
						dataArray[count][1] = object.get("nombreCliente") != null
								? object.get("nombreCliente").getAsString().trim()
								: "";
						dataArray[count][2] = object.get("claveCliente") != null
								? object.get("claveCliente").getAsString().trim()
								: "";
						dataArray[count][3] = object.get("ciudad") != null ? object.get("ciudad").getAsString().trim()
								: "";
						dataArray[count][4] = object.get("fechaAgenda") != null
								? object.get("fechaAgenda").getAsString().trim()
								: "";
						dataArray[count][5] = object.get("descripcionMotivo") != null
								? object.get("descripcionMotivo").getAsString().trim()
								: "";
						dataArray[count][6] = object.get("descripcionEstatus") != null
								? object.get("descripcionEstatus").getAsString().trim()
								: "";
						dataArray[count][7] = object.get("descripcionEstado") != null
								? object.get("descripcionEstado").getAsString().trim()
								: "";
						// dataArray[count][8] = "<div class='tooltip-btn'> <span
						// onclick='consultaMaterialesOT(" +
						// String.valueOf(object.get("idOrden").getAsInt()) + ")' class='btn-floating
						// btn-option btn-sm btn-default waves-effect waves-light'><th><i
						// class='icono_cons_bg fa fa-wrench'
						// aria-hidden='true'></i></th></span></div>";
						// dataArray[count][9] = "<div class='tooltip-btn'> <span
						// onclick='consultaImagenesOT(" +
						// String.valueOf(object.get("idOrden").getAsInt()) + ")' class='btn-option
						// btn-floating btn-evidencia btn-sm btn-secondary waves-effect
						// waves-light'><th><i class='icono_cons_bg fa fa-picture-o'
						// aria-hidden='true'></i></th></span></div>";
						dataArray[count][8] = "<div class='tooltip-btn'> <span onclick='consultaDetalleOt("
								+ String.valueOf(object.get("idOrden").getAsInt())
								+ ")' class='btn-floating btn-option btn-sm btn-secondary waves-effect waves-light acciones'><th><i class='icono_cons_bg fa fa-bars' aria-hidden='true'></i></th></span></div>";
						count++;

					}
					dataResponse = DataTableResponse.builder().isRespuesta(true).data(dataArray)
							.paginaActual(jsonObjectResponse.get("paginaActual").getAsInt())
							.registrosTotales(jsonObjectResponse.get("registrosTotales").getAsInt())
							.recordsFiltered(jsonObjectResponse.get("registrosTotales").getAsInt() + "")
							.recordsTotal(jsonObjectResponse.get("registrosTotales").getAsInt() + "")
							.draw(paramsOT.getDraw() + "").build();
				} else {
					dataResponse = DataTableResponse.builder().isRespuesta(true).data(new String[0][10])
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
	public DataTableResponse consultaReporteInspector(ParamConsultaOTPI paramsOT) {
		logger.info("ImplReportePIService.class [metodo consultaReporteInspector() ]\n" + gson.toJson(paramsOT));
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
		String[][] dataArray = null;
		DataTableResponse dataResponse = DataTableResponse.builder().isRespuesta(false).data(new String[0][10])
				.paginaActual(0).registrosTotales(0).recordsFiltered("0").recordsTotal("0")
				.draw(paramsOT.getDraw() + "").result(null).build();
		paramsOT.setPagina((Integer.parseInt(paramsOT.getStart()) + 10) / 10);
		paramsOT.setIdOrden(!paramsOT.getIdOrden().equals("") ? paramsOT.getIdOrden() : null);
		paramsOT.setFolioSistema(!paramsOT.getFolioSistema().equals("") ? paramsOT.getFolioSistema() : null);
		paramsOT.setClaveCliente(!paramsOT.getClaveCliente().equals("") ? paramsOT.getClaveCliente() : null);

		logger.info("### Object: " + gson.toJson(paramsOT));
		String tokenAcces = principalDetail.getAccess_token();
		logger.info("consultaInformacionDetalleOt ##+" + tokenAcces);
		String urlRequest = principalDetail.getDireccionAmbiente().concat(constReportePI.getConsultaGeneralOt());
		logger.info("URL ##+" + urlRequest);

		ServiceResponseResult response = restCaller.callPostBearerTokenRequest(gson.toJson(paramsOT), urlRequest,
				ServiceResponseResult.class, tokenAcces);
		if (response.getResult() instanceof Integer) {
			dataResponse = DataTableResponse.builder().isRespuesta(false).data(new String[0][10]).paginaActual(0)
					.registrosTotales(0).recordsFiltered("0").recordsTotal("0").draw(paramsOT.getDraw() + "")
					.result(response.getResult()).build();
		} else {
			JsonObject jsonObjectResponse = gson.fromJson(gson.toJson(response.getResult()), JsonObject.class);
			JsonArray ordenesArray = jsonObjectResponse.getAsJsonArray("ordenes");
			if (ordenesArray.size() > 0) {
				if (jsonObjectResponse.get("registrosTotales").getAsInt() > 0) {
					int count = 0;
					dataArray = new String[ordenesArray.size()][11];
					for (int i = 0; i < ordenesArray.size(); i++) {
						JsonObject object = (JsonObject) ordenesArray.get(i);
						logger.info("objeto: " + object);
						dataArray[count][0] = object.get("idOrden").getAsInt() != 0
								? String.valueOf(object.get("idOrden").getAsInt())
								: "";
						dataArray[count][1] = object.get("ciudad") != null ? object.get("ciudad").getAsString().trim()
								: "";
						dataArray[count][2] = object.get("claveCliente") != null
								? object.get("claveCliente").getAsString().trim()
								: "";
						dataArray[count][3] = object.get("nombreCliente") != null
								? object.get("nombreCliente").getAsString().trim()
								: "";
						dataArray[count][4] = object.get("fechaAgenda") != null
								? object.get("fechaAgenda").getAsString().trim()
								: "";
						dataArray[count][5] = object.get("fechaAgenda") != null
								? object.get("fechaAgenda").getAsString().trim()
								: "";
						count++;

					}
					dataResponse = DataTableResponse.builder().isRespuesta(true).data(dataArray)
							.paginaActual(jsonObjectResponse.get("paginaActual").getAsInt())
							.registrosTotales(jsonObjectResponse.get("registrosTotales").getAsInt())
							.recordsFiltered(jsonObjectResponse.get("registrosTotales").getAsInt() + "")
							.recordsTotal(jsonObjectResponse.get("registrosTotales").getAsInt() + "")
							.draw(paramsOT.getDraw() + "").build();
				} else {
					dataResponse = DataTableResponse.builder().isRespuesta(true).data(new String[0][10])
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
	public DataTableResponse consultarReporteDiario(ParamConsultaOTPI params) {
		logger.info("ImplReportePIService.class [metodo consultarReporteDiario() ]\n" + gson.toJson(params));
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
		String[][] dataArray = null;
		DataTableResponse dataResponse = DataTableResponse.builder().isRespuesta(false).data(new String[0][10])
				.paginaActual(0).registrosTotales(0).recordsFiltered("0").recordsTotal("0").draw(params.getDraw() + "")
				.result(null).build();
		params.setPagina((Integer.parseInt(params.getStart()) + 10) / 10);

		logger.info("### Object: " + gson.toJson(params));
		String tokenAcces = principalDetail.getAccess_token();
		logger.info("consultaInformacionDetalleOt ##+" + tokenAcces);
		String urlRequest = principalDetail.getDireccionAmbiente().concat(constReportePI.getConsultarReporteDiario());
		logger.info("URL ##+" + urlRequest);

		ServiceResponseResult response = restCaller.callPostBearerTokenRequest(gson.toJson(params), urlRequest,
				ServiceResponseResult.class, tokenAcces);
		logger.info("#### RESULT CONSULTA DE REPORTE DIARIO: \n" + gson.toJson(response));

		if (response.getResult() == null || response.getResult() instanceof Integer) {
			dataResponse = DataTableResponse.builder().isRespuesta(false).data(new String[0][15]).paginaActual(0)
					.registrosTotales(0).recordsFiltered("0").recordsTotal("0").draw(params.getDraw() + "")
					.result(response.getResult()).build();
		} else {
			JsonObject jsonObjectResponse = gson.fromJson(gson.toJson(response.getResult()), JsonObject.class);
			JsonArray ordenesArray = jsonObjectResponse.getAsJsonArray("ordenes");
			if (ordenesArray.size() > 0) {
				if (jsonObjectResponse.get("registrosTotales").getAsInt() > 0) {
					int count = 0;
					dataArray = new String[ordenesArray.size()][15];
					for (int i = 0; i < ordenesArray.size(); i++) {
						JsonObject object = (JsonObject) ordenesArray.get(i);
						logger.info("objeto: " + object);
						dataArray[count][0] = object.get("ot").getAsInt() != 0
								? String.valueOf(object.get("ot").getAsInt())
								: "Sin datos";
						dataArray[count][1] = object.get("os") != null && object.get("os").getAsString() != ""
								? object.get("os").getAsString().trim()
								: "Sin datos";
						dataArray[count][2] = object.get("cuenta") != null && object.get("cuenta").getAsString() != ""
								? object.get("cuenta").getAsString().trim()
								: "Sin datos";
						dataArray[count][3] = object.get("tipo") != null && object.get("tipo").getAsString() != ""
								? object.get("tipo").getAsString().trim()
								: "Sin datos";
						dataArray[count][4] = object.get("subTipo") != null && object.get("subTipo").getAsString() != ""
								? object.get("subTipo").getAsString().trim()
								: "Sin datos";
						dataArray[count][5] = object.get("estatusOrden") != null
								&& object.get("estatusOrden").getAsString() != ""
										? object.get("estatusOrden").getAsString().trim()
										: "Sin datos";
						dataArray[count][6] = object.get("estadoOrden") != null
								&& object.get("estadoOrden").getAsString() != ""
										? object.get("estadoOrden").getAsString().trim()
										: "Sin datos";
						dataArray[count][7] = object.get("motivoOrden") != null
								&& object.get("motivoOrden").getAsString() != ""
										? object.get("motivoOrden").getAsString().trim()
										: "Sin datos";
						dataArray[count][8] = object.get("ciudad") != null && object.get("ciudad").getAsString() != ""
								? object.get("ciudad").getAsString().trim()
								: "Sin datos";
						dataArray[count][9] = object.get("geo1") != null && object.get("geo1").getAsString() != ""
								? object.get("geo1").getAsString().trim()
								: "Sin datos";
						dataArray[count][10] = object.get("numEmpleadoTecnico") != null
								&& object.get("numEmpleadoTecnico").getAsString() != ""
										? object.get("numEmpleadoTecnico").getAsString().trim()
										: "Sin datos";
						dataArray[count][11] = object.get("usuarioTecnico") != null
								&& object.get("usuarioTecnico").getAsString() != ""
										? object.get("usuarioTecnico").getAsString().trim()
										: "Sin datos";
						dataArray[count][12] = object.get("nombreTecnico") != null
								&& object.get("nombreTecnico").getAsString() != ""
										? object.get("nombreTecnico").getAsString().trim()
										: "";
						dataArray[count][13] = object.get("fechaUltimaAgenda") != null
								&& object.get("fechaUltimaAgenda").getAsString() != ""
										? object.get("fechaUltimaAgenda").getAsString().trim()
										: "Sin datos";
						dataArray[count][14] = object.get("fechaFin") != null
								&& object.get("fechaFin").getAsString() != ""
										? object.get("fechaFin").getAsString().trim()
										: "Sin datos";

						count++;

					}
					dataResponse = DataTableResponse.builder().isRespuesta(true).data(dataArray)
							.paginaActual(jsonObjectResponse.get("paginaActual").getAsInt())
							.registrosTotales(jsonObjectResponse.get("registrosTotales").getAsInt())
							.recordsFiltered(jsonObjectResponse.get("registrosTotales").getAsInt() + "")
							.recordsTotal(jsonObjectResponse.get("registrosTotales").getAsInt() + "")
							.draw(params.getDraw() + "").build();
				} else {
					dataResponse = DataTableResponse.builder().isRespuesta(true).data(new String[0][15])
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

	@Override
	public DataTableResponse consultarReporteCierreDiario(ParamConsultaOTPI params) {
		logger.info("ImplReportePIService.class [metodo consultarReporteCierreDiario() ]\n" + gson.toJson(params));
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
		String[][] dataArray = null;
		DataTableResponse dataResponse = DataTableResponse.builder().isRespuesta(false).data(new String[0][10])
				.paginaActual(0).registrosTotales(0).recordsFiltered("0").recordsTotal("0").draw(params.getDraw() + "")
				.result(null).build();
		params.setPagina((Integer.parseInt(params.getStart()) + 10) / 10);

		logger.info("### Object: " + gson.toJson(params));
		String tokenAcces = principalDetail.getAccess_token();
		logger.info("consultaInformacionDetalleOt ##+" + tokenAcces);
		String urlRequest = principalDetail.getDireccionAmbiente().concat(constReportePI.getConsultarCierreDiario());
		logger.info("URL ##+" + urlRequest);

		ServiceResponseResult response = restCaller.callPostBearerTokenRequest(gson.toJson(params), urlRequest,
				ServiceResponseResult.class, tokenAcces);
		logger.info("#### RESULT CONSULTA DE REPORTE CIERRE DIARIO: \n" + gson.toJson(response));

		if (response.getResult() == null || response.getResult() instanceof Integer) {
			dataResponse = DataTableResponse.builder().isRespuesta(false).data(new String[0][15]).paginaActual(0)
					.registrosTotales(0).recordsFiltered("0").recordsTotal("0").draw(params.getDraw() + "")
					.result(response.getResult()).build();
		} else {
			JsonObject jsonObjectResponse = gson.fromJson(gson.toJson(response.getResult()), JsonObject.class);
			JsonArray ordenesArray = jsonObjectResponse.getAsJsonArray("ordenes");
			if (ordenesArray.size() > 0) {
				if (jsonObjectResponse.get("registrosTotales").getAsInt() > 0) {
					int count = 0;
					dataArray = new String[ordenesArray.size()][17];
					for (int i = 0; i < ordenesArray.size(); i++) {
						JsonObject object = (JsonObject) ordenesArray.get(i);
						logger.info("objeto: " + object);
						dataArray[count][0] = object.get("ot").getAsInt() != 0
								? String.valueOf(object.get("ot").getAsInt())
								: "Sin datos";
						dataArray[count][1] = object.get("os") != null && object.get("os").getAsString() != ""
								? object.get("os").getAsString().trim()
								: "Sin datos";
						dataArray[count][2] = object.get("cuenta") != null && object.get("cuenta").getAsString() != ""
								? object.get("cuenta").getAsString().trim()
								: "Sin datos";
						dataArray[count][3] = object.get("intervencion") != null
								&& object.get("intervencion").getAsString() != ""
										? object.get("intervencion").getAsString().trim()
										: "Sin datos";
						dataArray[count][4] = object.get("subIntervencion") != null
								&& object.get("subIntervencion").getAsString() != ""
										? object.get("subIntervencion").getAsString().trim()
										: "Sin datos";
						dataArray[count][5] = object.get("estatus") != null && object.get("estatus").getAsString() != ""
								? object.get("estatus").getAsString().trim()
								: "Sin datos";
						dataArray[count][6] = object.get("estado") != null && object.get("estado").getAsString() != ""
								? object.get("estado").getAsString().trim()
								: "Sin datos";
						dataArray[count][7] = object.get("causa") != null && object.get("causa").getAsString() != ""
								? object.get("causa").getAsString().trim()
								: "Sin datos";
						dataArray[count][8] = object.get("ciudad") != null && object.get("ciudad").getAsString() != ""
								? object.get("ciudad").getAsString().trim()
								: "Sin datos";
						dataArray[count][9] = object.get("geo1") != null && object.get("geo1").getAsString() != ""
								? object.get("geo1").getAsString().trim()
								: "Sin datos";
						dataArray[count][10] = object.get("numEmpleadoInstalador") != null
								&& object.get("numEmpleadoInstalador").getAsString() != ""
										? object.get("numEmpleadoInstalador").getAsString().trim()
										: "Sin datos";
						dataArray[count][11] = object.get("usrInstalador") != null
								&& object.get("usrInstalador").getAsString() != ""
										? object.get("usrInstalador").getAsString().trim()
										: "Sin datos";
						dataArray[count][12] = object.get("instalador") != null
								&& object.get("instalador").getAsString() != ""
										? object.get("instalador").getAsString().trim()
										: "Sin datos";
						dataArray[count][13] = object.get("fechaCreacion") != null
								&& object.get("fechaCreacion").getAsString() != ""
										? object.get("fechaCreacion").getAsString().trim()
										: "Sin datos";
						dataArray[count][14] = object.get("fechaInicio") != null
								&& object.get("fechaInicio").getAsString() != ""
										? object.get("fechaInicio").getAsString().trim()
										: "Sin datos";
						dataArray[count][15] = object.get("fechaAgendamiento") != null
								&& object.get("fechaAgendamiento").getAsString() != ""
										? object.get("fechaAgendamiento").getAsString().trim()
										: "Sin datos";
						dataArray[count][16] = object.get("fechaCierre") != null
								&& object.get("fechaCierre").getAsString() != ""
										? object.get("fechaCierre").getAsString().trim()
										: "Sin datos";

						count++;

					}
					dataResponse = DataTableResponse.builder().isRespuesta(true).data(dataArray)
							.paginaActual(jsonObjectResponse.get("paginaActual").getAsInt())
							.registrosTotales(jsonObjectResponse.get("registrosTotales").getAsInt())
							.recordsFiltered(jsonObjectResponse.get("registrosTotales").getAsInt() + "")
							.recordsTotal(jsonObjectResponse.get("registrosTotales").getAsInt() + "")
							.draw(params.getDraw() + "").build();
				} else {
					dataResponse = DataTableResponse.builder().isRespuesta(true).data(new String[0][15])
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

	@Override
	public ServiceResponseResult consultarReporteCierreDiarioEx(String params) {
		logger.info("ImplDespachiPIService.class [metodo consultarReporteCierreDiarioEx() ]\n" + params);
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
		logger.info("### Object: " + gson.toJson(params));
		String tokenAcces = principalDetail.getAccess_token();
		String urlRequest = principalDetail.getDireccionAmbiente().concat(constReportePI.getConsultarCierreDiario());
		logger.info("URL ##+" + urlRequest);

		ServiceResponseResult response = restCaller.callPostBearerTokenRequest(params, urlRequest,
				ServiceResponseResult.class, tokenAcces);

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
					result.add("OT", object.get("ot"));
					result.addProperty("OS",
							object.get("os") != null && object.get("os").getAsString() != ""
									? object.get("os").getAsString()
									: "Sin datos");
					result.addProperty("CUENTA",
							object.get("cuenta") != null && object.get("cuenta").getAsString() != ""
									? object.get("cuenta").getAsString()
									: "Sin datos");
					result.addProperty("TIPO",
							object.get("intervencion") != null && object.get("intervencion").getAsString() != ""
									? object.get("intervencion").getAsString()
									: "Sin datos");
					result.addProperty("SUBTIPO",
							object.get("subIntervencion") != null && object.get("subIntervencion").getAsString() != ""
									? object.get("subIntervencion").getAsString()
									: "Sin datos");
					result.addProperty("ESTATUS",
							object.get("estatus") != null && object.get("estatus").getAsString() != ""
									? object.get("estatus").getAsString()
									: "Sin datos");
					result.addProperty("MOTIVO",
							object.get("falla") != null && object.get("falla").getAsString() != ""
									? object.get("falla").getAsString()
									: "Sin datos");
					result.addProperty("ESTADO",
							object.get("estado") != null && object.get("estado").getAsString() != ""
									? object.get("estado").getAsString()
									: "Sin datos");
					result.addProperty("CIUDAD",
							object.get("ciudad") != null && object.get("ciudad").getAsString() != ""
									? object.get("ciudad").getAsString()
									: "Sin datos");
					result.addProperty("GEOGRAF??A",
							object.get("geo1") != null && object.get("geo1").getAsString() != ""
									? object.get("geo1").getAsString()
									: "Sin datos");
					result.addProperty("#EMPLEADO",
							object.get("numEmpleadoInstalador") != null
									&& object.get("numEmpleadoInstalador").getAsString() != ""
											? object.get("numEmpleadoInstalador").getAsString()
											: "Sin datos");
					result.addProperty("#USUARIO",
							object.get("usrInstalador") != null && object.get("usrInstalador").getAsString() != ""
									? object.get("usrInstalador").getAsString()
									: "Sin datos");
					result.addProperty("T??CNICO",
							object.get("instalador") != null && object.get("instalador").getAsString() != ""
									? object.get("instalador").getAsString()
									: "Sin datos");
					result.addProperty("FECHA CREACI??N",
							object.get("fechaCreacion") != null && object.get("fechaCreacion").getAsString() != ""
									? object.get("fechaCreacion").getAsString()
									: "Sin datos");
					result.addProperty("FECHA INICIO",
							object.get("fechaInicio") != null && object.get("fechaInicio").getAsString() != ""
									? object.get("fechaInicio").getAsString()
									: "Sin datos");
					result.addProperty("FECHA AGENDA",
							object.get("fechaAgendamiento") != null
									&& object.get("fechaAgendamiento").getAsString() != ""
											? object.get("fechaAgendamiento").getAsString()
											: "Sin datos");
					result.addProperty("FECHA FIN",
							object.get("fechaCierre") != null && object.get("fechaCierre").getAsString() != ""
									? object.get("fechaCierre").getAsString()
									: "Sin datos");

					ordenesReporte.add(result);
				}
			}
			ordenesR.add("ordenes", ordenesReporte);
			response = ServiceResponseResult.builder().result(ordenesR.toString()).isRespuesta(true).build();
		}
		logger.info("#### RESULT CONSULTA DE REPORTE CIERRE DIARIO: \n" + gson.toJson(response));
		return response;
	}

	@Override
	public DataTableResponse consultarReporteAsignadasCompensacion(ParamConsultaOTPI params) {
		logger.info(
				"ImplReportePIService.class [metodo consultarReporteAsignadasCompensacion() ]\n" + gson.toJson(params));
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
		String[][] dataArray = null;
		DataTableResponse dataResponse = DataTableResponse.builder().isRespuesta(false).data(new String[0][10])
				.paginaActual(0).registrosTotales(0).recordsFiltered("0").recordsTotal("0").draw(params.getDraw() + "")
				.result(null).build();
		params.setPagina((Integer.parseInt(params.getStart()) + 10) / 10);

		logger.info("### Object: " + gson.toJson(params));
		String tokenAcces = principalDetail.getAccess_token();
		logger.info("consultaInformacionDetalleOt ##+" + tokenAcces);
		String urlRequest = principalDetail.getDireccionAmbiente()
				.concat(constReportePI.getConsultarAsignadasCompensacion());
		logger.info("URL ##+" + urlRequest);

		ServiceResponseResult response = restCaller.callPostBearerTokenRequest(gson.toJson(params), urlRequest,
				ServiceResponseResult.class, tokenAcces);
		logger.info("#### RESULT CONSULTA DE REPORTE ASIGNADAS COMPENSACION: \n" + gson.toJson(response));

		if (response.getResult() == null || response.getResult() instanceof Integer) {
			dataResponse = DataTableResponse.builder().isRespuesta(false).data(new String[0][15]).paginaActual(0)
					.registrosTotales(0).recordsFiltered("0").recordsTotal("0").draw(params.getDraw() + "")
					.result(response.getResult()).build();
		} else {
			JsonObject jsonObjectResponse = gson.fromJson(gson.toJson(response.getResult()), JsonObject.class);
			JsonArray ordenesArray = jsonObjectResponse.getAsJsonArray("ordenes");
			if (ordenesArray.size() > 0) {
				if (jsonObjectResponse.get("registrosTotales").getAsInt() > 0) {
					int count = 0;
					dataArray = new String[ordenesArray.size()][14];
					for (int i = 0; i < ordenesArray.size(); i++) {
						JsonObject object = (JsonObject) ordenesArray.get(i);
						logger.info("objeto: " + object);
						dataArray[count][0] = object.get("ot").getAsInt() != 0
								? String.valueOf(object.get("ot").getAsInt())
								: "Sin datos";
						dataArray[count][1] = object.get("os") != null && object.get("os").getAsString() != ""
								? object.get("os").getAsString().trim()
								: "Sin datos";
						dataArray[count][2] = object.get("cuenta") != null && object.get("cuenta").getAsString() != ""
								? object.get("cuenta").getAsString().trim()
								: "Sin datos";
						dataArray[count][3] = object.get("tipoOrden") != null
								&& object.get("tipoOrden").getAsString() != ""
										? object.get("tipoOrden").getAsString().trim()
										: "Sin datos";
						dataArray[count][4] = object.get("subTipoOrden") != null
								&& object.get("subTipoOrden").getAsString() != ""
										? object.get("subTipoOrden").getAsString().trim()
										: "Sin datos";
						dataArray[count][5] = object.get("proveedor") != null
								&& object.get("proveedor").getAsString() != ""
										? object.get("proveedor").getAsString().trim()
										: "Sin datos";
						dataArray[count][6] = object.get("geo1") != null && object.get("geo1").getAsString() != ""
								? object.get("geo1").getAsString().trim()
								: "Sin datos";
						dataArray[count][7] = object.get("geo2") != null && object.get("geo2").getAsString() != ""
								? object.get("geo2").getAsString().trim()
								: "Sin datos";
						dataArray[count][8] = object.get("numEmpleadoInstalador") != null
								&& object.get("numEmpleadoInstalador").getAsString() != ""
										? object.get("numEmpleadoInstalador").getAsString().trim()
										: "Sin datos";
						dataArray[count][9] = object.get("usrInstalador") != null
								&& object.get("usrInstalador").getAsString() != ""
										? object.get("usrInstalador").getAsString().trim()
										: "Sin datos";
						dataArray[count][10] = object.get("instalador") != null
								&& object.get("instalador").getAsString() != ""
										? object.get("instalador").getAsString().trim()
										: "Sin datos";
						dataArray[count][11] = object.get("fechaCreacion") != null
								&& object.get("fechaCreacion").getAsString() != ""
										? object.get("fechaCreacion").getAsString().trim()
										: "Sin datos";
						dataArray[count][12] = object.get("fechaAgendamiento") != null
								&& object.get("fechaAgendamiento").getAsString() != ""
										? object.get("fechaAgendamiento").getAsString().trim()
										: "Sin datos";
						dataArray[count][13] = object.get("fechaCierre") != null
								&& object.get("fechaCierre").getAsString() != ""
										? object.get("fechaCierre").getAsString().trim()
										: "Sin datos";

						count++;

					}
					dataResponse = DataTableResponse.builder().isRespuesta(true).data(dataArray)
							.paginaActual(jsonObjectResponse.get("paginaActual").getAsInt())
							.registrosTotales(jsonObjectResponse.get("registrosTotales").getAsInt())
							.recordsFiltered(jsonObjectResponse.get("registrosTotales").getAsInt() + "")
							.recordsTotal(jsonObjectResponse.get("registrosTotales").getAsInt() + "")
							.draw(params.getDraw() + "").build();
				} else {
					dataResponse = DataTableResponse.builder().isRespuesta(true).data(new String[0][15])
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

	@Override
	public ServiceResponseResult consultarReporteAsignadasEx(String params) {
		logger.info("ImplDespachiPIService.class [metodo consultarReporteAsignadasEx() ]\n" + params);
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
		logger.info("### Object: " + gson.toJson(params));
		String tokenAcces = principalDetail.getAccess_token();
		String urlRequest = principalDetail.getDireccionAmbiente()
				.concat(constReportePI.getConsultarAsignadasCompensacion());
		logger.info("URL ##+" + urlRequest);

		ServiceResponseResult response = restCaller.callPostBearerTokenRequest(params, urlRequest,
				ServiceResponseResult.class, tokenAcces);

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
					result.add("OT", object.get("ot"));
					result.addProperty("OS",
							object.get("os") != null && object.get("os").getAsString() != ""
									? object.get("os").getAsString()
									: "Sin datos");
					result.addProperty("CUENTA",
							object.get("cuenta") != null && object.get("cuenta").getAsString() != ""
									? object.get("cuenta").getAsString()
									: "Sin datos");
					result.addProperty("TIPO",
							object.get("tipoOrden") != null && object.get("tipoOrden").getAsString() != ""
									? object.get("tipoOrden").getAsString()
									: "Sin datos");
					result.addProperty("SUBTIPO",
							object.get("subTipoOrden") != null && object.get("subTipoOrden").getAsString() != ""
									? object.get("subTipoOrden").getAsString()
									: "Sin datos");
					result.addProperty("CUENTA",
							object.get("cuenta") != null && object.get("cuenta").getAsString() != ""
									? object.get("cuenta").getAsString()
									: "Sin datos");
					result.addProperty("PROVEEDOR",
							object.get("proveedor") != null && object.get("proveedor").getAsString() != ""
									? object.get("proveedor").getAsString()
									: "Sin datos");
					result.addProperty("GEOGRAF??A",
							object.get("geo1") != null && object.get("geo1").getAsString() != ""
									? object.get("geo1").getAsString()
									: "Sin datos");
					result.addProperty("GEOGRAF??A 2",
							object.get("geo2") != null && object.get("geo2").getAsString() != ""
									? object.get("geo2").getAsString()
									: "Sin datos");
					result.addProperty("DESPACHO",
							object.get("nombreDespacho") != null && object.get("nombreDespacho").getAsString() != ""
									? object.get("nombreDespacho").getAsString()
									: "Sin datos");
					result.addProperty("#EMPLEADO",
							object.get("numEmpleadoInstalador") != null
									&& object.get("numEmpleadoInstalador").getAsString() != ""
											? object.get("numEmpleadoInstalador").getAsString()
											: "Sin datos");
					result.addProperty("#USUARIO",
							object.get("usrInstalador") != null && object.get("usrInstalador").getAsString() != ""
									? object.get("usrInstalador").getAsString()
									: "Sin datos");
					result.addProperty("INSTALADOR",
							object.get("instalador") != null && object.get("instalador").getAsString() != ""
									? object.get("instalador").getAsString()
									: "Sin datos");
					result.addProperty("FECHA CREACI??N",
							object.get("fechaCreacion") != null && object.get("fechaCreacion").getAsString() != ""
									? object.get("fechaCreacion").getAsString()
									: "Sin datos");
					result.addProperty("FECHA AGENDA",
							object.get("fechaAgendamiento") != null
									&& object.get("fechaAgendamiento").getAsString() != ""
											? object.get("fechaAgendamiento").getAsString()
											: "Sin datos");
					result.addProperty("FECHA FIN",
							object.get("fechaCierre") != null && object.get("fechaCierre").getAsString() != ""
									? object.get("fechaCierre").getAsString()
									: "Sin datos");

					ordenesReporte.add(result);
				}
			}
			ordenesR.add("ordenes", ordenesReporte);
			response = ServiceResponseResult.builder().result(ordenesR.toString()).isRespuesta(true).build();
		}
		logger.info("#### RESULT CONSULTA DE REPORTE ASIGNADAS COMPENSACION: \n" + gson.toJson(response));
		return response;
	}
	
	@Override
	public ServiceResponseResult consultarTecnicosTiposOrdenes(String params) {
		logger.info("ImplReportePIService.class [metodo = consultarTecnicosTiposOrdenes() ]\n");
		LoginResult principalDetail=utilerias.obtenerObjetoPrincipal();
		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		String tokenAcces=principalDetail.getAccess_token();
		logger.info("params ---> "+jsonObject.toString());	 
		String url = principalDetail.getDireccionAmbiente().concat(constReportePI.getConsultarTecnicosTiposOrdenes());
		ServiceResponseResult response= restCaller.callPostBearerTokenRequest(jsonObject.toString(), url, ServiceResponseResult.class, tokenAcces);
		logger.info("RESULT consultarTecnicosTiposOrdenes " + gson.toJson(response));
		return response;
	}
	
	@Override
	public ServiceResponseResult generarReporteTecnicosTiposOrdenes(String params) {
		logger.info("ImplReportePIService.class [metodo = generarReporteTecnicosTiposOrdenes() ]\n");
		ServiceResponseResult response = null;
		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
        JsonArray tecnicosArray = jsonObject.getAsJsonArray("tecnicos");
        JsonArray tecnicosReporte = new JsonArray();
        JsonObject tecnicosR = new JsonObject();
        if (tecnicosArray.size() > 0) {
        	for (int i = 0; i < tecnicosArray.size(); i++) {
        		JsonObject object = (JsonObject) tecnicosArray.get(i);
        		JsonObject jsonObjTecnico = gson.fromJson(tecnicosArray.get(i), JsonObject.class);
                JsonArray objListaSkills = jsonObjTecnico.getAsJsonArray("listaSkills");
                JsonObject result = new JsonObject();
                result.add("Cuadrilla", object.get("nombretecnico"));
                result.addProperty("Usuario FFM", object.get("usuario") != null && object.get("usuario").getAsString() != "" ? object.get("usuario").getAsString() : "");
                for (int s = 0; s < objListaSkills.size(); s++) {
                	JsonObject objectSkill = (JsonObject) objListaSkills.get(s);
                    result.addProperty(objectSkill.get("descripcion").getAsString(), objectSkill.get("isRegistrada") != null && objectSkill.get("isRegistrada").getAsString() != "" && objectSkill.get("isRegistrada").getAsString().equals("true") ? "???" : "");
                }
                tecnicosReporte.add(result);
        	}
            tecnicosR.add("tecnicos", tecnicosReporte);
            response = ServiceResponseResult.builder().result(tecnicosR.toString()).isRespuesta(true).build();
        }
        logger.info("#### RESULT GENERAR REPORTE T??CNICOS: \n" + gson.toJson(response));
        return response;
		
	}

}
