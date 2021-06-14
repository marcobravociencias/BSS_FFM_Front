package com.totalplay.ffm.plantainterna.service.impl;

import java.awt.print.Pageable;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.totalplay.ffm.plantainterna.model.consultaOTPI.ConsultaOTVO;
import com.totalplay.ffm.plantainterna.model.consultaOTPI.ConsultaTrayectoriaVO;
import com.totalplay.ffm.plantainterna.model.consultaOTPI.ImagenesConfig;
import com.totalplay.ffm.plantainterna.model.consultaOTPI.OrdenTrabajo;
import com.totalplay.ffm.plantainterna.model.consultaOTPI.ParamConsultaOTPI;
import com.totalplay.ffm.plantainterna.model.consultaOTPI.ResponseImagenEvidencia;
import com.totalplay.ffm.plantainterna.model.consultaOTPI.ResponseOTDetalle;
import com.totalplay.ffm.plantainterna.repository.ConsultaOTPIRepository;
import com.totalplay.ffm.plantainterna.service.ConsultaOTService;
import com.totalplay.ffm.plantainterna.utils.ConstConsultaOT;
import com.totalplay.ffm.utilerias.model.DataTableResponse;
import com.totalplay.ffm.utilerias.model.LoginResult;
import com.totalplay.ffm.utilerias.model.ServiceResponseResult;
import com.totalplay.ffm.utilerias.utils.ConstantesGeneric;
import com.totalplay.ffm.utilerias.utils.ConsumeRest;
import com.totalplay.ffm.utilerias.utils.UtileriaGeneral;

@Service
public class ImplConsultaOTService implements ConsultaOTService {

	private final Logger logger = LogManager.getLogger(ImplConsultaOTService.class.getName());

	@Autowired
	private ConsumeRest restCaller;

	@Autowired
	private ConstantesGeneric constantesGeneric;

	@Autowired
	private Environment env;

	@Autowired
	ConstConsultaOT constConsultaOT;
	Gson gson = new Gson();

	@Autowired
	private ConsultaOTPIRepository consultaOTPIRepository;

	@Autowired
	private UtileriaGeneral utilerias;

	@Override
	public ServiceResponseResult consultaFiltros(String params) {
		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		JsonObject login = new JsonObject();
		login.addProperty(env.getProperty("param.textus.PI"), constantesGeneric.getTextIpUsuario());
		login.addProperty(env.getProperty("param.textus.drowssap"), constantesGeneric.getTextCredPad());
		login.addProperty(env.getProperty("param.textus.resU"), constantesGeneric.getTextCredUs());
		jsonObject.add("Login", login);

		logger.info("json object params## " + jsonObject.toString());

		String url = "http://10.216.47.89" + constConsultaOT.getFiltrosConsultaOT();
		ServiceResponseResult response = restCaller.callPostParamString(url, jsonObject.toString());
		logger.info("Result ImplConsultaOTService metodo consultaFiltros" + gson.toJson(response));
		return response;
	}

	@Override
	public DataTableResponse consultaOT(ParamConsultaOTPI paramsOT) {
		// logger.info("ImplConsultaOTService.class [metodo =
		// consultaInformacionDetalleOt() ]\n"+params);
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
		String[][] dataArray = null;
		paramsOT.setPagina((Integer.parseInt(paramsOT.getStart()) + 10) / 10);
		paramsOT.setIdOrden(!paramsOT.getIdOrden().equals("") ? paramsOT.getIdOrden() : null);
		paramsOT.setFolioSistema(!paramsOT.getFolioSistema().equals("") ? paramsOT.getFolioSistema() : null);
		paramsOT.setClaveCliente(!paramsOT.getClaveCliente().equals("") ? paramsOT.getClaveCliente() : null);

		logger.info("### Object: " + gson.toJson(paramsOT));

		// String idot = jsonObject.get("Id_ot").getAsString();

		String tokenAcces = principalDetail.getAccess_token();
		logger.info("consultaInformacionDetalleOt ##+" + tokenAcces);
		String urlRequest = principalDetail.getDireccionAmbiente().concat(constConsultaOT.getConsultaGeneralOt());
		logger.info("URL ##+" + urlRequest);

		ServiceResponseResult response = restCaller.callPostBearerTokenRequest(gson.toJson(paramsOT), urlRequest,
				ServiceResponseResult.class, tokenAcces);

		DataTableResponse dataResponse = (DataTableResponse) gson.fromJson(gson.toJson(response.getResult()),
				DataTableResponse.class);
		if (dataResponse.getRegistrosTotales() > 0) {
			int count = 0;
			dataArray = new String[dataResponse.getOrdenes().size()][11];

			for (ConsultaOTVO ot : dataResponse.getOrdenes()) {
				dataArray[count][0] = ot.getIdOrden() != 0 ? String.valueOf(ot.getIdOrden()) : "";
				dataArray[count][1] = ot.getNombreCliente() != null ? ot.getNombreCliente().trim() : "";
				dataArray[count][2] = ot.getClaveCliente() != null ? ot.getClaveCliente() : "";
				dataArray[count][3] = ot.getCiudad() != null ? ot.getCiudad() : "";
				dataArray[count][4] = ot.getFechaAgenda() != null ? ot.getFechaAgenda() : "";
				dataArray[count][5] = ot.getDescripcionMotivo() != null ? ot.getDescripcionMotivo() : "";
				dataArray[count][6] = ot.getDescripcionEstatus() != null ? ot.getDescripcionEstatus() : "";
				dataArray[count][7] = ot.getDescripcionEstado() != null ? ot.getDescripcionEstado() : "";
				dataArray[count][8] = "<div class='tooltip-btn'> <span onclick='consultaMaterialesOT("+String.valueOf(ot.getIdOrden())+")' class='btn-floating btn-option btn-sm btn-default waves-effect waves-light'><th><i class='icono_cons_bg fa fa-wrench' aria-hidden='true'></i></th></span></div>";;
				dataArray[count][9] = "<div class='tooltip-btn'> <span onclick='consultaImagenesOT("+String.valueOf(ot.getIdOrden())+")' class='btn-option btn-floating btn-evidencia btn-sm btn-secondary waves-effect waves-light'><th><i class='icono_cons_bg fa fa-picture-o' aria-hidden='true'></i></th></span></div>";;
				dataArray[count][10] = "<div class='tooltip-btn'> <span onclick='consultaDetalleOt("+String.valueOf(ot.getIdOrden())+")' class='btn-floating btn-option btn-sm btn-secondary waves-effect waves-light acciones'><th><i class='icono_cons_bg fa fa-list-ul' aria-hidden='true'></i></th></span></div>";;
				count++;
			}

			dataResponse.setRespuesta(true);
			dataResponse.setData(dataArray);
			dataResponse.setResult(dataResponse.getOrdenes());
			dataResponse.setRecordsFiltered(dataResponse.getRegistrosTotales() + "");
			dataResponse.setRecordsTotal(dataResponse.getRegistrosTotales() + "");
			dataResponse.setDraw(paramsOT.getDraw() + "");
		} else {
			dataResponse.setRespuesta(true);
			dataResponse.setData(new String[0][10]);
			dataResponse.setResult(dataResponse.getOrdenes());
			dataResponse.setRecordsFiltered(dataResponse.getRegistrosTotales() + "");
			dataResponse.setRecordsTotal(dataResponse.getRegistrosTotales() + "");
			dataResponse.setDraw(paramsOT.getDraw() + "");
		}
		logger.info("*** Objeto Response: " + gson.toJson(dataResponse));

		
		// DataTableResponse dataResponse =

		return dataResponse;
	}

	@Override
	public ServiceResponseResult consultaImagenesOt(String params) {
		ServiceResponseResult responseS = ServiceResponseResult.builder().isRespuesta(false)
				.resultDescripcion("sin datos").result(null).build();
		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		JsonObject login = new JsonObject();
		login.addProperty(env.getProperty("param.textus.pi"), constantesGeneric.getTextIpUsuario());
		login.addProperty(env.getProperty("param.textus.drowssap"), constantesGeneric.getTextCredPad());
		login.addProperty(env.getProperty("param.textus.diresu"), constantesGeneric.getTextCredUs());
		jsonObject.add("Login", login);
		jsonObject.addProperty(env.getProperty("param.header.grant_type"), env.getProperty("param.textus.grant_type"));

		logger.info("json object params## " + jsonObject.toString());
		try {
			String url = "http://10.216.47.89" + constConsultaOT.getConsultaImagenesOt();
			ResponseImagenEvidencia response = (ResponseImagenEvidencia) restCaller.callPostReturnClassBasicAuth(url,
					jsonObject.toString(), ResponseImagenEvidencia.class);

			if (response.getImagen() != null) {
				for (ImagenesConfig imagen : response.getImagen()) {
					if (imagen.getPath_imagen() != null) {
						try {
							String img64 = UtileriaGeneral
									.encoderImg(UtileriaGeneral.desEncrypt(imagen.getPath_imagen()));
							if (img64.equals("")) {
								imagen.setPath_imagen("");
							} else {
								imagen.setPath_imagen(img64);
							}
						} catch (Exception e) {
							imagen.setPath_imagen("");
							logger.warn("Se encontro un problema en la imagen de la evidencia");
						}
					} else {
						imagen.setPath_imagen("");
					}
				}
			}

			logger.info("Result ImplConsultaOTService metodo consultaImagenesOt: " + gson.toJson(response));
			responseS = ServiceResponseResult.builder().isRespuesta(true).resultDescripcion("Accion completada")
					.result(response).build();

		} catch (Exception e) {
			logger.info(e);
			responseS = ServiceResponseResult.builder().isRespuesta(false).resultDescripcion("ERROR GENERAL")
					.result(null).build();
		}

		return responseS;
	}

	@Override
	public ServiceResponseResult consultaInformacionDetalleOt(String params) {
		logger.info("ImplConsultaOTService.class [metodo = consultaInformacionDetalleOt() ]\n" + params);
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();

		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		String idot = jsonObject.get("Id_ot").getAsString();

		String tokenAcces = principalDetail.getAccess_token();
		logger.info("consultaInformacionDetalleOt ##+" + tokenAcces);
		String urlRequest = principalDetail.getDireccionAmbiente().concat(constConsultaOT.getConsultaOtInfoGeneral());
		logger.info("URL ##+" + urlRequest);

		Map<String, String> paramsRequestGet = new HashMap<String, String>();
		paramsRequestGet.put("idot", idot);

		ServiceResponseResult response = restCaller.callGetBearerTokenRequest(paramsRequestGet, urlRequest,
				ServiceResponseResult.class, tokenAcces);
		return response;
	}

	@Override
	public ServiceResponseResult consultaMaterialesOts(ParamConsultaOTPI paramsOT) {
		ServiceResponseResult response = ServiceResponseResult.builder().isRespuesta(false)
				.resultDescripcion("sin datos").result(null).build();
		List<ConsultaOTVO> responseMateriales = new ArrayList<ConsultaOTVO>();
		ConsultaOTVO responseConsulta = new ConsultaOTVO();
		try {
			responseMateriales = consultaOTPIRepository.consultaMaterialesOt(paramsOT);
			logger.info("### RESULT ### " + gson.toJson(responseMateriales));

			if (responseMateriales.isEmpty()) {
				String params = gson.toJson(paramsOT);
				JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
				JsonObject login = new JsonObject();
				login.addProperty(env.getProperty("param.textus.pi"), constantesGeneric.getTextIpUsuario());
				login.addProperty(env.getProperty("param.textus.drowssap"), constantesGeneric.getTextCredPad());
				login.addProperty(env.getProperty("param.textus.resu"), constantesGeneric.getTextCredUs());
				jsonObject.add("Login", login);
				jsonObject.addProperty(env.getProperty("param.header.grant_type"),
						env.getProperty("param.textus.grant_type"));

				logger.info("json object params## " + jsonObject.toString());
				String url = "http://10.216.47.89" + constConsultaOT.getConsultaMaterialesOt();
				responseConsulta = (ConsultaOTVO) restCaller.callPostReturnClassBasicAuth(url, jsonObject.toString(),
						ConsultaOTVO.class);
				logger.info("### RESULT ### " + gson.toJson(responseConsulta));
				if (responseConsulta.getDescripcion() != null) {
					response = ServiceResponseResult.builder().isRespuesta(true).resultDescripcion("Accion completada")
							.result(responseConsulta).build();
				} else {
					response = ServiceResponseResult.builder().isRespuesta(true).resultDescripcion("Accion completada")
							.result(null).build();
				}

			} else {
				response = ServiceResponseResult.builder().isRespuesta(true).resultDescripcion("Accion completada")
						.result(responseMateriales).build();
			}

		} catch (Exception e) {
			logger.info(e);
			response = ServiceResponseResult.builder().isRespuesta(false).resultDescripcion("ERROR GENERAL")
					.result(null).build();
		}
		logger.info("### RESULT ### " + gson.toJson(response));
		return response;
	}

	@Override
	public ServiceResponseResult getComentariosIntegrador(String params) {
		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		JsonObject login = new JsonObject();
		login.addProperty(env.getProperty("param.textus.pI"), constantesGeneric.getTextIpUsuario());
		login.addProperty(env.getProperty("param.textus.drowssaP"), constantesGeneric.getTextCredPad());
		login.addProperty(env.getProperty("param.textus.resU"), constantesGeneric.getTextCredUs());
		jsonObject.add("Login", login);
		jsonObject.addProperty("FechaInicial", "");
		jsonObject.addProperty("FechaFinal", "");

		logger.info("json object params## " + jsonObject.toString());

		String url = "http://10.216.47.89" + constConsultaOT.getConsultaComentariosOtOperario();
		ServiceResponseResult response = restCaller.callPostParamString(url, jsonObject.toString());
		logger.info("Result ImplConsultaOTService metodo getComentariosIntegrador" + gson.toJson(response));
		return response;
	}

	@Override
	public ServiceResponseResult historico(String params) {
		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		JsonObject login = new JsonObject();
		login.addProperty(env.getProperty("param.textus.pI"), constantesGeneric.getTextIpUsuario());
		login.addProperty(env.getProperty("param.textus.drowssaP"), constantesGeneric.getTextCredPad());
		login.addProperty(env.getProperty("param.textus.resU"), constantesGeneric.getTextCredUs());
		jsonObject.add("Login", login);

		logger.info("json object params## " + jsonObject.toString());

		String url = "http://10.216.47.89" + constConsultaOT.getConsultaHistoricoOtOperario();
		ServiceResponseResult response = restCaller.callPostParamString(url, jsonObject.toString());
		logger.info("Result ImplConsultaOTService metodo historico" + gson.toJson(response));
		return response;
	}

	@Override
	public ServiceResponseResult consultaActividadTecnico(String params) {
		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		JsonObject login = new JsonObject();
		login.addProperty(env.getProperty("param.textus.pI"), constantesGeneric.getTextIpUsuario());
		login.addProperty(env.getProperty("param.textus.drowssaP"), constantesGeneric.getTextCredPad());
		login.addProperty(env.getProperty("param.textus.resU"), constantesGeneric.getTextCredUs());
		jsonObject.add("Login", login);

		logger.info("json object params## " + jsonObject.toString());

		String url = "http://10.216.47.89" + constConsultaOT.getConsultaActividad();
		ServiceResponseResult response = restCaller.callPostParamString(url, jsonObject.toString());
		logger.info("Result ImplConsultaOTService metodo consultaActividadTecnico" + gson.toJson(response));
		return response;
	}

	@Override
	public ServiceResponseResult consultaInfoTrayectoria(String params) {
		ServiceResponseResult response = ServiceResponseResult.builder().isRespuesta(false)
				.resultDescripcion("sin datos").result(null).build();
		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		try {
			String idot = jsonObject.get("idot").getAsString();
			List<ConsultaTrayectoriaVO> consulta = consultaOTPIRepository.consultaInfoTrayectoria(idot);
			logger.info("### RESULT ### " + gson.toJson(consulta));

			response = ServiceResponseResult.builder().isRespuesta(true).resultDescripcion("Accion completada")
					.result(consulta).build();

		} catch (Exception e) {
			logger.info(e);
			response = ServiceResponseResult.builder().isRespuesta(false).resultDescripcion("ERROR GENERAL")
					.result(null).build();
		}

		return response;
	}

	@Override
	public ServiceResponseResult consultaInformacionRed(String params) {
		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		JsonObject login = new JsonObject();
		login.addProperty(env.getProperty("param.textus.pI"), constantesGeneric.getTextIpUsuario());
		login.addProperty(env.getProperty("param.textus.drowssaP"), constantesGeneric.getTextCredPad());
		login.addProperty(env.getProperty("param.textus.resU"), constantesGeneric.getTextCredUs());
		jsonObject.add("Login", login);

		logger.info("json object params## " + jsonObject.toString());

		String url = "http://10.216.47.89" + constConsultaOT.getConsultaInformacionRed();
		ServiceResponseResult response = restCaller.callPostParamString(url, jsonObject.toString());
		logger.info("Result ImplConsultaOTService metodo consultaInformacionRed" + gson.toJson(response));
		return response;
	}

	@Override
	public ServiceResponseResult consultaCambioEquipo(String params) {
		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		JsonObject login = new JsonObject();
		login.addProperty(env.getProperty("param.textus.pI"), constantesGeneric.getTextIpUsuario());
		login.addProperty(env.getProperty("param.textus.drowssaP"), constantesGeneric.getTextCredPad());
		login.addProperty(env.getProperty("param.textus.resU"), constantesGeneric.getTextCredUs());
		jsonObject.add("Login", login);

		logger.info("json object params## " + jsonObject.toString());

		String url = "http://10.216.47.89" + constConsultaOT.getConsultaCambioEquipo();
		ServiceResponseResult response = restCaller.callPostParamString(url, jsonObject.toString());
		logger.info("Result ImplConsultaOTService metodo consultaInformacionRed" + gson.toJson(response));
		return response;
	}
}
