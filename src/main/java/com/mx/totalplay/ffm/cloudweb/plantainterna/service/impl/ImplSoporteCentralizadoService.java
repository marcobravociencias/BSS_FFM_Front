package com.mx.totalplay.ffm.cloudweb.plantainterna.service.impl;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.mx.totalplay.ffm.cloudweb.plantainterna.model.consultaOTPI.ParamConsultaOTPI;
import com.mx.totalplay.ffm.cloudweb.plantainterna.service.SoporteCentralizadoService;
import com.mx.totalplay.ffm.cloudweb.plantainterna.utils.ConstSoporteCentralizado;
import com.mx.totalplay.ffm.cloudweb.utilerias.model.DataTableResponse;
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
public class ImplSoporteCentralizadoService implements SoporteCentralizadoService {
    private final Logger logger = LogManager.getLogger(ImplSoporteCentralizadoService.class.getName());
    private final ConsumeRest restCaller;
    private ServiceResponseResult response;
    private final Environment environment;
    private final UtileriaGeneral utilerias;
    private Gson gson = new Gson();
    private final ConstantesGeneric constantesGeneric;
    private final ConstSoporteCentralizado constSoporteCentralizado;
    private static final int CANTIDAD_COLUMNS_COLUMNSTICKET = 12;

    @Autowired
    public ImplSoporteCentralizadoService(ConsumeRest restCaller, Environment environment, UtileriaGeneral utilerias, ConstantesGeneric constantesGeneric, ConstSoporteCentralizado constSoporteCentralizado) {
        this.restCaller = restCaller;
        this.environment = environment;
        this.utilerias = utilerias;
        this.constantesGeneric = constantesGeneric;
        this.constSoporteCentralizado = constSoporteCentralizado;
    }

    @Override
    public ServiceResponseResult consultaSeguimientoSoporte(String params) {
        JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
        LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
        String tokenAcces = principalDetail.getAccess_token();
        String urlRequest = principalDetail.getDireccionAmbiente().concat(constSoporteCentralizado.getConsultaSeguimientoSoporte());
        logger.info("### URL consultaSeguimientoSoporte(): \n" + urlRequest);

        ServiceResponseResult response = restCaller.callPostBearerTokenRequest(
                jsonObject.toString(),
                urlRequest,
                ServiceResponseResult.class,
                tokenAcces);

        logger.info("### RESULT consultaSeguimientoSoporte(): " + gson.toJson(response));
        return response;
    }

    @Override
    public ServiceResponseResult consultaTicketSoporte(String params) {
        JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
        LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
        String tokenAcces = principalDetail.getAccess_token();
        String urlRequest = principalDetail.getDireccionAmbiente().concat(constSoporteCentralizado.getConsultaTicketSoporte());
        logger.info("### URL consultaTicketSoporte(): \n" + urlRequest);

        ServiceResponseResult response = restCaller.callPostBearerTokenRequest(
                jsonObject.toString(),
                urlRequest,
                ServiceResponseResult.class,
                tokenAcces);

        logger.info("### RESULT consultaTicketSoporte(): " + gson.toJson(response));
        return response;
    }

    
    
    
    @Override
    public ServiceResponseResult consultarDetalleTicketGestion(String params) {
        LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
        String tokenAcces = principalDetail.getAccess_token();
        String urlRequest = principalDetail.getDireccionAmbiente().concat(constSoporteCentralizado.getConsultarDetalleTicketGestion());
        logger.info("### URL connsultarDetalleTicketGestion(): \n" + urlRequest);
		
		Map<String, String> paramsRequestGet = new HashMap<String, String>();
		paramsRequestGet.put("idTicket", params);
		
		ServiceResponseResult response = restCaller.callGetBearerTokenRequest(paramsRequestGet, urlRequest, ServiceResponseResult.class, tokenAcces);
        
        logger.info("### RESULT consultaDetalleSoporte(): " + response);
        return response;
    }
    @Override
    public ServiceResponseResult consultaDetalleSoporte(String params) {
        JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
        LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
        String tokenAcces = principalDetail.getAccess_token();
        String urlRequest = principalDetail.getDireccionAmbiente().concat(constSoporteCentralizado.getConsultaDetalleSoporte());
        logger.info("### URL consultaDetalleSoporte(): \n" + urlRequest);

        ServiceResponseResult response = restCaller.callPostBearerTokenRequest(
                jsonObject.toString(),
                urlRequest,
                ServiceResponseResult.class,
                tokenAcces);

        logger.info("### RESULT consultaDetalleSoporte(): " + response);
        return response;
    }

	@Override
	public ServiceResponseResult consultaFallasTicketSoporte() {
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
		String tokenAccess = principalDetail.getAccess_token();
		logger.info("consultaFallasTicketSoporte ## "+ tokenAccess);
		
		String urlRequest = principalDetail.getDireccionAmbiente().concat(constSoporteCentralizado.getConsultaFallasTicketSoporte());
		logger.info("### URL consultaFallasTicketSoporte():" + urlRequest);
		
		Map<String, String> paramsRequestGet = new HashMap<String, String>();
		ServiceResponseResult response = restCaller.callGetBearerTokenRequest(paramsRequestGet, urlRequest, ServiceResponseResult.class, tokenAccess);
		logger.info("### RESULT consultaFallasTicketSoporte(): " + gson.toJson(response));   
		return response;
	}

	@Override
	public ServiceResponseResult consultaHistoricoTicketSoporte(String params) {
		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		logger.info("ImplSoporteCentralizadoService.class [metodo = consultaHistoricoTicketSoporte() ] \n"+ jsonObject);
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
		String tokenAccess = principalDetail.getAccess_token();
		logger.info("consultaHistoricoTicketSoporte ## "+ tokenAccess);
		
		String urlRequest = principalDetail.getDireccionAmbiente().concat(constSoporteCentralizado.getConsultaHistoricoTicketSoporte());
		logger.info("URL ##"+ urlRequest);
		
		Map<String, String> paramsRequestGet = new HashMap<String, String>();
		paramsRequestGet.put("idTicket", jsonObject.get("idTicket").getAsString());
		
		ServiceResponseResult response = restCaller.callGetBearerTokenRequest(paramsRequestGet, urlRequest, ServiceResponseResult.class, tokenAccess);
		logger.info("### RESULT " + gson.toJson(response)); 
		return response;
	}

	@Override
	public DataTableResponse consultaTicketsSoporte(ParamConsultaOTPI params) {
		logger.info("ImplSoporteCentralizadoService.class [metodo = consultaTicketsSoporte() ] \n"+params);
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
		String[][] dataArray = new String[0][13];
		DataTableResponse dataResponse = DataTableResponse.builder().isRespuesta(false).data(dataArray).paginaActual(0)
				.registrosTotales(0).recordsFiltered("0").recordsTotal("0").draw(params.getDraw() + "").result(null)
				.build();
		params.setPagina((Integer.parseInt(params.getStart()) + 10) / 10);
		
		logger.info("### Object: " + gson.toJson(params));

		String tokenAcces = principalDetail.getAccess_token();
		logger.info("consultaTicketsSoporte ##+" + tokenAcces);
		String urlRequest = principalDetail.getDireccionAmbiente()
				.concat(constSoporteCentralizado.getConsultaTicketsSoporte());
		logger.info("URL ##+" + urlRequest);

		ServiceResponseResult response = restCaller.callPostBearerTokenRequest(gson.toJson(params), urlRequest,
				ServiceResponseResult.class, tokenAcces);

		if (response.getResult() == null || response.getResult() instanceof Integer) {
			dataResponse = DataTableResponse.builder().isRespuesta(false).data(dataArray).paginaActual(0)
					.registrosTotales(0).recordsFiltered("0").recordsTotal("0").draw(params.getDraw() + "")
					.result(response.getResult()).build();
		} else {
			JsonObject jsonObjectResponse = gson.fromJson(gson.toJson(response.getResult()), JsonObject.class);
			JsonArray ordenesArray = jsonObjectResponse.getAsJsonArray("tickets");
			if (ordenesArray.size() > 0) {
				if (jsonObjectResponse.get("registrosTotales").getAsInt() > 0) {
					int count = 0;
					dataArray = new String[ordenesArray.size()][12];
					for (int i = 0; i < ordenesArray.size(); i++) {
						JsonObject object = (JsonObject) ordenesArray.get(i);

						dataArray[count][0] = object.get("otCentralizado").getAsInt() != 0
								? String.valueOf(object.get("otCentralizado").getAsInt())
								: "Sin dato";
						dataArray[count][1] = object.get("otGeneraSoporte").getAsInt() != 0
										? String.valueOf(object.get("otGeneraSoporte").getAsInt())
										: "Sin dato";
						dataArray[count][2] = (object.get("claveCliente") != null
								&& object.get("claveCliente").getAsString().trim() != "")
										? object.get("claveCliente").getAsString().trim()
										: "Sin dato";
						dataArray[count][3] = (object.get("folioSistema") != null
								&& object.get("folioSistema").getAsString().trim() != "")
										? object.get("folioSistema").getAsString().trim()
										: "Sin dato";
						dataArray[count][4] = (object.get("cliente") != null
								&& object.get("cliente").getAsString().trim() != "")
										? object.get("cliente").getAsString().trim()
										: "Sin dato";
						dataArray[count][5] = (object.get("fallaReportada") != null
								&& object.get("fallaReportada").getAsString().trim() != "")
										? object.get("fallaReportada").getAsString().trim()
										: "Sin dato";
						dataArray[count][6] = (object.get("categoria") != null
								&& object.get("categoria").getAsString().trim() != "")
										? object.get("categoria").getAsString().trim()
										: "Sin dato";
						dataArray[count][7] = (object.get("subcategoria") != null
								&& object.get("subcategoria").getAsString().trim() != "")
										? object.get("subcategoria").getAsString().trim()
										: "Sin dato";
						dataArray[count][8] = (object.get("estatus") != null
								&& object.get("estatus").getAsString().trim() != "")
										? object.get("estatus").getAsString().trim()
										: "Sin dato";
						dataArray[count][9] = (object.get("fechaCreacion") != null
								&& object.get("fechaCreacion").getAsString().trim() != "")
										? object.get("fechaCreacion").getAsString().trim()
										: "Sin dato";

						dataArray[count][10] = "<div class='tooltip-btn'> <span onclick='consultaDetalleTicketSoporte("
								+ String.valueOf(object.get("idTicket").getAsInt()) + "," + String.valueOf(object.get("claveCliente").getAsInt())
								+ ")' class='btn-floating btn-option btn-sm btn-secondary waves-effect waves-light acciones btnTables'><th><i class='fa fa-bars' title='detalle'></i></th></span></div>";
					
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

	@Override
	public ServiceResponseResult creaTicketSoporte(String params) {
		JsonObject jsonObject = new Gson().fromJson(params, JsonObject.class);

		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
		String tokenAccess = principalDetail.getAccess_token();
		
		jsonObject.addProperty("origenSistema", principalDetail.getIdOrigen());
		logger.info("creaTicketSoporte ## "+ jsonObject.toString());
		String urlRequest = principalDetail.getDireccionAmbiente().concat(constSoporteCentralizado.getCreaTicketSoporte());
		logger.info("### URL creaTicketSoporte():" + urlRequest);
		
		ServiceResponseResult response = restCaller.callPostBearerTokenRequest(jsonObject.toString(), urlRequest, ServiceResponseResult.class, tokenAccess);
		logger.info("### RESULT" + gson.toJson(response));   
		return response;
	}

	@Override
	public ServiceResponseResult consultaPropietariosTicketSoporte() {
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
		String tokenAccess = principalDetail.getAccess_token();
		logger.info("consultaPropietariosTicketSoporte ## "+ tokenAccess);
		
		String urlRequest = principalDetail.getDireccionAmbiente().concat(constSoporteCentralizado.getConsultaPropietariosTicketSoporte());
		logger.info("### URL consultaPropietariosTicketSoporte():" + urlRequest);
		
		Map<String, String> paramsRequestGet = new HashMap<String, String>();
		ServiceResponseResult response = restCaller.callGetBearerTokenRequest(paramsRequestGet, urlRequest, ServiceResponseResult.class, tokenAccess);
		logger.info("### RESULT consultaPropietariosTicketSoporte(): " + gson.toJson(response));   
		return response;
	}

	@Override
	public ServiceResponseResult consultaCuentaClienteTicketSoporte(String params) {
		logger.info("ImplSoporteCentralizadoService.class [metodo = consultaCuentaClienteTicketSoporte() ] \n"+ gson.toJson(params));
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
		String tokenAccess = principalDetail.getAccess_token();
		logger.info("consultaCuentaClienteTicketSoporte ## "+ tokenAccess);
		
		String urlRequest = principalDetail.getDireccionAmbiente().concat(constSoporteCentralizado.getConsultaCuentaClienteTicketSoporte());
		logger.info("### URL consultaCuentaClienteTicketSoporte():" + urlRequest);
		
		JsonObject jsonObject = gson.fromJson(params, JsonObject.class);
		Map<String, String> paramsRequestGet = new HashMap<String, String>();
		paramsRequestGet.put("claveCliente", jsonObject.get("claveCliente").getAsString());
		
		ServiceResponseResult response = restCaller.callGetBearerTokenRequest(paramsRequestGet, urlRequest, ServiceResponseResult.class, tokenAccess);
		logger.info("### RESULT consultaPropietariosTicketSoporte(): " + gson.toJson(response));   
		return response;
	}

	@Override
	public ServiceResponseResult asignarIngenieroTicket(String params) {
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
		String tokenAcces = principalDetail.getAccess_token();
		String urlRequest = principalDetail.getDireccionAmbiente().concat(constSoporteCentralizado.getAsignarIngenieroTicket());
		logger.info("### URL asignarIngenieroTicket(): \n" + urlRequest);

		ServiceResponseResult response = restCaller.callPatchBearerTokenRequest(
				params,
				urlRequest,
				ServiceResponseResult.class,
				tokenAcces);

		logger.info("### RESULT asignarIngenieroTicket(): \n" + gson.toJson(response));
		return response;
	}

	@Override
	public ServiceResponseResult consultarAccionesDinamicaDetalle() {
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
		String tokenAcces = principalDetail.getAccess_token();
		String urlRequest = principalDetail.getDireccionAmbiente().concat(constSoporteCentralizado.getConsultarAccionesDinamicoDetalle());
		logger.info("### URL consultarAccionesDinamicaDetalle(): \n" + urlRequest);
		Map<String, String> paramsRequestGet = new HashMap<String, String>();

		ServiceResponseResult response = restCaller.callGetBearerTokenRequest(paramsRequestGet,
				urlRequest,
				ServiceResponseResult.class,
				tokenAcces);

		logger.info("### RESULT consultarAccionesDinamicaDetalle(): \n" + gson.toJson(response));
		return response;
	}

	@Override
	public ServiceResponseResult guardarTicketDetalle(String params) {
		logger.info("### URL guardarTicketDetalle(): \n" + params);

		JsonObject jsonObject = new Gson().fromJson(params, JsonObject.class);
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
		String tokenAcces = principalDetail.getAccess_token();

		String urlRequest = principalDetail.getDireccionAmbiente().concat(constSoporteCentralizado.getGuardarDetalleTicketSoporte());
		jsonObject.addProperty("idOrigenSistema", principalDetail.getIdOrigen());
		logger.info("### URL guardarTicketDetalle(): \n" + urlRequest);

		ServiceResponseResult response = restCaller.callPatchBearerTokenRequest(
				jsonObject.toString(),
				urlRequest,
				ServiceResponseResult.class,
				tokenAcces);

		logger.info("### RESULT guardarTicketDetalle(): \n" + gson.toJson(response));
		return response;
	}

	@Override
	public ServiceResponseResult consultarEstatusTicket() {
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
		String tokenAccess = principalDetail.getAccess_token();
		logger.info("consultarEstatusTicket ## "+ tokenAccess);
		
		String urlRequest = principalDetail.getDireccionAmbiente().concat(constSoporteCentralizado.getConsultarEstatusTicket());
		logger.info("### URL consultarEstatusTicket():" + urlRequest);
		
		Map<String, String> paramsRequestGet = new HashMap<String, String>();
		ServiceResponseResult response = restCaller.callGetBearerTokenRequest(paramsRequestGet, urlRequest, ServiceResponseResult.class, tokenAccess);
		logger.info("### RESULT consultarEstatusTicket(): " + gson.toJson(response));   
		return response;
	}

	@Override
	public ServiceResponseResult reasignarIngenieroTicket(String params) {
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
		String tokenAcces = principalDetail.getAccess_token();
		String urlRequest = principalDetail.getDireccionAmbiente().concat(constSoporteCentralizado.getReasignarIngenieroTicket());
		logger.info("### URL reasignarIngenieroTicket(): \n" + urlRequest);

		ServiceResponseResult response = restCaller.callPatchBearerTokenRequest(
				params,
				urlRequest,
				ServiceResponseResult.class,
				tokenAcces);

		logger.info("### RESULT reasignarIngenieroTicket(): \n" + gson.toJson(response));
		return response;
	}

	@Override
	public ServiceResponseResult consultarEquiposTicketSoporte() {
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
		String tokenAccess = principalDetail.getAccess_token();
		logger.info("consultarEquiposTicketSoporte ## "+ tokenAccess);
		
		String urlRequest = principalDetail.getDireccionAmbiente().concat(constSoporteCentralizado.getConsultaEquiposTicketSoporte());
		logger.info("### URL consultarEquiposTicketSoporte():" + urlRequest);
		
		Map<String, String> paramsRequestGet = new HashMap<String, String>();
		ServiceResponseResult response = restCaller.callGetBearerTokenRequest(paramsRequestGet, urlRequest, ServiceResponseResult.class, tokenAccess);
		logger.info("### RESULT consultarEquiposTicketSoporte(): " + gson.toJson(response));   
		return response;
	}
}
