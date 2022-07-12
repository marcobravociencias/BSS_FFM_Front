package com.mx.totalplay.ffm.cloudweb.plantainterna.service.impl;

import java.util.HashMap;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.UtileriaGeneral;
import com.mx.totalplay.ffm.cloudweb.plantainterna.service.ControlVehicularService;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.LoginResult;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import com.mx.totalplay.ffm.cloudweb.utilerias.model.ServiceResponseResult;
import com.mx.totalplay.ffm.cloudweb.utilerias.utils.ConsumeRest;
import com.mx.totalplay.ffm.cloudweb.plantainterna.utils.ConstControlVehicular;

@Service
public class ImplControlVehicularService implements ControlVehicularService {

	private final Logger logger = LogManager.getLogger(ImplControlVehicularService.class.getName());
	private final ConsumeRest restCaller;
	private final UtileriaGeneral utilerias;
	private final ConstControlVehicular constControlVehicular;
	private Gson gson = new Gson();

	@Autowired
	public ImplControlVehicularService(ConsumeRest restCaller, UtileriaGeneral utilerias,
			ConstControlVehicular constControlVehicular) {
		this.restCaller = restCaller;
		this.utilerias = utilerias;
		this.constControlVehicular = constControlVehicular;
	}

	@Override
	public ServiceResponseResult consultarMarcas() {
		logger.info("ImplControlVehicularService.class [metodo = consultarMarcas() ]\n");
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
		String tokenAcces = principalDetail.getAccess_token();
		String urlRequest = principalDetail.getDireccionAmbiente()
				.concat(constControlVehicular.getConsultarMarcasControlVehicular());

		logger.info("URL: " + urlRequest);

		Map<String, String> paramsRequestGet = new HashMap<String, String>();
		ServiceResponseResult response = restCaller.callGetBearerTokenRequest(paramsRequestGet, urlRequest,
				ServiceResponseResult.class, tokenAcces);
		return response;
	}

	@Override
	public ServiceResponseResult consultarColores() {
		logger.info("ImplControlVehicularService.class [metodo = consultarColores() ]\n");

		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
		String tokenAcces = principalDetail.getAccess_token();
		String urlRequest = principalDetail.getDireccionAmbiente()
				.concat(constControlVehicular.getConsultarColoresControlVehicular());

		logger.info("URL: " + urlRequest);

		Map<String, String> paramsRequestGet = new HashMap<String, String>();
		ServiceResponseResult response = restCaller.callGetBearerTokenRequest(paramsRequestGet, urlRequest,
				ServiceResponseResult.class, tokenAcces);

		return response;
	}

	@Override
	public ServiceResponseResult consultarSeguros() {
		logger.info("ImplControlVehicularService.class [metodo = consultarSeguros() ]\n");

		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
		String tokenAcces = principalDetail.getAccess_token();
		String urlRequest = principalDetail.getDireccionAmbiente()
				.concat(constControlVehicular.getConsultarSegurosControlVehicular());

		logger.info("URL: " + urlRequest);

		Map<String, String> paramsRequestGet = new HashMap<String, String>();
		ServiceResponseResult response = restCaller.callGetBearerTokenRequest(paramsRequestGet, urlRequest,
				ServiceResponseResult.class, tokenAcces);

		return response;
	}

	@Override
	public ServiceResponseResult consultarEstatus() {
		logger.info("ImplControlVehicularService.class [metodo = consultarEstatus() ]\n");

		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
		String tokenAcces = principalDetail.getAccess_token();
		String urlRequest = principalDetail.getDireccionAmbiente()
				.concat(constControlVehicular.getConsultarEstatusControlVehicular());

		logger.info("URL: " + urlRequest);

		Map<String, String> paramsRequestGet = new HashMap<String, String>();
		ServiceResponseResult response = restCaller.callGetBearerTokenRequest(paramsRequestGet, urlRequest,
				ServiceResponseResult.class, tokenAcces);

		return response;
	}

	@Override
	public ServiceResponseResult crearVehiculo(String params) {
		logger.info("ImplControlVehicularService.class [metodo = crearVehiculo() ]\n" + params);
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();

		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		String tokenAcces = principalDetail.getAccess_token();
		String urlRequest = principalDetail.getDireccionAmbiente().concat(constControlVehicular.getCrearVehiculoCV());
		logger.info("URL ##" + urlRequest);

		Map<String, String> paramsRequestGet = new HashMap<String, String>();

		ServiceResponseResult response = restCaller.callPostBearerTokenRequest(jsonObject.toString(), urlRequest,
				ServiceResponseResult.class, tokenAcces);
		logger.info(response);
		return response;
	}

	@Override
	public ServiceResponseResult consultarVehiculoPlaca(String params) {
		logger.info("ImplControlVehicularService.class [metodo = consultarVehiculoPlaca() ]\n" + params);
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();

		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		String placa = jsonObject.get("placa").getAsString();

		String tokenAcces = principalDetail.getAccess_token();
		String urlRequest = principalDetail.getDireccionAmbiente()
				.concat(constControlVehicular.getConsultarVehiculoPlacaCV());
		logger.info("URL ##+" + urlRequest);

		Map<String, String> paramsRequestGet = new HashMap<String, String>();
		paramsRequestGet.put("placa", placa);

		ServiceResponseResult response = restCaller.callGetBearerTokenRequest(paramsRequestGet, urlRequest,
				ServiceResponseResult.class, tokenAcces);
		return response;
	}

	@Override
	public ServiceResponseResult consultarVehiculoUnico(String params) {
		logger.info("ImplControlVehicularService.class [metodo = consultarVehiculoUnico() ]\n" + params);
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();

		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		String idVehiculo = jsonObject.get("idVehiculo").getAsString();

		String tokenAcces = principalDetail.getAccess_token();
		String urlRequest = principalDetail.getDireccionAmbiente()
				.concat(constControlVehicular.getConsultarVehiculoUnicoCV());
		logger.info("URL ##+" + urlRequest);

		Map<String, String> paramsRequestGet = new HashMap<String, String>();
		paramsRequestGet.put("idVehiculo", idVehiculo);

		ServiceResponseResult response = restCaller.callGetBearerTokenRequest(paramsRequestGet, urlRequest,
				ServiceResponseResult.class, tokenAcces);
		return response;
	}

	@Override
	public ServiceResponseResult consultarVehiculos(String params) {
		logger.info("ImplControlVehicularService.class [metodo = consultarVehiculos() ]\n" + params);
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();

		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		String tokenAcces = principalDetail.getAccess_token();
		String urlRequest = principalDetail.getDireccionAmbiente()
				.concat(constControlVehicular.getConsultarVehiculosCV());
		logger.info("URL ##+" + urlRequest);

		Map<String, String> paramsRequestGet = new HashMap<String, String>();

		ServiceResponseResult response = restCaller.callPostBearerTokenRequest(jsonObject.toString(), urlRequest,
				ServiceResponseResult.class, tokenAcces);
		return response;
	}

	@Override
	public ServiceResponseResult editarVehiculo(String params) {
		logger.info("ImplControlVehicularService.class [metodo = editarVehiculo() ]\n" + params);
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();

		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		String idVehiculo = jsonObject.get("idVehiculo").getAsString();

		String tokenAcces = principalDetail.getAccess_token();
		String urlRequest = principalDetail.getDireccionAmbiente().concat(constControlVehicular.getEditarVehiculoCV());
		logger.info("URL ##+" + urlRequest);

		Map<String, String> paramsRequestGet = new HashMap<String, String>();
		paramsRequestGet.put("idVehiculo", idVehiculo);

		ServiceResponseResult response = restCaller.callPatchBearerTokenRequestURL(paramsRequestGet,
				gson.toJson(jsonObject), urlRequest, ServiceResponseResult.class, tokenAcces);
		return response;
	}

	@Override
	public ServiceResponseResult consultarEncierros(String params) {
		logger.info("ImplControlVehicularService.class [metodo = consultarEncierros() ]\n" + params);
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();

		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		String idGeografia = jsonObject.get("idGeografia").getAsString();

		String tokenAcces = principalDetail.getAccess_token();
		String urlRequest = principalDetail.getDireccionAmbiente()
				.concat(constControlVehicular.getConsultarEncierrosControlVehicular());
		logger.info("URL ##+" + urlRequest);

		Map<String, String> paramsRequestGet = new HashMap<String, String>();
		paramsRequestGet.put("idGeografia", idGeografia);

		ServiceResponseResult response = restCaller.callGetBearerTokenRequest(paramsRequestGet, urlRequest,
				ServiceResponseResult.class, tokenAcces);
		return response;
	}

	@Override
	public ServiceResponseResult consultarHistorialVehiculo(String params) {
		logger.info("ImplControlVehicularService.class [metodo = consultarHistorialVehiculo() ]\n" + params);
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();

		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		String idVehiculo = jsonObject.get("idVehiculo").getAsString();

		String tokenAcces = principalDetail.getAccess_token();
		String urlRequest = principalDetail.getDireccionAmbiente()
				.concat(constControlVehicular.getConsultarHistorialCV());
		logger.info("URL ##+" + urlRequest);

		Map<String, String> paramsRequestGet = new HashMap<String, String>();
		paramsRequestGet.put("idVehiculo", idVehiculo);

		ServiceResponseResult response = restCaller.callGetBearerTokenRequest(paramsRequestGet, urlRequest,
				ServiceResponseResult.class, tokenAcces);
		return response;
	}

	@Override
	public ServiceResponseResult eliminarVehiculo(String params) {
		logger.info("ImplControlVehicularService.class [metodo = eliminarVehiculo() ]\n" + params);
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();

		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		String idVehiculo = jsonObject.get("idVehiculo").getAsString();

		String tokenAcces = principalDetail.getAccess_token();
		String urlRequest = principalDetail.getDireccionAmbiente()
				.concat(constControlVehicular.getEliminarVehiculoCV());
		logger.info("URL ##+" + urlRequest);

		Map<String, String> paramsRequestGet = new HashMap<String, String>();
		paramsRequestGet.put("idVehiculo", idVehiculo);

		ServiceResponseResult response = restCaller.callGetBearerTokenRequest(paramsRequestGet, urlRequest,
				ServiceResponseResult.class, tokenAcces);
		return response;
	}

	@Override
	public ServiceResponseResult consultarOperaciones() {
		logger.info("ImplControlVehicularService.class [metodo = consultarOperaciones() ]\n");

		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
		String tokenAcces = principalDetail.getAccess_token();
		String urlRequest = principalDetail.getDireccionAmbiente()
				.concat(constControlVehicular.getConsultarOperacionesControlVehicular());

		logger.info("URL: " + urlRequest);

		Map<String, String> paramsRequestGet = new HashMap<String, String>();
		ServiceResponseResult response = restCaller.callGetBearerTokenRequest(paramsRequestGet, urlRequest,
				ServiceResponseResult.class, tokenAcces);

		return response;
	}

	@Override
	public ServiceResponseResult consultarTipoCuadrilla() {
		logger.info("ImplControlVehicularService.class [metodo = consultarTipoCuadrilla() ]\n");

		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
		String tokenAcces = principalDetail.getAccess_token();
		String urlRequest = principalDetail.getDireccionAmbiente()
				.concat(constControlVehicular.getConsultarCuadrillaControlVehicular());

		logger.info("URL: " + urlRequest);

		Map<String, String> paramsRequestGet = new HashMap<String, String>();
		ServiceResponseResult response = restCaller.callGetBearerTokenRequest(paramsRequestGet, urlRequest,
				ServiceResponseResult.class, tokenAcces);

		return response;
	}

	@Override
	public ServiceResponseResult consultarEmpresas() {
		logger.info("ImplControlVehicularService.class [metodo = consultarEmpresas() ]\n");

		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
		String tokenAcces = principalDetail.getAccess_token();
		String urlRequest = principalDetail.getDireccionAmbiente()
				.concat(constControlVehicular.getConsultarEmpresasControlVehicular());

		logger.info("URL: " + urlRequest);

		Map<String, String> paramsRequestGet = new HashMap<String, String>();
		ServiceResponseResult response = restCaller.callGetBearerTokenRequest(paramsRequestGet, urlRequest,
				ServiceResponseResult.class, tokenAcces);

		return response;
	}

	@Override
	public ServiceResponseResult consultarCentroCostos() {
		logger.info("ImplControlVehicularService.class [metodo = consultarCentroCostos() ]\n");

		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
		String tokenAcces = principalDetail.getAccess_token();
		String urlRequest = principalDetail.getDireccionAmbiente()
				.concat(constControlVehicular.getConsultarCostosControlVehicular());

		logger.info("URL: " + urlRequest);

		Map<String, String> paramsRequestGet = new HashMap<String, String>();
		ServiceResponseResult response = restCaller.callGetBearerTokenRequest(paramsRequestGet, urlRequest,
				ServiceResponseResult.class, tokenAcces);

		return response;
	}

	@Override
	public ServiceResponseResult generarReporteControlVehicular(String params) {
		logger.info("ImplControlVehicularService.class [metodo = generarReporteControlVehicular() ]\n" + params);
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();

		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		String tokenAcces = principalDetail.getAccess_token();
		String urlRequest = principalDetail.getDireccionAmbiente()
				.concat(constControlVehicular.getReporteControlVehicular());
		logger.info("URL ##+" + urlRequest);

		Map<String, String> paramsRequestGet = new HashMap<String, String>();
		paramsRequestGet.put("fechaInicio", jsonObject.get("fechaInicio").getAsString());

		ServiceResponseResult response = restCaller.callGetBearerTokenRequest(paramsRequestGet, urlRequest,
				ServiceResponseResult.class, tokenAcces);

		if (response.getResult() instanceof Integer) {
			response = ServiceResponseResult.builder().isRespuesta(false).result(response.getResult()).build();
		} else {
			JsonObject jsonObjectResponse = gson.fromJson(gson.toJson(response.getResult()), JsonObject.class);
			JsonArray vehiculosArray = jsonObjectResponse.getAsJsonArray("vehiculos");
			JsonArray vehiculosReporte = new JsonArray();
			JsonObject vehiculos = new JsonObject();
			if (vehiculosArray.size() > 0) {
				for (int i = 0; i < vehiculosArray.size(); i++) {
					JsonObject object = (JsonObject) vehiculosArray.get(i);
					JsonObject result = new JsonObject();
					logger.info("objeto: " + object);

					result.addProperty("#EMPLEADO",
							object.get("numeroEmpleado") != null ? object.get("numeroEmpleado").getAsString().trim()
									: "Sin dato");
					result.addProperty("NOMBRE",
							object.get("nombreCompleto") != null ? object.get("nombreCompleto").getAsString().trim()
									: "Sin dato");
					result.addProperty("PLACA",
							object.get("placa") != null ? object.get("placa").getAsString().trim() : "Sin dato");
					result.addProperty("TIPO",
							object.get("tipoVehiculo") != null ? object.get("tipoVehiculo").getAsString().trim() : "Sin dato");
					result.addProperty("MARCA",
							object.get("marca") != null ? object.get("marca").getAsString().trim() : "Sin dato");
					result.addProperty("TARJETA CIRCULACION",
							object.get("tarjetaCirculacion") != null
									? object.get("tarjetaCirculacion").getAsString().trim()
									: "Sin dato");
					result.addProperty("EXPEDIENTE",
							object.get("expediente") != null ? object.get("expediente").getAsString().trim() : "Sin dato");
					result.addProperty("TIPO CUADRILLA",
							object.get("tipoCuadrilla") != null ? object.get("tipoCuadrilla").getAsString().trim()
									: "Sin dato");
					result.addProperty("EMPRESA",
							object.get("empresa") != null ? object.get("empresa").getAsString().trim() : "Sin dato");
					result.addProperty("COSTO",
							object.get("costo") != null ? object.get("costo").getAsString().trim() : "Sin dato");
					result.addProperty("UBICACION",
							object.get("ubicacion") != null ? object.get("ubicacion").getAsString().trim() : "Sin dato");
					result.addProperty("DISTRITO",
							object.get("distrito") != null ? object.get("distrito").getAsString().trim() : "Sin dato");
					result.addProperty("ESTATUS",
							object.get("estatus") != null ? object.get("estatus").getAsString().trim() : "Sin dato");
					result.addProperty("MOTIVO",
							object.get("motivo") != null ? object.get("motivo").getAsString().trim() : "Sin dato");
					result.addProperty("FECHA",
							object.get("fecha") != null ? object.get("fecha").getAsString().trim() : "Sin dato");
					result.addProperty("COMENTARIO",
							object.get("comentario") != null ? object.get("comentario").getAsString().trim() : "Sin dato");
					vehiculosReporte.add(result);
				}
				vehiculos.add("vehiculos", vehiculosReporte);
				response = ServiceResponseResult.builder().isRespuesta(true).result(gson.toJson(vehiculos)).build();

			} else {
				response = ServiceResponseResult.builder().isRespuesta(true).result(null).build();
			}
		}

		return response;
	}

}
