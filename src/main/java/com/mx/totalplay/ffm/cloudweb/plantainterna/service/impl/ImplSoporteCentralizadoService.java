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
	public DataTableResponse consultaTicketsSoporte(ParamConsultaOTPI paramTicketSoporte) {
		logger.info("ImplSoporteCentralizadoService.class [metodo = consultaTicketsSoporte() ] \n"+ gson.toJson(paramTicketSoporte));
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
		String[][] dataArray = new String[0][CANTIDAD_COLUMNS_COLUMNSTICKET];
        DataTableResponse dataResponse = DataTableResponse.builder()
                .isRespuesta(false)
                .data( dataArray )
                .paginaActual(0)
                .registrosTotales(0)
                .recordsFiltered("0")
                .recordsTotal("0")
                .draw(paramTicketSoporte.getDraw() + "")
                .result(null).build();
        paramTicketSoporte.setPagina((Integer.parseInt(paramTicketSoporte.getStart()) + 10) / 10);
        logger.info("### Object ticketSoporte: " + gson.toJson(paramTicketSoporte));

        String tokenAcces = principalDetail.getAccess_token();
        logger.info("consultaTicketsSoporte ##+" + tokenAcces);
        String urlRequest = principalDetail.getDireccionAmbiente().concat(constSoporteCentralizado.getConsultaTicketsSoporte());
        logger.info("URL ##+" + urlRequest);
        
        Map<String, String> paramsRequest = new HashMap<>(); 
        paramsRequest.put("fechaInicio", paramTicketSoporte.getFechaInicio());
        paramsRequest.put("fechaFin", paramTicketSoporte.getFechaFin());
        paramsRequest.put("tipoFecha", paramTicketSoporte.getTipoFecha());
        paramsRequest.put("pagina", ""+paramTicketSoporte.getPagina());
        paramsRequest.put("elementosPorPagina", ""+paramTicketSoporte.getElementosPorPagina());
        
        
        ServiceResponseResult response = restCaller.callGetBearerTokenRequest(
        		paramsRequest, urlRequest,
                ServiceResponseResult.class, tokenAcces);
        
        logger.info("response#### "+gson.toJson(response));
        if (response.getResult() != null){
        	logger.info("entro");
	        if (response.getResult() instanceof Integer){
	        	logger.info("GG");
	            dataResponse = DataTableResponse.builder()
	                    .isRespuesta(false)
	                    .data( dataArray )
	                    .paginaActual(0)
	                    .registrosTotales(0)
	                    .recordsFiltered("0")
	                    .recordsTotal("0")
	                    .draw(paramTicketSoporte.getDraw() + "")
	                    .result(response.getResult()).build();
	            logger.info("gg2");
	        } else {
	            JsonObject jsonObjectResponse = gson.fromJson(gson.toJson(response.getResult()), JsonObject.class);
	            JsonArray ticketsArray = jsonObjectResponse.getAsJsonArray("tickets");
	            if (ticketsArray.size() > 0) {
	                if (jsonObjectResponse.get("registrosTotales").getAsInt() > 0) {
	                    int count = 0;
	                    dataArray = new String[ticketsArray.size()][CANTIDAD_COLUMNS_COLUMNSTICKET];
	                    for (int i = 0; i < ticketsArray.size(); i++) {
	                        JsonObject object = (JsonObject) ticketsArray.get(i);
	                        dataArray[count][0] = object.get("idOrden").getAsInt() != 0 ? String.valueOf(object.get("idOrden").getAsInt()) : "";
	                        dataArray[count][1] = object.get("ticket") != null ? object.get("ticket").getAsString().trim() : "";
	                        dataArray[count][2] = object.get("os") != null ? object.get("os").getAsString().trim() : "";
	                        dataArray[count][3] = object.get("fechaCreacion") != null ? object.get("fechaCreacion").getAsString().trim() : "";
	                        dataArray[count][4] = object.get("descripcionFalla") != null ? object.get("descripcionFalla").getAsString().trim() : "";
	                        dataArray[count][5] = object.get("telefono") != null ? object.get("telefono").getAsString().trim() : "";
	                        dataArray[count][6] = (object.get("nombreEmpleadoReporta") != null ? object.get("nombreEmpleadoReporta").getAsString().trim() : "" ) + " " + (object.get("apellidoPaEmpleadoReporta").getAsString() != null ? object.get("apellidoPaEmpleadoReporta").getAsString().trim() : "" ) + " " + (object.get("apellidoMaEmpleadoReporta").getAsString() != null ? object.get("apellidoMaEmpleadoReporta").getAsString().trim() : "" );
	                        dataArray[count][7] = (object.get("nombreEmpleadoIng") != null ? object.get("nombreEmpleadoIng").getAsString().trim() : "") + " " + (object.get("apellidoPaEmpleadoIng") != null ? object.get("apellidoPaEmpleadoIng").getAsString().trim() : "") + " " + (object.get("apellidoMaEmpleadoIng") != null ? object.get("apellidoMaEmpleadoIng").getAsString().trim() : "");
	                        dataArray[count][8] = object.get("fechaAsignacion") != null ? object.get("fechaAsignacion").getAsString().trim() : "";
	                        dataArray[count][9] = object.get("descripcionEstatus") != null ? object.get("descripcionEstatus").getAsString().trim() : "";
	                        dataArray[count][10] = object.get("tiempoAtencion") != null ? object.get("tiempoAtencion").getAsString().trim() : "";
	                        dataArray[count][11] = "<a class='' id='detalleIncidencia" + object.get("idOrden").getAsInt() + "' onclick='consultaDetalleTicketSoporte(" + object.get("idOrden").getAsInt() + ")'><i class='fa fa-bars' style='background-color: #58b3bf' title='Detalle'></i></a> &nbsp;"
	                        		+"<a class='' id='asignarIncidencia" + object.get("idOrden").getAsInt() + "' onclick='consultaDetalleTicketSoporte(" + object.get("idOrden").getAsInt() + ")'><i class='fas fa-user-check' style='background-color: #7f4c9d' title='Asignar'></i></a>";
	                        count++;
	                        
	                    }
	                    logger.info(dataArray);
	                    dataResponse = DataTableResponse.builder()
	                            .isRespuesta(true)
	                            .data( dataArray )
	                            .paginaActual(jsonObjectResponse.get("paginaActual").getAsInt())
	                            .registrosTotales(jsonObjectResponse.get("registrosTotales").getAsInt())
	                            .recordsFiltered(jsonObjectResponse.get("registrosTotales").getAsInt() + "")
	                            .recordsTotal(jsonObjectResponse.get("registrosTotales").getAsInt() + "")
	                            .draw(paramTicketSoporte.getDraw() + "")
	                            .result(response.getResult()) 
	                            .build();
	                    logger.info(dataResponse);
	                } else {
	                    dataResponse = DataTableResponse.builder()
	                            .isRespuesta(true)
	                            .data( dataArray )
	                            .paginaActual(jsonObjectResponse.get("paginaActual").getAsInt())
	                            .registrosTotales(jsonObjectResponse.get("registrosTotales").getAsInt())
	                            .recordsFiltered(jsonObjectResponse.get("registrosTotales").getAsInt() + "")
	                            .recordsTotal(jsonObjectResponse.get("registrosTotales").getAsInt() + "")
	                            .draw(paramTicketSoporte.getDraw() + "").build();
	                }
	            }
	        }
        } else {
//        	logger.info("else");
        	 dataResponse = DataTableResponse.builder()
	                    .isRespuesta(false)
	                    .data( dataArray )
	                    .paginaActual(0)
	                    .registrosTotales(0)
	                    .recordsFiltered("0")
	                    .recordsTotal("0")
	                    .draw(paramTicketSoporte.getDraw() + "")
	                    .result(response.getResult()).build();
        }
		return dataResponse;
	}

	@Override
	public ServiceResponseResult creaTicketSoporte(String params) {
		LoginResult principalDetail = utilerias.obtenerObjetoPrincipal();
		String tokenAccess = principalDetail.getAccess_token();
		logger.info("creaTicketSoporte ## "+ tokenAccess);
		
		String urlRequest = principalDetail.getDireccionAmbiente().concat(constSoporteCentralizado.getCreaTicketSoporte());
		logger.info("### URL creaTicketSoporte():" + urlRequest);
		
		ServiceResponseResult response = restCaller.callPostBearerTokenRequest(params, urlRequest, ServiceResponseResult.class, tokenAccess);
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
}
